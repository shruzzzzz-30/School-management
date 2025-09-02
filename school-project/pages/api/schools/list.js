import { getPool } from '../../../lib/db.js';

export default async function handler(req, res) {
  try {
    const pool = getPool();
    const [rows] = await pool.execute(
      `SELECT id, name, address, city, state, pincode, contact, email_id, image 
       FROM schools 
       ORDER BY id DESC`
    );
    res.status(200).json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'DB error' });
  }
}
