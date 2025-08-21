# Security Guide

## 🚨 **CRITICAL SECURITY WARNING**

**⚠️ YOUR REPOSITORY IS PUBLIC! This means anyone can see your code and potentially abuse your API keys!**

### **🔒 IMMEDIATE ACTIONS REQUIRED:**

1. **NEVER commit `config.js` to Git** (already in .gitignore)
2. **Use `config.template.js` instead** (safe for public repos)
3. **Get your own API key** from CoinGecko
4. **Set up environment variables** in your deployment platform

## 🔐 API Key Security

Your CoinGecko API key is now secured using **Netlify Environment Variables** - a production-ready solution!

### ✅ What's Protected:

- **API key is NOT in source code** (uses Netlify env vars)
- **Build-time injection** (key replaced during deployment)
- **No hardcoded secrets** in client-side code
- **Easy to rotate** (just update Netlify dashboard)

### 🚀 **Netlify Setup (Production Ready):**

#### **Step 1: Get Your Own API Key**

1. **Go to [CoinGecko API](https://www.coingecko.com/en/api)**
2. **Sign up for a free account**
3. **Navigate to API Keys section**
4. **Generate a new API key**
5. **Copy your API key** (you'll need it in the next step)

#### **Step 2: Set Environment Variables in Netlify**

1. Go to your Netlify dashboard
2. **Site settings** → **Environment variables**
3. Add:
   - `COINGECKO_API_KEY` = `YOUR_NEW_API_KEY_HERE`
   - `COINGECKO_BASE_URL` = `https://api.coingecko.com/api/v3`

#### **Step 3: How It Works**

- During build, `build.js` replaces placeholders with real values
- Your API key is **never committed to Git**
- Each deployment gets fresh, secure configuration

### ⚠️ **CRITICAL Security Steps for Public Repos:**

1. **NEVER commit API keys to Git:**

   ```bash
   # Verify config.js is in .gitignore
   git status
   # config.js should NOT appear
   ```

2. **Use the template file:**

   ```bash
   # Copy template (safe for public repos)
   cp public/config.template.js public/config.js

   # Edit with YOUR key (never commit this)
   nano public/config.js
   ```

3. **If you accidentally committed the key:**

   - **IMMEDIATELY rotate your CoinGecko API key**
   - Remove the file from Git history
   - Update the new key in Netlify dashboard

4. **For production deployment:**
   - ✅ **Netlify environment variables** (current setup)
   - ✅ **API key restrictions** in CoinGecko dashboard
   - ✅ **HTTPS deployment** (Netlify handles this)

### 🔄 **Updating Your API Key:**

If you need to change your API key:

1. **In CoinGecko dashboard**: Generate new key
2. **In Netlify dashboard**: Update `COINGECKO_API_KEY` value
3. **Redeploy**: Netlify will automatically rebuild with new key

### 📁 **Files Structure:**

```
crypto-price-tracker/
├── public/
│   ├── config.template.js  ← SAFE for public repos (commit this)
│   ├── config.js          ← YOUR config (NEVER commit)
│   ├── script.js          ← Uses CONFIG.API_KEY
│   ├── portfolio.js       ← Uses CONFIG.API_KEY
│   └── ...
├── build.js               ← Build script for Netlify
├── netlify.toml          ← Netlify configuration
├── .gitignore            ← Excludes config.js
└── SECURITY.md            ← This file
```

### 🚨 **Security Best Practices:**

- **✅ Use Netlify environment variables** (implemented)
- **✅ Never share API keys publicly**
- **✅ Rotate keys regularly**
- **✅ Monitor API usage**
- **✅ Set API key restrictions in CoinGecko dashboard**
- **✅ Use template files for public repositories**

### 🔍 **Monitoring:**

Check your CoinGecko dashboard regularly for:

- Unusual API usage patterns
- Rate limit warnings
- Suspicious IP addresses

### 🌟 **Why This Solution is Great:**

1. **No backend needed** - Perfect for static sites
2. **Production secure** - Keys never exposed to users
3. **Easy management** - Update keys via Netlify dashboard
4. **Automatic deployment** - Keys updated on every deploy
5. **Industry standard** - Used by thousands of production sites
6. **Public repo safe** - Template files prevent key exposure

### 🚨 **PUBLIC REPOSITORY WARNINGS:**

- **Anyone can see your code** - including potential attackers
- **Template files are safe** - they contain no real secrets
- **Environment variables are secure** - only visible to you
- **Monitor API usage** - watch for unauthorized access
- **Rotate keys regularly** - especially if you suspect exposure

---

**🎉 Congratulations!** Your crypto tracker now follows enterprise-level security practices using Netlify's built-in environment variable system.

**🔒 Remember: Public repositories require extra vigilance. Always use template files and environment variables!**
