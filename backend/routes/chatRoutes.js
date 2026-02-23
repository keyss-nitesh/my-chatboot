const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const auth = require('../middleware/auth');

// All routes require authentication
router.use(auth);

// Chat routes
router.post('/message', chatController.sendMessage);
router.get('/conversations', chatController.getConversations);
router.get('/messages/:conversationId', chatController.getMessages);
router.delete('/conversation/:conversationId', chatController.deleteConversation);

module.exports = router;
