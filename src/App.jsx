import { useNavigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import './App.css'

function App() {
  const navigate = useNavigate()
  const { isAuthenticated, logout, user } = useAuth()

  const handleStartChat = () => {
    if (isAuthenticated) {
      navigate('/chat')
    } else {
      navigate('/login')
    }
  }

  return (
    <div className="landing-container">
      <div className="content">
        <h1 className="main-title">Welcome to Nitesh's AI World</h1>
        <p className="subtitle">Exploring the Future of Artificial Intelligence</p>
        <div className="decorative-line"></div>

        {isAuthenticated && (
          <p className="welcome-text">Welcome back, {user?.name}!</p>
        )}

        <button className="chat-button" onClick={handleStartChat}>
          {isAuthenticated ? 'Continue Chatting' : 'Start Chatting with AI'}
        </button>

        {isAuthenticated ? (
          <button className="secondary-button" onClick={logout}>
            Logout
          </button>
        ) : (
          <p className="login-text">
            Already have an account? <button className="link-button" onClick={() => navigate('/login')}>Login</button>
          </p>
        )}
      </div>
    </div>
  )
}

export default App
