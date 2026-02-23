const { promisePool } = require('../config/db');

class Message {
  // Create new message
  static async create(messageData) {
    const { conversation_id, user_id, sender_type, message_text } = messageData;

    const [result] = await promisePool.query(
      'INSERT INTO messages (conversation_id, user_id, sender_type, message_text) VALUES (?, ?, ?, ?)',
      [conversation_id, user_id, sender_type, message_text]
    );

    return result.insertId;
  }

  // Get messages by conversation ID
  static async getByConversationId(conversationId) {
    const [rows] = await promisePool.query(
      `SELECT m.*, u.name as user_name
       FROM messages m
       LEFT JOIN users u ON m.user_id = u.id
       WHERE m.conversation_id = ?
       ORDER BY m.created_at ASC`,
      [conversationId]
    );
    return rows;
  }

  // Get recent messages
  static async getRecent(conversationId, limit = 50) {
    const [rows] = await promisePool.query(
      `SELECT m.*, u.name as user_name
       FROM messages m
       LEFT JOIN users u ON m.user_id = u.id
       WHERE m.conversation_id = ?
       ORDER BY m.created_at DESC
       LIMIT ?`,
      [conversationId, limit]
    );
    return rows.reverse(); // Return in chronological order
  }

  // Delete message
  static async delete(messageId) {
    const [result] = await promisePool.query(
      'DELETE FROM messages WHERE id = ?',
      [messageId]
    );
    return result.affectedRows > 0;
  }

  // Get message count for a conversation
  static async getCount(conversationId) {
    const [rows] = await promisePool.query(
      'SELECT COUNT(*) as count FROM messages WHERE conversation_id = ?',
      [conversationId]
    );
    return rows[0].count;
  }
}

module.exports = Message;
