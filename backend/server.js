import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import swaggerUi from 'swagger-ui-express';

import { requireAuth } from './middleware/auth.js';
import authRouter from './routes/auth.js';
import cartRouter from './routes/cart.js';
import { swaggerDefinition } from './swagger.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const PORT = parseInt(process.env.PORT || '3001', 10);
const JSON_SERVER_PORT = PORT + 1;

function startJsonServer() {
  const jsonServerBin = join(__dirname, 'node_modules', 'json-server', 'lib', 'bin.js');
  const child = spawn(
    process.execPath,
    [jsonServerBin, 'db.json', '--port', String(JSON_SERVER_PORT)],
    { cwd: __dirname, stdio: 'pipe' }
  );
  child.stdout.on('data', (d) => process.stdout.write(`[json-server] ${d}`));
  child.stderr.on('data', (d) => process.stderr.write(`[json-server] ${d}`));
  child.on('exit', (code) => {
    if (code !== 0) console.error(`[json-server] exited with code ${code}`);
  });
  process.on('exit', () => child.kill());
  process.on('SIGINT', () => { child.kill(); process.exit(0); });
  process.on('SIGTERM', () => { child.kill(); process.exit(0); });
  return child;
}

const app = express();

app.use(cors());
app.use(express.json());

// Block direct access to sensitive collections
app.use('/users', (_req, res) => res.status(403).json({ error: 'Forbidden' }));
app.use('/carts', (_req, res) => res.status(403).json({ error: 'Forbidden' }));

// Auth routes (register and login are public; /me is protected inside authRouter)
app.use('/auth', authRouter);

// Cart routes (all protected)
app.use('/cart', requireAuth, cartRouter);

// Swagger UI
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDefinition, {
  customSiteTitle: 'Fast Food API Docs',
  swaggerOptions: { persistAuthorization: true },
}));

// Proxy all other requests to internal json-server
const jsonProxy = createProxyMiddleware({
  target: `http://localhost:${JSON_SERVER_PORT}`,
  changeOrigin: true,
});
app.use('/', jsonProxy);

startJsonServer();

setTimeout(() => {
  app.listen(PORT, () => {
    console.log(`\n🚀 Server running on http://localhost:${PORT}`);
    console.log(`   (json-server internal: ${JSON_SERVER_PORT})\n`);
    console.log(`   📖 Swagger UI  → http://localhost:${PORT}/docs`);
    console.log('   POST /auth/register   -- create account');
    console.log('   POST /auth/login      -- get JWT token');
    console.log('   GET  /auth/me         -- current user (auth required)');
    console.log('   GET  /cart            -- get cart (auth required)');
    console.log('   POST /cart/items      -- add item (auth required)');
    console.log('   PUT  /cart/items/:id  -- update quantity (auth required)');
    console.log('   DEL  /cart/items/:id  -- remove item (auth required)');
    console.log('   DEL  /cart            -- clear cart (auth required)');
    console.log('   GET  /categories      -- public');
    console.log('   GET  /products        -- public\n');
  });
}, 2000);