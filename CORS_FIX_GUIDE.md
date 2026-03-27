# 🔧 CORS "Failed to Fetch" Fix - Complete Solution

## 📋 Your Configuration
- **Frontend URL:** `https://eduvillage-frontend1223.onrender.com`
- **Backend URL:** `https://eduvillage-backend-5.onrender.com`
- **Issue:** "Failed to fetch" when frontend calls backend API

---

## ✅ STEP 1: Frontend API Configuration (DONE ✓)

Your frontend is already configured correctly:

### `.env.local` (Development)
```env
VITE_API_BASE_URL=http://localhost:5000
```

### `.env.production` (Production)
```env
VITE_API_BASE_URL=https://eduvillage-backend-5.onrender.com
```

### `src/lib/api.ts` (Updated)
```typescript
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'https://eduvillage-backend-5.onrender.com') + '/api';

// ... in apiRequest function:
const config: RequestInit = {
  credentials: 'include', // ✅ CRITICAL: Allows cookies/auth headers
  headers: {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  },
  ...options,
};
```

---

## ✅ STEP 2: Backend CORS Configuration (YOU NEED TO DO THIS)

### Option A: Minimal Fix (Recommended)

In your backend `server.js` or `app.ts`, add this **BEFORE** your routes:

```javascript
import cors from 'cors';

const app = express();

// ✅ CORS Configuration - FIX FOR "FAILED TO FETCH"
const allowedOrigins = [
  'https://eduvillage-frontend1223.onrender.com',
  'http://localhost:3000',      // Local development
  'http://localhost:5173',      // Vite dev server
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,                    // ✅ Allow cookies & auth headers
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200,
  maxAge: 86400  // 24 hours
}));

// ✅ Parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Your routes below this
// app.use('/api', routes);
```

### Option B: Simple Fix (If unsure)

```javascript
import cors from 'cors';

const app = express();

app.use(cors({
  origin: 'https://eduvillage-frontend1223.onrender.com',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
```

### Option C: Development-Only Wildcard (⚠️ NOT for production)

```javascript
app.use(cors({
  origin: '*',  // ❌ ONLY for local development!
  credentials: false
}));
```

---

## 🐛 STEP 3: Debugging Checklist

Run these steps in order to identify the exact problem:

### 1. **Test Backend Health** (Browser Console)
```javascript
fetch('https://eduvillage-backend-5.onrender.com/api/health')
  .then(r => r.json())
  .then(d => console.log('✅ Backend is up:', d))
  .catch(e => console.log('❌ Backend is down or unreachable:', e.message))
```

**Expected:** `✅ Backend is up: {status: "ok"}`  
**If fails:** Backend might be sleeping (Render free tier) or not running

---

### 2. **Test CORS Preflight** (Browser Console)
```javascript
fetch('https://eduvillage-backend-5.onrender.com/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ email: 'test@test.com', password: 'test' })
})
  .then(r => r.json())
  .then(d => console.log('✅ CORS OK:', d))
  .catch(e => console.log('❌ CORS Error:', e.message))
```

**Expected:** Either a successful response or a 401 (invalid credentials) - NOT a CORS error  
**If fails with CORS error:** Your backend CORS config is wrong

---

### 3. **Check Network Tab** (Browser DevTools)
1. Press `F12` → Go to **Network** tab
2. Make an API call in your app
3. Find the failed request and check:
   - **Status:** Should be 200, 201, 400, 401, etc. (NOT red/blocked)
   - **Headers Response:**
     - ✅ Should have: `Access-Control-Allow-Origin: https://eduvillage-frontend1223.onrender.com`
     - ✅ Should have: `Access-Control-Allow-Credentials: true`
   - **Type:** Should be `fetch` not `other`

---

### 4. **Check Console Errors** (F12 → Console)

| Error | Cause | Fix |
|-------|-------|-----|
| `Failed to fetch` | General network error | Check if backend URL is correct & backend is running |
| `CORS policy: No 'Access-Control-Allow-Origin' header` | CORS not configured on backend | Add CORS middleware to your Express app |
| `CORS policy: Credentials mode is 'include' but Allow-Origin is '*'` | Using wildcard with credentials | Change origin to specific domain |
| `401 Unauthorized` | ✅ CORS OK, but auth failed | This is normal - check your credentials |

---

## 🚀 STEP 4: Complete Fix Checklist

- [ ] **Frontend:** Updated `src/lib/api.ts` with `credentials: 'include'` ✅ DONE
- [ ] **Frontend:** Created `.env.local` and `.env.production` ✅ DONE
- [ ] **Backend:** Added CORS middleware with your frontend domain
- [ ] **Backend:** Redeployed backend to Render
- [ ] **Test:** CORS preflight passes (Step 3.2)
- [ ] **Test:** No CORS errors in DevTools Console
- [ ] **Test:** API calls work in production

---

## ⚡ Common Mistakes

❌ **Mistake 1:** Using `*` for origin with `credentials: true`
```javascript
// ❌ WRONG - Won't work!
app.use(cors({
  origin: '*',
  credentials: true
}));
```

✅ **Correct:**
```javascript
// ✅ RIGHT - Allow specific domain
app.use(cors({
  origin: 'https://eduvillage-frontend1223.onrender.com',
  credentials: true
}));
```

---

❌ **Mistake 2:** Not including `credentials: 'include'` in frontend fetch
```javascript
// ❌ WRONG - Cookies won't be sent
fetch(url, {
  headers: { 'Authorization': `Bearer ${token}` }
})
```

✅ **Correct:**
```javascript
// ✅ RIGHT - Both cookies and headers work
fetch(url, {
  credentials: 'include',
  headers: { 'Authorization': `Bearer ${token}` }
})
```

---

## 📞 Still Not Working?

1. Check Render logs: Go to backend on Render → Logs → Any errors?
2. Test direct URL: Open `https://eduvillage-backend-5.onrender.com/api/health` in browser
3. Verify frontend URL is correct in CORS config
4. Redeploy backend after changing CORS config
5. Clear browser cache: Ctrl+Shift+Delete → Clear all

---

## 🎯 Most Common Single Cause

**99% of "Failed to fetch" errors are caused by:**

1. **Missing CORS on backend** ← This is likely YOUR issue
2. Wrong origin in CORS config
3. Backend not deployed/running yet

**Fix:** Add the CORS code from Step 2 to your backend, redeploy, then test.

