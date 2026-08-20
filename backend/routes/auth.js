import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { readDb, writeDb } from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

/**
 * POST /auth/register
 * Body: { email: string, password: string }
 * Returns: { token: string, user: { id, email, createdAt } }
 */
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    const db = readDb();
    const existing = db.users.find((u) => u.email === email.toLowerCase());
    if (existing) {
      return res.status(409).json({ error: 'User with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      id: uuidv4(),
      email: email.toLowerCase(),
      password: hashedPassword,
      createdAt: new Date().toISOString(),
    };

    db.users.push(user);
    writeDb(db);

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(201).json({
      token,
      user: { id: user.id, email: user.email, createdAt: user.createdAt },
    });
  } catch (err) {
    console.error('[auth/register]', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * POST /auth/login
 * Body: { email: string, password: string }
 * Returns: { token: string, user: { id, email, createdAt } }
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const db = readDb();
    const user = db.users.find((u) => u.email === email.toLowerCase());
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.json({
      token,
      user: { id: user.id, email: user.email, createdAt: user.createdAt },
    });
  } catch (err) {
    console.error('[auth/login]', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * GET /auth/me
 * Protected. Returns current user info from token.
 */
router.get('/me', requireAuth, (req, res) => {
  return res.json({ user: req.user });
});

export default router;
