# 🚀 Crypto Price Tracker

A modern, responsive web application that displays real-time cryptocurrency prices using the CoinGecko API. Built with vanilla JavaScript, HTML5, and Tailwind CSS for a sleek, professional interface.

![Crypto Price Tracker](https://img.shields.io/badge/Status-Live%20Demo-brightgreen)
![Live Demo](https://img.shields.io/badge/Live%20Demo-Netlify-blue?style=flat&logo=netlify)
![Tech Stack](https://img.shields.io/badge/Tech%20Stack-HTML5%20%7C%20CSS3%20%7C%20JavaScript-blue)
![API](https://img.shields.io/badge/API-CoinGecko-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

## ✨ Features

### 🎯 Core Functionality
- **Real-time Data**: Live cryptocurrency prices updated every 5 minutes
- **100+ Cryptocurrencies**: Comprehensive coverage including Bitcoin, Ethereum, Dogecoin, Monero, and more
- **Market Statistics**: Total market cap, 24h volume, active coins, and Bitcoin dominance
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### 🔍 Advanced Features
- **Smart Search**: Filter coins by name, symbol, or ID
- **Dynamic Sorting**: Sort by market cap, price, or 24h change
- **Pagination**: Navigate through large datasets efficiently
- **Auto-refresh**: Automatic data updates every 5 minutes
- **Error Handling**: Graceful fallbacks and retry mechanisms

### 🎨 User Experience
- **Dark Theme**: Modern, eye-friendly interface
- **Hover Effects**: Interactive table rows with smooth animations
- **Loading States**: Professional loading indicators and transitions
- **Mobile Optimized**: Responsive design for all device sizes

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Styling**: Tailwind CSS (via CDN)
- **Icons**: Font Awesome 6.4.0
- **API**: CoinGecko Public API
- **Deployment**: GitHub Pages ready

## 🚀 Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No build tools or package managers required

### Installation
1. Clone the repository:
```bash
git clone https://github.com/seyarhasir/crypto-price-tracker.git
cd crypto-price-tracker
```

2. Open `public/index.html` in your browser or serve locally:
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js
npx serve public

# Using PHP
php -S localhost:8000
```

3. Navigate to `http://localhost:8000` in your browser

### Live Demo
Visit the live demo: [Crypto Price Tracker](https://seyar-crypto-price-tracker.netlify.app/)

## 📱 Screenshots

### Desktop View
![Desktop View](screenshots/desktop.png)

### Mobile View
![Mobile View](screenshots/mobile.png)

### Search & Filtering
![Search & Filtering](screenshots/search.png)

## 🔧 API Integration

The app integrates with the **CoinGecko API** to fetch real-time cryptocurrency data:

```javascript
// Example API call
const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en');
```

**API Features:**
- ✅ **Free to use** - No API key required
- ✅ **Rate limiting** - 50 calls per minute
- ✅ **Real-time data** - Live market information
- ✅ **Comprehensive coverage** - 100+ cryptocurrencies

> **Note:** The live demo may occasionally show "Failed to load data" due to CoinGecko API rate limiting. This is normal and the app includes graceful error handling with retry functionality.

## 🎯 Use Cases

### For Developers
- **Portfolio Project**: Showcase modern web development skills
- **API Integration**: Demonstrate external API consumption
- **Responsive Design**: Mobile-first development approach
- **Performance**: Optimized for speed and user experience

### For Businesses
- **Crypto Monitoring**: Track cryptocurrency prices for business decisions
- **Payment Integration**: Monitor prices for crypto payment acceptance
- **Market Analysis**: Real-time market data for financial planning
- **Customer Service**: Provide crypto price information to customers

### For Crypto Enthusiasts
- **Price Tracking**: Monitor favorite cryptocurrencies
- **Market Research**: Analyze market trends and movements
- **Portfolio Management**: Track investment performance
- **Educational Tool**: Learn about different cryptocurrencies

## 🏗️ Project Structure

```
crypto-price-tracker/
├── index.html          # Main HTML structure
├── script.js           # JavaScript functionality
├── README.md           # Project documentation
├── screenshots/        # Application screenshots
└── .gitignore         # Git ignore file
```

## 🔍 Code Highlights

### Modern JavaScript (ES6+)
```javascript
class CryptoPriceTracker {
    constructor() {
        this.cryptoData = [];
        this.filteredData = [];
        this.currentPage = 1;
        this.itemsPerPage = 20;
        this.sortConfig = { field: 'market_cap_rank', direction: 'asc' };
        
        this.initializeElements();
        this.bindEvents();
        this.loadCryptoData();
        this.startAutoRefresh();
    }
    
    // Async/await for API calls
    async loadCryptoData() {
        try {
            const response = await fetch(API_ENDPOINT);
            this.cryptoData = await response.json();
            this.updateStats();
            this.renderTable();
        } catch (error) {
            this.showError();
        }
    }
}
```

### Responsive Design with Tailwind CSS
```html
<!-- Mobile-first responsive grid -->
<div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
    <div class="bg-primary rounded-lg p-6 shadow-lg">
        <!-- Stats card content -->
    </div>
</div>

<!-- Responsive table with horizontal scroll -->
<div class="overflow-x-auto">
    <table class="w-full">
        <!-- Table content -->
    </table>
</div>
```

### Event-Driven Architecture
```javascript
bindEvents() {
    // Search functionality
    this.searchInput.addEventListener('input', (e) => {
        this.filterData(e.target.value);
    });
    
    // Sorting functionality
    this.sortMarketCap.addEventListener('click', () => {
        this.sortData('market_cap');
    });
    
    // Pagination
    this.prevPage.addEventListener('click', () => {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.renderTable();
        }
    });
}
```

## 🚀 Deployment

### 🌟 Live Demo
Your Crypto Price Tracker is now live and accessible to anyone on the internet!

**🌐 Live URL:** [https://seyar-crypto-price-tracker.netlify.app/](https://seyar-crypto-price-tracker.netlify.app/)

### GitHub Pages
1. Push your code to GitHub
2. Go to repository Settings > Pages
3. Select source branch (usually `main`)
4. Your app will be available at `https://username.github.io/repository-name`

### Netlify (Current Deployment)
1. Connected to GitHub repository for automatic deployments
2. Custom domain: `seyar-crypto-price-tracker.netlify.app`
3. Automatic HTTPS and global CDN
4. Deploys automatically on every push to main branch

### Netlify
1. Drag and drop your project folder to Netlify
2. Automatic deployment and HTTPS
3. Custom domain support available

### Vercel
1. Connect your GitHub repository
2. Automatic deployments on push
3. Global CDN and edge functions

## 🔮 Future Enhancements

### Planned Features
- [ ] **Price Alerts**: Set custom price notifications
- [ ] **Portfolio Tracking**: Add/remove coins to watchlist
- [ ] **Historical Charts**: Price history with Chart.js
- [ ] **Dark/Light Theme Toggle**: User preference settings
- [ ] **Export Data**: CSV/PDF export functionality
- [ ] **Multiple Currencies**: Support for EUR, GBP, etc.

### Technical Improvements
- [ ] **Service Worker**: Offline functionality
- [ ] **Local Storage**: Save user preferences
- [ ] **WebSocket**: Real-time price updates
- [ ] **PWA Support**: Installable web app
- [ ] **Unit Tests**: Jest testing framework

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Setup
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **CoinGecko**: For providing the free cryptocurrency API
- **Tailwind CSS**: For the utility-first CSS framework
- **Font Awesome**: For the beautiful icons
- **Open Source Community**: For inspiration and support

## 📞 Contact

- **GitHub**: [@seyarhasir](https://github.com/seyarhasir)
- **LinkedIn**: [Ahmad Seyar Hasir](https://linkedin.com/in/seyarhasir)
- **Portfolio**: [seyarhasir.com](https://seyarhasir.com)

## ⭐ Star History

[![Star History Chart](https://api.star-history.com/svg?repos/seyarhasir/crypto-price-tracker&type=Date)](https://star-history.com/#seyarhasir/crypto-price-tracker&Date)

---

<div align="center">
    <p>Made with ❤️ for the crypto community</p>
</div>

