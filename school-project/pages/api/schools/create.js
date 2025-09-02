import fs from 'fs';
import path from 'path';
import formidable from 'formidable';
import { getPool } from '../../../lib/db.js';

export const config = { api: { bodyParser: false } };

function ensureImagesDir() {
  const dir = path.join(process.cwd(), 'public', 'schoolImages');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  return dir;
}

function sanitizeFilename(name) {
  return name.replace(/[^a-zA-Z0-9._-]/g, '_');
}

export default async function handler(req, res) {
  if (req.method !== 'POST')
    return res.status(405).json({ message: 'Method not allowed' });

  const imagesDir = ensureImagesDir();

  const form = formidable({
    multiples: false,
    keepExtensions: true,
    maxFileSize: 5 * 1024 * 1024, // 5MB
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error(err);
      return res.status(400).json({ message: 'Invalid form data' });
    }

    const name = String(fields.name || '').trim();
    const address = String(fields.address || '').trim();
    const city = String(fields.city || '').trim();
    const state = String(fields.state || '').trim();
    const pincode = String(fields.pincode || '').trim();
    const contact = String(fields.contact || '').trim();
    const email_id = String(fields.email_id || '').trim();

    if (!name || !address || !city || !state || !pincode || !contact || !email_id) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email_id)) {
      return res.status(400).json({ message: 'Invalid email' });
    }
    if (!/^[0-9]{6}$/.test(pincode)) {
      return res.status(400).json({ message: 'Invalid pincode' });
    }

    let imageRelPath = null;
    const file = files.image;
    try {
      if (!file) {
        return res.status(400).json({ message: 'Image is required' });
      }
      const origName = Array.isArray(file) ? file[0].originalFilename : file.originalFilename;
      const tmpPath = Array.isArray(file) ? file[0].filepath : file.filepath;
      const finalName = `${Date.now()}_${sanitizeFilename(path.basename(origName || 'school'))}`;
      const destPath = path.join(imagesDir, finalName);
      fs.renameSync(tmpPath, destPath);
      imageRelPath = `/schoolImages/${finalName}`;
    } catch (e) {
      console.error(e);
      return res.status(500).json({ message: 'Failed to save image' });
    }

    try {
      const pool = getPool();
      const sql = `INSERT INTO schools (name, address, city, state, pincode, contact, image, email_id)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
      const params = [name, address, city, state, pincode, contact, imageRelPath, email_id];
      await pool.execute(sql, params);
      return res.status(200).json({ message: 'Inserted' });
    } catch (dbErr) {
      console.error(dbErr);
      return res.status(500).json({ message: 'DB error' });
    }
  });
}
