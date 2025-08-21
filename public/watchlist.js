// Watchlist Management System
class WatchlistManager {
  constructor() {
    this.watchlist = this.loadWatchlist();
    this.availableCryptos = this.getAvailableCryptos();
    
    this.initializeElements();
    this.bindEvents();
    this.updateWatchlistDisplay();
  }

  initializeElements() {
    // Summary elements
    this.watchedCoins = document.getElementById('watchedCoins');
    this.gainingWatched = document.getElementById('gainingWatched');
    this.losingWatched = document.getElementById('losingWatched');

    // Display elements
    this.emptyWatchlist = document.getElementById('emptyWatchlist');
    this.watchlistGrid = document.getElementById('watchlistGrid');
    this.watchlistCards = document.getElementById('watchlistCards');

    // Modal elements
    this.addToWatchlistBtn = document.getElementById('addToWatchlistBtn');
    this.emptyAddWatchlistBtn = document.getElementById('emptyAddWatchlistBtn');
    this.addWatchlistModal = document.getElementById('addWatchlistModal');
    this.closeWatchlistModal = document.getElementById('closeWatchlistModal');
    this.cancelWatchlist = document.getElementById('cancelWatchlist');

    // Search elements
    this.searchCrypto = document.getElementById('searchCrypto');
    this.searchResults = document.getElementById('searchResults');

    // Mobile menu
    this.mobileMenuBtn = document.getElementById('mobileMenuBtn');
    this.mobileMenu = document.getElementById('mobileMenu');
  }

  bindEvents() {
    // Add to watchlist buttons
    this.addToWatchlistBtn.addEventListener('click', () => this.showModal());
    this.emptyAddWatchlistBtn.addEventListener('click', () => this.showModal());

    // Modal controls
    this.closeWatchlistModal.addEventListener('click', () => this.hideModal());
    this.cancelWatchlist.addEventListener('click', () => this.hideModal());
    this.addWatchlistModal.addEventListener('click', (e) => {
      if (e.target === this.addWatchlistModal) this.hideModal();
    });

    // Search functionality
    this.searchCrypto.addEventListener('input', (e) => this.handleSearch(e.target.value));

    // Mobile menu
    this.mobileMenuBtn.addEventListener('click', () => this.toggleMobileMenu());
  }

  loadWatchlist() {
    const saved = localStorage.getItem('cryptoWatchlist');
    return saved ? JSON.parse(saved) : [];
  }

  saveWatchlist() {
    localStorage.setItem('cryptoWatchlist', JSON.stringify(this.watchlist));
  }

  getAvailableCryptos() {
    return [
      { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', price: 43250.25, change24h: 2.98, image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400' },
      { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', price: 2650.75, change24h: 1.95, image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1696501628' },
      { id: 'dogecoin', name: 'Dogecoin', symbol: 'DOGE', price: 0.085, change24h: 2.41, image: 'https://assets.coingecko.com/coins/images/5/large/dogecoin.png?1696501409' },
      { id: 'cardano', name: 'Cardano', symbol: 'ADA', price: 0.52, change24h: -1.23, image: 'https://assets.coingecko.com/coins/images/975/large/Cardano_Logo.png?1696501409' },
      { id: 'solana', name: 'Solana', symbol: 'SOL', price: 98.45, change24h: 5.67, image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png?1696501409' },
      { id: 'polkadot', name: 'Polkadot', symbol: 'DOT', price: 7.23, change24h: -0.85, image: 'https://assets.coingecko.com/coins/images/12171/large/polkadot_new_logo.png?1696501409' },
      { id: 'chainlink', name: 'Chainlink', symbol: 'LINK', price: 15.67, change24h: 3.42, image: 'https://assets.coingecko.com/coins/images/877/large/chainlink.png?1696501409' },
      { id: 'litecoin', name: 'Litecoin', symbol: 'LTC', price: 68.90, change24h: -2.15, image: 'https://assets.coingecko.com/coins/images/2/large/litecoin.png?1696501409' },
      { id: 'bitcoin-cash', name: 'Bitcoin Cash', symbol: 'BCH', price: 245.67, change24h: 1.78, image: 'https://assets.coingecko.com/coins/images/780/large/bitcoin-cash.png?1696501409' },
      { id: 'stellar', name: 'Stellar', symbol: 'XLM', price: 0.123, change24h: 0.45, image: 'https://assets.coingecko.com/coins/images/100/large/Stellar_symbol_black_RGB.png?1696501409' }
    ];
  }

  showModal() {
    this.addWatchlistModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    this.searchCrypto.value = '';
    this.searchResults.innerHTML = '';
  }

  hideModal() {
    this.addWatchlistModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }

  toggleMobileMenu() {
    this.mobileMenu.classList.toggle('hidden');
  }

  handleSearch(query) {
    if (!query.trim()) {
      this.searchResults.innerHTML = '';
      return;
    }

    const filtered = this.availableCryptos.filter(crypto => 
      crypto.name.toLowerCase().includes(query.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(query.toLowerCase())
    );

    this.displaySearchResults(filtered);
  }

  displaySearchResults(results) {
    this.searchResults.innerHTML = '';

    if (results.length === 0) {
      this.searchResults.innerHTML = '<p class="text-gray-400 text-center py-4">No cryptocurrencies found</p>';
      return;
    }

    results.forEach(crypto => {
      const resultItem = document.createElement('div');
      resultItem.className = 'flex items-center justify-between p-3 bg-darker rounded-lg hover:bg-gray-700 transition-colors cursor-pointer';
      
      const isInWatchlist = this.watchlist.some(item => item.id === crypto.id);
      
      resultItem.innerHTML = `
        <div class="flex items-center space-x-3">
          <img src="${crypto.image}" alt="${crypto.name}" class="w-8 h-8 rounded-full">
          <div>
            <div class="font-semibold">${crypto.name}</div>
            <div class="text-sm text-gray-400">${crypto.symbol}</div>
          </div>
        </div>
        <button 
          onclick="watchlistManager.toggleWatchlist('${crypto.id}')"
          class="px-3 py-1 rounded-lg text-sm transition-colors ${isInWatchlist ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-lighter hover:bg-blue-600 text-white'}"
        >
          ${isInWatchlist ? 'Remove' : 'Add'}
        </button>
      `;
      
      this.searchResults.appendChild(resultItem);
    });
  }

  toggleWatchlist(cryptoId) {
    const existingIndex = this.watchlist.findIndex(item => item.id === cryptoId);
    
    if (existingIndex !== -1) {
      // Remove from watchlist
      this.watchlist.splice(existingIndex, 1);
    } else {
      // Add to watchlist
      const crypto = this.availableCryptos.find(c => c.id === cryptoId);
      if (crypto) {
        this.watchlist.push({
          id: crypto.id,
          name: crypto.name,
          symbol: crypto.symbol,
          image: crypto.image,
          addedAt: new Date().toISOString()
        });
      }
    }

    this.saveWatchlist();
    this.updateWatchlistDisplay();
    this.hideModal();
  }

  updateWatchlistDisplay() {
    if (this.watchlist.length === 0) {
      this.showEmptyState();
      return;
    }

    this.showWatchlistGrid();
    this.updateWatchlistSummary();
    this.renderWatchlistCards();
  }

  showEmptyState() {
    this.emptyWatchlist.classList.remove('hidden');
    this.watchlistGrid.classList.add('hidden');
    this.updateWatchlistSummary();
  }

  showWatchlistGrid() {
    this.emptyWatchlist.classList.add('hidden');
    this.watchlistGrid.classList.remove('hidden');
  }

  updateWatchlistSummary() {
    this.watchedCoins.textContent = this.watchlist.length;
    
    // Count gaining and losing coins
    let gaining = 0;
    let losing = 0;
    
    this.watchlist.forEach(item => {
      const crypto = this.availableCryptos.find(c => c.id === item.id);
      if (crypto) {
        if (crypto.change24h > 0) gaining++;
        else if (crypto.change24h < 0) losing++;
      }
    });
    
    this.gainingWatched.textContent = gaining;
    this.losingWatched.textContent = losing;
  }

  renderWatchlistCards() {
    this.watchlistCards.innerHTML = '';

    this.watchlist.forEach(item => {
      const card = this.createWatchlistCard(item);
      this.watchlistCards.appendChild(card);
    });
  }

  createWatchlistCard(item) {
    const crypto = this.availableCryptos.find(c => c.id === item.id);
    if (!crypto) return document.createElement('div');

    const card = document.createElement('div');
    card.className = 'bg-darker rounded-lg p-6 shadow-lg hover:shadow-xl transition-all hover:scale-105';
    
    const changeClass = crypto.change24h >= 0 ? 'text-green-400' : 'text-red-400';
    const changeIcon = crypto.change24h >= 0 ? 'fa-arrow-up' : 'fa-arrow-down';
    
    card.innerHTML = `
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-3">
          <img src="${crypto.image}" alt="${crypto.name}" class="w-10 h-10 rounded-full">
          <div>
            <h4 class="font-semibold">${crypto.name}</h4>
            <p class="text-sm text-gray-400">${crypto.symbol}</p>
          </div>
        </div>
        <button 
          onclick="watchlistManager.toggleWatchlist('${crypto.id}')"
          class="text-red-400 hover:text-red-300 transition-colors"
          title="Remove from watchlist"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>
      
      <div class="space-y-3">
        <div class="flex justify-between items-center">
          <span class="text-gray-400">Current Price</span>
          <span class="font-semibold">$${crypto.price.toLocaleString()}</span>
        </div>
        
        <div class="flex justify-between items-center">
          <span class="text-gray-400">24h Change</span>
          <div class="flex items-center space-x-2">
            <i class="fas ${changeIcon} text-sm ${changeClass}"></i>
            <span class="font-semibold ${changeClass}">${crypto.change24h.toFixed(2)}%</span>
          </div>
        </div>
        
        <div class="flex justify-between items-center">
          <span class="text-gray-400">Added</span>
          <span class="text-sm text-gray-400">${new Date(item.addedAt).toLocaleDateString()}</span>
        </div>
      </div>
      
      <div class="mt-4 pt-4 border-t border-gray-600">
        <div class="flex space-x-2">
          <button 
            onclick="watchlistManager.viewDetails('${crypto.id}')"
            class="flex-1 bg-lighter hover:bg-blue-600 text-white px-3 py-2 rounded-lg transition-colors text-sm"
          >
            View Details
          </button>
          <button 
            onclick="watchlistManager.setAlert('${crypto.id}')"
            class="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-2 rounded-lg transition-colors text-sm"
          >
            Set Alert
          </button>
        </div>
      </div>
    `;
    
    return card;
  }

  viewDetails(cryptoId) {
    // TODO: Implement detailed view
    alert('Detailed view coming soon!');
  }

  setAlert(cryptoId) {
    // TODO: Implement price alert functionality
    alert('Price alert functionality coming soon!');
  }
}

// Initialize the watchlist manager when DOM is loaded
let watchlistManager;
document.addEventListener("DOMContentLoaded", () => {
  watchlistManager = new WatchlistManager();
});
