import api from './axios';

export const chatService = {
  // Send message
  sendMessage: async (conversationId, messageText) => {
    const response = await api.post('/chat/message', {
      conversation_id: conversationId,
      message_text: messageText
    });
    return response.data;
  },

  // Get all conversations
  getConversations: async () => {
    const response = await api.get('/chat/conversations');
    return response.data;
  },

  // Get messages for a conversation
  getMessages: async (conversationId) => {
    const response = await api.get(`/chat/messages/${conversationId}`);
    return response.data;
  },

  // Delete conversation
  deleteConversation: async (conversationId) => {
    const response = await api.delete(`/chat/conversation/${conversationId}`);
    return response.data;
  }
};
