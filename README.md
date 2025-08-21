# 🚀 Crypto Price Tracker

A comprehensive, real-time cryptocurrency tracking application built with vanilla JavaScript, HTML5, and Tailwind CSS. Track prices, manage portfolios, set alerts, and stay updated with the latest crypto market data.

![Crypto Tracker Demo](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![Security](https://img.shields.io/badge/Security-Enterprise%20Grade-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

- **📊 Real-time Market Data** - Live cryptocurrency prices from CoinGecko API
- **💼 Portfolio Management** - Track your investments with P&L calculations
- **👁️ Watchlist** - Monitor your favorite cryptocurrencies
- **🔔 Price Alerts** - Set notifications for price targets
- **📰 Crypto News** - Stay updated with latest market news
- **🔄 Currency Converter** - Convert between different cryptocurrencies
- **📱 Mobile Responsive** - Optimized for all devices
- **🎨 Modern UI/UX** - Beautiful, intuitive interface with dark theme

## 🚨 **SECURITY SETUP (REQUIRED)**

**⚠️ IMPORTANT: This repository is PUBLIC. You MUST set up your own API key for security!**

### **Step 1: Get Your CoinGecko API Key**

1. Go to [CoinGecko API](https://www.coingecko.com/en/api)
2. Sign up for a free account
3. Navigate to **API Keys** section
4. Generate a new API key
5. **Copy your API key** (you'll need it in the next step)

### **Step 2: Set Up Your Configuration**

1. **Copy the template file:**

   ```bash
   cp public/config.template.js public/config.js
   ```

2. **Edit `public/config.js`:**

   ```javascript
   API_KEY: "YOUR_ACTUAL_API_KEY_HERE", // Replace with your real key
   ```

3. **Verify `.gitignore` includes:**

   ```
   config.js
   public/config.js
   ```

4. **Check Git status:**
   ```bash
   git status
   # config.js should NOT appear in tracked files
   ```

### **Step 3: Deploy Securely**

- **For Netlify**: Set environment variables in dashboard
- **For other platforms**: Use their environment variable system
- **Never commit your API key to Git!**

## 🛠️ Installation

### **Local Development**

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/crypto-price-tracker.git
   cd crypto-price-tracker
   ```

2. **Set up your API key** (see Security Setup above)

3. **Open in browser:**

   ```bash
   # Option 1: Python server
   python -m http.server 8000

   # Option 2: Node.js server
   npx serve public

   # Option 3: Live Server (VS Code extension)
   ```

4. **Visit:** `http://localhost:8000`

### **Production Deployment**

#### **Netlify (Recommended)**

1. **Set environment variables in Netlify dashboard:**

   - `COINGECKO_API_KEY` = Your API key
   - `COINGECKO_BASE_URL` = `https://api.coingecko.com/api/v3`

2. **Deploy:**
   - Connect your Git repository
   - Netlify will automatically build and deploy

#### **Other Platforms**

- **Vercel**: Use environment variables in project settings
- **GitHub Pages**: Set up GitHub Actions with secrets
- **Custom Server**: Use environment variables or `.env` files

## 📁 Project Structure

```
crypto-price-tracker/
├── public/
│   ├── index.html          # Dashboard page
│   ├── portfolio.html      # Portfolio management
│   ├── watchlist.html      # Watchlist page
│   ├── news.html          # Crypto news
│   ├── converter.html      # Currency converter
│   ├── alerts.html        # Price alerts
│   ├── config.template.js  # Safe template (commit this)
│   ├── config.js          # Your config (NEVER commit)
│   ├── script.js          # Main dashboard logic
│   ├── portfolio.js       # Portfolio management
│   ├── watchlist.js       # Watchlist functionality
│   ├── news.js           # News management
│   ├── converter.js       # Currency conversion
│   ├── alerts.js         # Alert system
│   ├── styles.css        # Custom styles
│   └── demo-data.js      # Fallback data
├── build.js              # Build script for Netlify
├── netlify.toml         # Netlify configuration
├── .gitignore           # Git exclusions
├── SECURITY.md          # Security guide
└── README.md            # This file
```

## 🔧 Configuration

### **API Settings**

```javascript
// In public/config.js
COINGECKO: {
  API_KEY: "your_api_key_here",
  BASE_URL: "https://api.coingecko.com/api/v3",
  ENDPOINTS: {
    MARKETS: "/coins/markets",
    SIMPLE_PRICE: "/simple/price"
  }
}
```

### **App Settings**

```javascript
APP: {
  AUTO_REFRESH_INTERVAL: 300000, // 5 minutes
  ITEMS_PER_PAGE: 20,
  MAX_RETRIES: 3
}
```

## 🎯 Usage

### **Dashboard**

- View real-time cryptocurrency prices
- Sort by market cap, price, or 24h change
- Search and filter coins
- Add coins to watchlist or portfolio

### **Portfolio**

- Track your cryptocurrency investments
- Calculate profit/loss
- Monitor portfolio performance
- Add/remove assets

### **Watchlist**

- Monitor favorite cryptocurrencies
- Set price alerts
- Track price changes

### **News**

- Stay updated with crypto market news
- Filter by category
- Save interesting articles

### **Converter**

- Convert between cryptocurrencies
- Real-time exchange rates
- Historical conversion data

## 🚀 Features in Detail

### **Real-time Data**

- Live price updates every 5 minutes
- Market cap and volume information
- 24-hour price change percentages
- Bitcoin dominance tracking

### **Portfolio Management**

- Asset quantity tracking
- Buy price and date recording
- Average cost calculation
- Total portfolio value
- Profit/loss calculations

### **Mobile Responsiveness**

- Optimized for all screen sizes
- Touch-friendly interface
- Mobile navigation menu
- Responsive tables and cards

### **User Experience**

- Smooth animations and transitions
- Loading states and error handling
- Toast notifications
- Keyboard shortcuts (ESC to close modals)

## 🔒 Security Features

- **Environment Variables** - API keys never in source code
- **Build-time Injection** - Secure key replacement during deployment
- **Git Exclusions** - Configuration files not tracked
- **API Key Restrictions** - Limit usage to your domain
- **HTTPS Enforcement** - Secure data transmission

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch:**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes:**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch:**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### **Development Guidelines**

- Follow existing code style
- Add comments for complex logic
- Test on multiple browsers
- Ensure mobile responsiveness
- Update documentation as needed

## 🐛 Troubleshooting

### **Common Issues**

1. **"Failed to load data" error:**

   - Check your API key is correct
   - Verify CoinGecko API is accessible
   - Check browser console for errors

2. **Portfolio not saving:**

   - Ensure localStorage is enabled
   - Check browser permissions
   - Clear browser cache if needed

3. **Mobile menu not working:**
   - Check JavaScript console for errors
   - Verify all required elements exist
   - Test on different devices

### **API Rate Limits**

- CoinGecko free tier: 50 calls/minute
- Implement caching for production use
- Monitor API usage in dashboard

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **CoinGecko** - For providing the cryptocurrency API
- **Tailwind CSS** - For the beautiful UI framework
- **Font Awesome** - For the amazing icons
- **Open Source Community** - For inspiration and support

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/crypto-price-tracker/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/crypto-price-tracker/discussions)
- **Wiki**: [Project Wiki](https://github.com/yourusername/crypto-price-tracker/wiki)

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=yourusername/crypto-price-tracker&type=Date)](https://star-history.com/#yourusername/crypto-price-tracker&Date)

---

**⭐ If you find this project helpful, please give it a star!**

**🔒 Remember: Always keep your API keys secure and never commit them to public repositories!**
