import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import { generateSpookyCommit } from './api/ghost';

// Load environment variables from .env
dotenv.config();

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'api-ghost-dev-middleware',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (req.url === '/api/ghost') {
            if (req.method === 'POST') {
              let body = '';
              req.on('data', (chunk) => {
                body += chunk;
              });

              req.on('end', async () => {
                res.setHeader('Content-Type', 'application/json');
                try {
                  const parsed = JSON.parse(body || '{}');
                  const { commitMessage } = parsed;

                  if (!commitMessage || typeof commitMessage !== 'string' || !commitMessage.trim()) {
                    res.statusCode = 400;
                    res.end(JSON.stringify({ error: 'Missing or empty "commitMessage" in request body.' }));
                    return;
                  }

                  const result = await generateSpookyCommit(commitMessage);
                  res.statusCode = 200;
                  res.end(JSON.stringify(result));
                } catch (err: unknown) {
                  console.error('[Vite /api/ghost dev middleware error]:', err);
                  const message = err instanceof Error ? err.message : 'Internal Server Error';
                  const statusCode = message.includes('Missing or empty') ? 400 : 500;
                  res.statusCode = statusCode;
                  res.end(JSON.stringify({ error: message }));
                }
              });
              return;
            } else if (req.method === 'OPTIONS') {
              res.setHeader('Access-Control-Allow-Origin', '*');
              res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
              res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
              res.statusCode = 200;
              res.end();
              return;
            } else {
              res.statusCode = 405;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Method Not Allowed' }));
              return;
            }
          }
          next();
        });
      },
    },
  ],
  server: {
    port: 3000,
    open: false,
  },
});
