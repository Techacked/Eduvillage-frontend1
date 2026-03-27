# 🔗 Backend Integration Guide (MIME Type & Static Files)

## 📌 If You Have a Node/Express Backend

If your backend serves the frontend or has static files, use this configuration.

---

## ✅ Express Server Configuration

Save this in your `server.js` or `app.ts`:

```javascript
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ✅ MIME TYPE FIX - Critical for module loading
app.use(express.static(path.join(__dirname, 'frontend/dist'), {
  setHeaders: (res, filePath) => {
    // Fix MIME types for JavaScript modules
    if (filePath.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
    }
    // CSS files
    if (filePath.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css; charset=utf-8');
    }
    // JSON files
    if (filePath.endsWith('.json')) {
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
    }
    // SVG files
    if (filePath.endsWith('.svg')) {
      res.setHeader('Content-Type', 'image/svg+xml');
    }

    // Security headers
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-XSS-Protection', '1; mode=block');

    // Cache headers
    if (filePath.includes('/assets/')) {
      // Long-term caching for versioned assets
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    } else if (filePath.endsWith('index.html')) {
      // Short caching for HTML - allows updates
      res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
    }
  }
}));

// ✅ SPA ROUTING FIX - Route all requests to index.html
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/dist/index.html'));
});

// API routes (before SPA fallback)
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

## 🔧 Alternative: Using `express.static` with middleware

```javascript
import express from 'express';
import mime from 'mime-types';

const app = express();

// Configure MIME types
mime.define({
  'application/javascript': ['js', 'mjs']
});

// Serve static files with proper MIME types
app.use(express.static('frontend/dist', {
  extensions: ['html'],
  setHeaders: (res, path) => {
    // Auto-detect MIME type
    const mimeType = mime.lookup(path);
    if (mimeType) {
      res.setHeader('Content-Type', mimeType);
    }

    // Security headers
    res.setHeader('X-Content-Type-Options', 'nosniff');

    // Cache control
    if (path.includes('assets')) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    } else if (path.includes('index.html')) {
      res.setHeader('Cache-Control', 'public, max-age=3600');
    }
  }
}));

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.resolve('frontend/dist/index.html'));
});
```

---

## 🚀 Docker Configuration (If deploying with containers)

```dockerfile
# Build stage
FROM node:18-alpine as builder

WORKDIR /app

COPY frontend/package*.json ./

RUN npm ci

COPY frontend ./

RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=builder /app/dist ./dist

# Serve with proper MIME types
RUN npm install mime-types

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
```

---

## 🔗 CORS Configuration (For API calls)

If frontend and backend are on different domains:

```javascript
import cors from 'cors';

const app = express();

// CORS configuration
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:8080',
    'https://eduvillage-frontend.vercel.app',
    'https://yourdomain.com'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rest of your code...
```

---

## ✅ Environment Variables for Backend

```bash
# .env
FRONTEND_URL=https://eduvillage-frontend.vercel.app
NODE_ENV=production
PORT=5000

# Render-specific
RENDER=true
```

---

## 🐛 Troubleshooting MIME Type Issues

### Issue: "Failed to load module script: Expected JavaScript..."

**Cause:** Server sending wrong MIME type

**Fix:** Add to your Express server:
```javascript
app.use((req, res, next) => {
  if (req.url.endsWith('.js')) {
    res.type('application/javascript');
  }
  next();
});
```

### Issue: "CSS not applied"

**Cause:** CSS file MIME type is wrong

**Fix:** Ensure `/assets/*.css` gets `text/css` MIME type

### Issue: "JSON files not loading"

**Cause:** Incorrect MIME type

**Fix:** Set MIME type to `application/json` for `.json` files

---

## 📦 package.json Dependencies (Backend)

```json
{
  "dependencies": {
    "express": "^4.18.0",
    "cors": "^2.8.5",
    "mime-types": "^2.1.35"
  }
}
```

---

## 🔄 Frontend-Backend Communication

### Making API Calls from Frontend

```typescript
// src/lib/api.ts
const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const fetchData = async (endpoint: string) => {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // For cookies
  });
  return response.json();
};
```

### Example Backend Route

```javascript
app.get('/api/courses', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.json({ data: [] });
});
```

---

## ✅ Deployment Checklist (With Backend)

- [ ] Frontend built: `npm run build`
- [ ] Backend has proper MIME type configuration
- [ ] SPA routing configured (all routes → index.html)
- [ ] CORS configured if backend is separate domain
- [ ] Environment variables set on backend
- [ ] `frontend/dist` is served by backend
- [ ] Test locally: backend runs on port 5000, frontend makes API calls

---

## 🎯 Testing Backend + Frontend

```bash
# Terminal 1 - Backend
cd backend
npm run dev        # Should run on http://localhost:5000

# Terminal 2 - Frontend
cd frontend
npm run dev        # Should run on http://localhost:8080
```

Both should work together without MIME type errors! ✅

---

**All MIME type issues are now fixed!** 🎉
