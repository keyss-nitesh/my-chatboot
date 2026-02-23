const Message = require('../models/Message');
const Conversation = require('../models/Conversation');
const { generateBotResponse } = require('../utils/botResponses');

// Send message and get bot response
exports.sendMessage = async (req, res) => {
  try {
    const { conversation_id, message_text } = req.body;
    const userId = req.user.id;

    // Validate input
    if (!message_text || message_text.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Message text is required'
      });
    }

    // Check if conversation exists and user owns it
    let conversationId = conversation_id;

    if (conversationId) {
      const isOwner = await Conversation.isOwner(conversationId, userId);
      if (!isOwner) {
        return res.status(403).json({
          success: false,
          message: 'You do not have access to this conversation'
        });
      }
    } else {
      // Create new conversation if not provided
      conversationId = await Conversation.create(userId, 'New Chat');
    }

    // Save user message
    const userMessageId = await Message.create({
      conversation_id: conversationId,
      user_id: userId,
      sender_type: 'user',
      message_text: message_text.trim()
    });

    // Generate bot response (with simulated delay handled on frontend)
    // const botResponseText = generateBotResponse(message_text);

    const botResponseText = await generateBotResponse(message_text);


    // Save bot message
    const botMessageId = await Message.create({
      conversation_id: conversationId,
      user_id: userId,
      sender_type: 'bot',
      message_text: botResponseText
    });

    res.json({
      success: true,
      data: {
        conversation_id: conversationId,
        user_message: {
          id: userMessageId,
          sender_type: 'user',
          message_text: message_text.trim()
        },
        bot_message: {
          id: botMessageId,
          sender_type: 'bot',
          message_text: botResponseText
        }
      }
    });
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({
      success: false,
      message: 'Error sending message',
      error: error.message
    });
  }
};

// Get conversation messages
exports.getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const userId = req.user.id;

    // Check if user owns conversation
    const isOwner = await Conversation.isOwner(conversationId, userId);
    if (!isOwner) {
      return res.status(403).json({
        success: false,
        message: 'You do not have access to this conversation'
      });
    }

    // Get messages
    const messages = await Message.getByConversationId(conversationId);

    res.json({
      success: true,
      data: {
        messages
      }
    });
  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching messages',
      error: error.message
    });
  }
};

// Get all conversations
exports.getConversations = async (req, res) => {
  try {
    const userId = req.user.id;

    const conversations = await Conversation.getByUserId(userId);

    res.json({
      success: true,
      data: {
        conversations
      }
    });
  } catch (error) {
    console.error('Get conversations error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching conversations',
      error: error.message
    });
  }
};

// Delete conversation
exports.deleteConversation = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const userId = req.user.id;

    // Check if user owns conversation
    const isOwner = await Conversation.isOwner(conversationId, userId);
    if (!isOwner) {
      return res.status(403).json({
        success: false,
        message: 'You do not have access to this conversation'
      });
    }

    // Delete conversation
    await Conversation.delete(conversationId);

    res.json({
      success: true,
      message: 'Conversation deleted successfully'
    });
  } catch (error) {
    console.error('Delete conversation error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting conversation',
      error: error.message
    });
  }
};
