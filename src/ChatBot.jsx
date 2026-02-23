import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import { chatService } from './api/chatService'
import './ChatBot.css'

function ChatBot() {
  const [messages, setMessages] = useState([
    { text: "Hi! I'm Nitesh's AI Assistant. How can I help you today?", sender: 'bot' }
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [conversationId, setConversationId] = useState(null)
  const [error, setError] = useState('')
  const messagesEndRef = useRef(null)
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const handleSend = async () => {
    if (inputText.trim() === '') return

    const userMessage = { text: inputText, sender: 'user' }
    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsTyping(true)
    setError('')

    try {
      // Simulate 2-3 seconds delay before showing bot response
      const delay = 2000 + Math.random() * 1000 // 2-3 seconds

      // Send message to backend
      const response = await chatService.sendMessage(conversationId, inputText)

      if (response.success) {
        // Update conversation ID if it's a new conversation
        if (!conversationId) {
          setConversationId(response.data.conversation_id)
        }

        // Add delay before showing bot response
        setTimeout(() => {
          const botMessage = {
            text: response.data.bot_message.message_text,
            sender: 'bot'
          }
          setMessages(prev => [...prev, botMessage])
          setIsTyping(false)
        }, delay)
      }
    } catch (err) {
      console.error('Send message error:', err)
      setError('Failed to send message. Please try again.')
      setIsTyping(false)

      // Show error message as bot response
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            text: 'Sorry, I encountered an error. Please try again.',
            sender: 'bot'
          }
        ])
      }, 500)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <button className="back-button" onClick={() => navigate('/')}>
          ← Back
        </button>
        <div className="header-center">
          <h2>AI Chatbot</h2>
          {user && <span className="user-name">Welcome, {user.name}!</span>}
        </div>
        <div className="header-right">
          <div className="status-indicator">
            <span className="status-dot"></span>
            Online
          </div>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {error && <div className="error-banner">{error}</div>}

      <div className="messages-container">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
          >
            <div className="message-content">
              {message.text}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="message bot-message">
            <div className="message-content typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-container">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          rows="1"
        />
        <button onClick={handleSend} disabled={inputText.trim() === '' || isTyping}>
          Send
        </button>
      </div>
    </div>
  )
}

export default ChatBot
