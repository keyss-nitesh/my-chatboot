// // Generate bot response based on user message
// const generateBotResponse = (userMessage) => {
//   const lowerMessage = userMessage.toLowerCase();

//   // Greetings
//   if (lowerMessage.match(/\b(hello|hi|hey|namaste|hola)\b/)) {
//     const greetings = [
//       "Hello! It's great to hear from you! How can I assist you today?",
//       "Hi there! Welcome back! What would you like to talk about?",
//       "Hey! Great to see you! How can I help you today?",
//       "Namaste! I'm here to help. What's on your mind?"
//     ];
//     return greetings[Math.floor(Math.random() * greetings.length)];
//   }

//   // How are you
//   if (lowerMessage.match(/\b(how are you|kaise ho|what's up|wassup)\b/)) {
//     return "I'm doing great, thanks for asking! I'm here and ready to help you. How are you doing?";
//   }

//   // Name/Identity
//   if (lowerMessage.match(/\b(your name|who are you|what are you)\b/)) {
//     return "I'm an AI Assistant created by Nitesh. I'm designed to help answer questions, have conversations, and assist you with various tasks!";
//   }

//   // Help
//   if (lowerMessage.match(/\b(help|support|assist)\b/)) {
//     return "I'm here to help! You can ask me questions, have conversations, get information, or just chat. What do you need help with?";
//   }

//   // Goodbye
//   if (lowerMessage.match(/\b(bye|goodbye|see you|tata|alvida)\b/)) {
//     return "Goodbye! It was nice talking to you. Feel free to come back anytime. Take care!";
//   }

//   // Thanks
//   if (lowerMessage.match(/\b(thank|thanks|thank you|shukriya|dhanyavaad)\b/)) {
//     return "You're very welcome! I'm always happy to help. Is there anything else you'd like to know?";
//   }

//   // Time
//   if (lowerMessage.match(/\b(time|what time)\b/)) {
//     return `The current time is ${new Date().toLocaleTimeString('en-US', {
//       hour: '2-digit',
//       minute: '2-digit',
//       hour12: true
//     })}`;
//   }

//   // Date
//   if (lowerMessage.match(/\b(date|today|what day)\b/)) {
//     return `Today's date is ${new Date().toLocaleDateString('en-US', {
//       weekday: 'long',
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     })}`;
//   }

//   // About Nitesh
//   if (lowerMessage.match(/\b(nitesh|creator|developer|owner)\b/)) {
//     return "Nitesh is the brilliant mind behind this AI World! He's passionate about AI, technology, and creating innovative solutions. This chatbot is one of his amazing creations!";
//   }

//   // Weather (mock response)
//   if (lowerMessage.match(/\b(weather|temperature|forecast)\b/)) {
//     return "I don't have real-time weather data access yet, but I'd recommend checking a weather app or website for accurate information!";
//   }

//   // Jokes
//   if (lowerMessage.match(/\b(joke|funny|humor)\b/)) {
//     const jokes = [
//       "Why don't programmers like nature? It has too many bugs! 🐛",
//       "Why do programmers prefer dark mode? Because light attracts bugs! 💡",
//       "What's a programmer's favorite hangout place? The Foo Bar! 🍺",
//       "Why did the developer go broke? Because he used up all his cache! 💰"
//     ];
//     return jokes[Math.floor(Math.random() * jokes.length)];
//   }

//   // AI/Technology
//   if (lowerMessage.match(/\b(ai|artificial intelligence|machine learning|technology)\b/)) {
//     return "AI and technology are fascinating fields! They're constantly evolving and changing the world. I'm an example of conversational AI, designed to understand and respond to your messages. What specifically about AI interests you?";
//   }

//   // Default responses
//   const defaultResponses = [
//     "That's an interesting question! Let me think about that... Based on what you're asking, I'd say it's worth exploring further. What specific aspect are you most curious about?",
//     "I understand what you're asking. While I process information differently than humans, I'm here to help however I can. Could you tell me more about what you're looking for?",
//     "Great question! I'm processing your request. While I may not have all the answers, I'm happy to discuss this topic with you. What would you like to know more about?",
//     "Thanks for sharing that with me! I'm here to assist. Could you provide a bit more context so I can give you the most helpful response?",
//     "I appreciate you reaching out! While I'm still learning, I'll do my best to help. Can you elaborate on what you'd like to know?"
//   ];

//   return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
// };

// module.exports = { generateBotResponse };


const { promisePool } = require('../config/db');  // promisePool use karo

const generateBotResponse = async (userMessage) => {
  const lowerMessage = userMessage.toLowerCase().trim();

  try {
    const [rows] = await promisePool.query(
      `SELECT response FROM responses 
       WHERE ? LIKE CONCAT('%', keyword, '%') 
       LIMIT 1`,
      [lowerMessage]
    );

    if (rows.length > 0) {
      return rows[0].response;
    }
  } catch (err) {
    console.error('DB response fetch error:', err);
  }

  return "I'm not sure about that. Can you ask something else?";
};

module.exports = { generateBotResponse };