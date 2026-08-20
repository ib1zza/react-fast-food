import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { readDb, writeDb } from '../db.js';

const router = Router();

/**
 * Helper: get or create a cart for the current user
 */
function getOrCreateCart(db, userId) {
  let cart = db.carts.find((c) => c.userId === userId);
  if (!cart) {
    cart = {
      id: uuidv4(),
      userId,
      items: [],
      updatedAt: new Date().toISOString(),
    };
    db.carts.push(cart);
  }
  return cart;
}

/**
 * GET /cart
 * Returns the current user's cart
 */
router.get('/', (req, res) => {
  try {
    const db = readDb();
    const cart = getOrCreateCart(db, req.user.id);
    writeDb(db);
    return res.json(cart);
  } catch (err) {
    console.error('[cart GET /]', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * POST /cart/items
 * Body: { productId: string, quantity: number }
 * Adds item to cart. If item exists — increments quantity.
 */
router.post('/items', (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    if (!productId) {
      return res.status(400).json({ error: 'productId is required' });
    }
    if (typeof quantity !== 'number' || quantity < 1) {
      return res.status(400).json({ error: 'quantity must be a positive number' });
    }

    const db = readDb();

    // Validate that product exists
    const product = db.products.find((p) => p.id === productId);
    if (!product) {
      return res.status(404).json({ error: `Product "${productId}" not found` });
    }

    const cart = getOrCreateCart(db, req.user.id);
    const existing = cart.items.find((item) => item.productId === productId);

    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    cart.updatedAt = new Date().toISOString();
    writeDb(db);

    return res.status(201).json(cart);
  } catch (err) {
    console.error('[cart POST /items]', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * PUT /cart/items/:productId
 * Body: { quantity: number }
 * Sets item quantity. If quantity <= 0 — removes item.
 */
router.put('/items/:productId', (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    if (typeof quantity !== 'number') {
      return res.status(400).json({ error: 'quantity must be a number' });
    }

    const db = readDb();
    const cart = getOrCreateCart(db, req.user.id);

    const itemIndex = cart.items.findIndex((item) => item.productId === productId);
    if (itemIndex === -1) {
      return res.status(404).json({ error: `Item "${productId}" not found in cart` });
    }

    if (quantity <= 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = quantity;
    }

    cart.updatedAt = new Date().toISOString();
    writeDb(db);

    return res.json(cart);
  } catch (err) {
    console.error('[cart PUT /items/:productId]', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * DELETE /cart/items/:productId
 * Removes a specific item from the cart
 */
router.delete('/items/:productId', (req, res) => {
  try {
    const { productId } = req.params;

    const db = readDb();
    const cart = getOrCreateCart(db, req.user.id);

    const itemIndex = cart.items.findIndex((item) => item.productId === productId);
    if (itemIndex === -1) {
      return res.status(404).json({ error: `Item "${productId}" not found in cart` });
    }

    cart.items.splice(itemIndex, 1);
    cart.updatedAt = new Date().toISOString();
    writeDb(db);

    return res.json(cart);
  } catch (err) {
    console.error('[cart DELETE /items/:productId]', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * DELETE /cart
 * Clears entire cart (removes all items)
 */
router.delete('/', (req, res) => {
  try {
    const db = readDb();
    const cart = getOrCreateCart(db, req.user.id);

    cart.items = [];
    cart.updatedAt = new Date().toISOString();
    writeDb(db);

    return res.json(cart);
  } catch (err) {
    console.error('[cart DELETE /]', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
