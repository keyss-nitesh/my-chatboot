const { promisePool } = require('../config/db');

class Conversation {
  // Create new conversation
  static async create(userId, title = 'New Conversation') {
    const [result] = await promisePool.query(
      'INSERT INTO conversations (user_id, title) VALUES (?, ?)',
      [userId, title]
    );

    return result.insertId;
  }

  // Get conversation by ID
  static async findById(conversationId) {
    const [rows] = await promisePool.query(
      'SELECT * FROM conversations WHERE id = ?',
      [conversationId]
    );
    return rows[0];
  }

  // Get all conversations for a user
  static async getByUserId(userId) {
    const [rows] = await promisePool.query(
      `SELECT c.*,
              COUNT(m.id) as message_count,
              MAX(m.created_at) as last_message_at
       FROM conversations c
       LEFT JOIN messages m ON c.id = m.conversation_id
       WHERE c.user_id = ?
       GROUP BY c.id
       ORDER BY c.updated_at DESC`,
      [userId]
    );
    return rows;
  }

  // Update conversation title
  static async updateTitle(conversationId, title) {
    const [result] = await promisePool.query(
      'UPDATE conversations SET title = ? WHERE id = ?',
      [title, conversationId]
    );
    return result.affectedRows > 0;
  }

  // Delete conversation
  static async delete(conversationId) {
    const [result] = await promisePool.query(
      'DELETE FROM conversations WHERE id = ?',
      [conversationId]
    );
    return result.affectedRows > 0;
  }

  // Check if user owns conversation
  static async isOwner(conversationId, userId) {
    const [rows] = await promisePool.query(
      'SELECT id FROM conversations WHERE id = ? AND user_id = ?',
      [conversationId, userId]
    );
    return rows.length > 0;
  }
}

module.exports = Conversation;
