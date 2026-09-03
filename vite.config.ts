import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig, Plugin} from 'vite';

function postsApiPlugin(): Plugin {
  return {
    name: 'api-posts-storage',
    configureServer(server) {
      server.middlewares.use('/api/sync-posts', (req, res) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const data = JSON.parse(body);
              const postsList = Array.isArray(data) ? data : data.posts;
              if (Array.isArray(postsList)) {
                const dataDir = path.resolve(__dirname, 'src/data');
                if (!fs.existsSync(dataDir)) {
                  fs.mkdirSync(dataDir, { recursive: true });
                }
                const postsFile = path.resolve(dataDir, 'posts.json');
                fs.writeFileSync(postsFile, JSON.stringify(postsList, null, 2), 'utf-8');
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 200;
                res.end(JSON.stringify({ success: true, count: postsList.length }));
                return;
              }
              res.statusCode = 400;
              res.end(JSON.stringify({ error: 'Invalid posts array' }));
            } catch (e: any) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: e?.message || 'Server error' }));
            }
          });
          return;
        }
        res.statusCode = 405;
        res.end('Method Not Allowed');
      });

      server.middlewares.use('/api/posts', (req, res) => {
        const postsFile = path.resolve(__dirname, 'src/data/posts.json');
        if (req.method === 'GET') {
          if (fs.existsSync(postsFile)) {
            const content = fs.readFileSync(postsFile, 'utf-8');
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200;
            res.end(content);
          } else {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: 'Not found' }));
          }
          return;
        }
        if (req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const posts = JSON.parse(body);
              if (Array.isArray(posts)) {
                const dataDir = path.resolve(__dirname, 'src/data');
                if (!fs.existsSync(dataDir)) {
                  fs.mkdirSync(dataDir, { recursive: true });
                }
                fs.writeFileSync(postsFile, JSON.stringify(posts, null, 2), 'utf-8');
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 200;
                res.end(JSON.stringify({ success: true, count: posts.length }));
                return;
              }
              res.statusCode = 400;
              res.end(JSON.stringify({ error: 'Invalid posts array' }));
            } catch (e: any) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: e?.message || 'Server error' }));
            }
          });
          return;
        }
        res.statusCode = 405;
        res.end('Method Not Allowed');
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), postsApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
