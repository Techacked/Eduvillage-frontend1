# 🆘 Quick Troubleshooting Guide

## 🔴 "Failed to load module script: Expected JavaScript module but server responded with MIME type..."

### ✅ FIXED in your project!

**What was wrong:** Server wasn't sending `Content-Type: application/javascript` header for `.js` files.

**What's fixed:**
- `vite.config.ts` properly configured
- `static.json` includes MIME type headers
- `vercel.json` specifies JavaScript MIME type
- `netlify.toml` specifies JavaScript MIME type

**If error persists:**
1. Clear browser cache (Ctrl+Shift+Del)
2. Hard refresh (Ctrl+F5)
3. Check browser DevTools → Network tab → look for `.js` responses
4. Verify status code is 200 (not 404)

---

## 🔴 "favicon.ico/favicon.svg returning 404"

### ✅ FIXED!

**What was wrong:** Favicons in `public/` folder weren't being served.

**What's fixed:**
- `public/favicon.ico` exists
- `public/favicon.svg` exists
- Vite automatically copies `public/` to `dist/`
- Static server configurations include them

**If still 404:**
1. Check file exists: `frontend/public/favicon.ico`
2. Rebuild: `npm run build`
3. Check in browser DevTools → Network → look for favicon requests

---

## 🔴 "Assets not loading (CSS/JS/Images are 404)"

### ✅ FIXED!

**What was wrong:**
- Asset paths weren't correctly generated
- Static server wasn't serving assets
- Cache busting not configured

**What's fixed:**
- `vite.config.ts` configured for asset output
- `/assets/*` properly routed in all server configs
- Cache headers set for 1 year (immutable)

**If still broken:**
```bash
# Rebuild and check
npm run build

# Check the dist folder exists
ls dist/

# Check assets subfolder
ls dist/assets/
```

---

## 🔴 "Blank white page after deployment"

### Debugging Steps:

**Step 1:** Check if local preview works
```bash
npm run build
npm run preview
# Open http://localhost:4173
# Should show your app
```

If ❌ fails locally → issue is with build
If ✅ works locally → issue is with server config

**Step 2:** Check browser console (F12 → Console tab)
Look for errors like:
- Network errors → API BASE URL wrong
- Module errors → MIME type issue (shouldn't happen now)
- Syntax errors → JavaScript error in your code

**Step 3:** Check Network tab (F12 → Network)
- Is `index.html` loading (200 status)?
- Are `/assets/*.js` files loading (200 status)?
- Are any returning 404 or different MIME type?

**Step 4:** Clear browser cache
```
Ctrl+Shift+Del (Windows) or Cmd+Shift+Del (Mac)
Select "Cache" and "Cookies"
Hard refresh: Ctrl+F5
```

**Step 5:** Check environment variables
- Vercel: Settings → Environment Variables → verify `VITE_API_BASE_URL` is set
- Netlify: Build & Deploy → Environment → verify variables
- Render: Environment tab → verify variables

---

## 🔴 "Webpack/Module not found errors"

### Shouldn't happen now, but if you see:

```
Module not found: Can't resolve 'react'
```

**Fix:**
```bash
npm install
npm run build
```

---

## 🔴 "Environment variables not working (import.meta.env is undefined)"

### ✅ FIXED!

**What you did:**
```typescript
const apiUrl = import.meta.env.VITE_API_BASE_URL;  // ✅ Correct!
```

**What NOT to do:**
```typescript
const apiUrl = process.env.VITE_API_BASE_URL;  // ❌ Wrong!
const apiUrl = import.meta.env.API_BASE_URL;     // ❌ Wrong! (needs VITE_ prefix)
```

**If still undefined:**
1. Restart dev server (kill and `npm run dev` again)
2. Check variable name starts with `VITE_`
3. Add to `.env.local` or `.env.production`
4. Restart after editing `.env` files

---

## 🔴 "Vercel/Netlify/Render says 'Build failed'"

### Check error logs:

**Vercel:**
1. Go to your project
2. Deployments tab
3. Click failed deployment
4. Scroll down for build errors

**Netlify:**
1. Go to your site
2. Build & Deploy → Deploys
3. Click failed deploy
4. Open "Deploy Log"

**Render:**
1. Go to your service
2. Logs tab
3. Look for build errors

**Common fixes:**

```bash
# Missing dependencies
npm install

# Wrong build command
# Should be: npm run build

# Wrong publish directory
# Should be: dist (not build, public, etc.)

# Node version mismatch
# Use Node 18+ on all platforms
```

---

## 🟢 "Everything works! How do I know?"

### Checklist:

- [ ] `npm run preview` shows your app locally
- [ ] Navigating pages works (no blank page)
- [ ] Styles are applied (CSS loads)
- [ ] Images display (if you have any)
- [ ] API calls work (if you have backend)
- [ ] No errors in browser console (F12)
- [ ] Network tab shows all files with 200 status

If all ✅ → **You're good to deploy!** 🚀

---

## 🔗 Quick Command Reference

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run linter
npm run lint

# Run tests
npm test

# Watch tests
npm test:watch
```

---

## 📞 Still Stuck?

Check these in order:

1. **Local build works?**
   ```bash
   npm run build && npm run preview
   ```

2. **Check dist folder:**
   ```bash
   ls dist/
   ls dist/assets/
   ```

3. **Browser console (F12):**
   - Any red errors?
   - Copy error and search online

4. **Network tab (F12 → Network):**
   - Are files 200 or 404?
   - Are MIME types correct? (js: application/javascript, css: text/css)

5. **Deployment platform logs:**
   - Vercel: Deployments tab
   - Netlify: Deploy Log
   - Render: Logs tab

6. **Documentation:**
   - Read DEPLOYMENT_GUIDE.md (in this folder)
   - Read BACKEND_INTEGRATION.md (for API issues)

---

**All configuration files are now updated!** ✅

Your project should work perfectly on:
- ✅ Vercel
- ✅ Netlify  
- ✅ Render
- ✅ Any static host
- ✅ Custom Node/Express server
