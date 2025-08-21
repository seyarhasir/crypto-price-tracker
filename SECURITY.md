# Security Guide

## 🔐 API Key Security

Your CoinGecko API key is now stored in `public/config.js` and is **NOT** committed to version control.

### ✅ What's Protected:

- API key is in `config.js` (added to `.gitignore`)
- No hardcoded keys in main source files
- Easy to update without touching main code

### ⚠️ Important Security Steps:

1. **Never commit `config.js` to Git:**

   ```bash
   # The file is already in .gitignore, but verify:
   git status
   # config.js should NOT appear in tracked files
   ```

2. **If you accidentally committed the key:**

   - Immediately rotate your CoinGecko API key
   - Remove the file from Git history
   - Update the new key in `config.js`

3. **For production deployment:**
   - Use environment variables instead of `config.js`
   - Never expose API keys in client-side code
   - Consider using a backend proxy for API calls

### 🔄 Updating Your API Key:

If you need to change your API key:

1. Edit `public/config.js`
2. Update the `API_KEY` value
3. Save the file
4. Refresh your application

### 📁 Files Structure:

```
crypto-price-tracker/
├── public/
│   ├── config.js          ← API key here (NOT in Git)
│   ├── script.js          ← Uses CONFIG.API_KEY
│   ├── portfolio.js       ← Uses CONFIG.API_KEY
│   └── ...
├── .gitignore             ← Excludes config.js
└── SECURITY.md            ← This file
```

### 🚨 Security Best Practices:

- **Never share your API key publicly**
- **Rotate keys regularly**
- **Monitor API usage for suspicious activity**
- **Use rate limiting if possible**
- **Consider API key restrictions in CoinGecko dashboard**

### 🔍 Monitoring:

Check your CoinGecko dashboard regularly for:

- Unusual API usage patterns
- Rate limit warnings
- Suspicious IP addresses

---

**Remember:** This is a client-side application. For production use, consider moving API calls to a secure backend service.
