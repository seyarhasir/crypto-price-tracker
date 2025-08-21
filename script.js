// Crypto Price Tracker - Main JavaScript File
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

    initializeElements() {
        // Main elements
        this.loadingState = document.getElementById('loadingState');
        this.errorState = document.getElementById('errorState');
        this.cryptoTable = document.getElementById('cryptoTable');
        this.cryptoTableBody = document.getElementById('cryptoTableBody');
        this.pagination = document.getElementById('pagination');
        
        // Stats elements
        this.totalMarketCap = document.getElementById('totalMarketCap');
        this.totalVolume = document.getElementById('totalVolume');
        this.activeCoins = document.getElementById('activeCoins');
        this.btcDominance = document.getElementById('btcDominance');
        this.lastUpdated = document.getElementById('lastUpdated');
        
        // Control elements
        this.searchInput = document.getElementById('searchInput');
        this.refreshBtn = document.getElementById('refreshBtn');
        this.retryBtn = document.getElementById('retryBtn');
        this.prevPage = document.getElementById('prevPage');
        this.nextPage = document.getElementById('nextPage');
        this.pageInfo = document.getElementById('pageInfo');
        
        // Sort buttons
        this.sortMarketCap = document.getElementById('sortMarketCap');
        this.sortPrice = document.getElementById('sortPrice');
        this.sortChange = document.getElementById('sortChange');
    }

    bindEvents() {
        // Search functionality
        this.searchInput.addEventListener('input', (e) => {
            this.filterData(e.target.value);
        });

        // Refresh button
        this.refreshBtn.addEventListener('click', () => {
            this.loadCryptoData();
        });

        // Retry button
        this.retryBtn.addEventListener('click', () => {
            this.loadCryptoData();
        });

        // Pagination
        this.prevPage.addEventListener('click', () => {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.renderTable();
            }
        });

        this.nextPage.addEventListener('click', () => {
            const maxPages = Math.ceil(this.filteredData.length / this.itemsPerPage);
            if (this.currentPage < maxPages) {
                this.currentPage++;
                this.renderTable();
            }
        });

        // Sorting
        this.sortMarketCap.addEventListener('click', () => {
            this.sortData('market_cap');
        });

        this.sortPrice.addEventListener('click', () => {
            this.sortData('current_price');
        });

        this.sortChange.addEventListener('click', () => {
            this.sortData('price_change_percentage_24h');
        });
    }

    async loadCryptoData() {
        try {
            this.showLoading();
            
            // Fetch data from CoinGecko API
            const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            this.cryptoData = await response.json();
            this.filteredData = [...this.cryptoData];
            
            this.updateStats();
            this.renderTable();
            this.showTable();
            this.updateLastUpdated();
            
        } catch (error) {
            console.error('Error fetching crypto data:', error);
            this.showError();
        }
    }

    filterData(searchTerm) {
        if (!searchTerm.trim()) {
            this.filteredData = [...this.cryptoData];
        } else {
            const term = searchTerm.toLowerCase();
            this.filteredData = this.cryptoData.filter(coin => 
                coin.name.toLowerCase().includes(term) ||
                coin.symbol.toLowerCase().includes(term) ||
                coin.id.toLowerCase().includes(term)
            );
        }
        
        this.currentPage = 1;
        this.renderTable();
        this.updatePagination();
    }

    sortData(field) {
        const direction = this.sortConfig.field === field && this.sortConfig.direction === 'asc' ? 'desc' : 'asc';
        this.sortConfig = { field, direction };
        
        this.filteredData.sort((a, b) => {
            let aVal = a[field] || 0;
            let bVal = b[field] || 0;
            
            // Handle null/undefined values
            if (aVal === null || aVal === undefined) aVal = 0;
            if (bVal === null || bVal === undefined) bVal = 0;
            
            if (direction === 'asc') {
                return aVal - bVal;
            } else {
                return bVal - aVal;
            }
        });
        
        this.currentPage = 1;
        this.renderTable();
        this.updatePagination();
        this.updateSortButtonStates();
    }

    updateSortButtonStates() {
        // Reset all sort buttons
        [this.sortMarketCap, this.sortPrice, this.sortChange].forEach(btn => {
            btn.innerHTML = btn.innerHTML.replace('↑', '').replace('↓', '');
            btn.classList.remove('bg-blue-600');
            btn.classList.add('bg-lighter');
        });
        
        // Highlight active sort
        let activeBtn;
        switch (this.sortConfig.field) {
            case 'market_cap':
                activeBtn = this.sortMarketCap;
                break;
            case 'current_price':
                activeBtn = this.sortPrice;
                break;
            case 'price_change_percentage_24h':
                activeBtn = this.sortChange;
                break;
        }
        
        if (activeBtn) {
            activeBtn.classList.remove('bg-lighter');
            activeBtn.classList.add('bg-blue-600');
            const arrow = this.sortConfig.direction === 'asc' ? '↑' : '↓';
            activeBtn.innerHTML = activeBtn.innerHTML + ` ${arrow}`;
        }
    }

    renderTable() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const pageData = this.filteredData.slice(startIndex, endIndex);
        
        this.cryptoTableBody.innerHTML = '';
        
        pageData.forEach((coin, index) => {
            const row = this.createCoinRow(coin, startIndex + index + 1);
            this.cryptoTableBody.appendChild(row);
        });
        
        this.updatePagination();
    }

    createCoinRow(coin, rank) {
        const row = document.createElement('tr');
        row.className = 'hover:bg-gray-700 transition-colors';
        
        const priceChange = coin.price_change_percentage_24h || 0;
        const priceChangeClass = priceChange >= 0 ? 'text-green-400' : 'text-red-400';
        const priceChangeIcon = priceChange >= 0 ? 'fa-arrow-up' : 'fa-arrow-down';
        
        row.innerHTML = `
            <td class="px-6 py-4 text-sm text-gray-300">${rank}</td>
            <td class="px-6 py-4">
                <div class="flex items-center space-x-3">
                    <img src="${coin.image}" alt="${coin.name}" class="w-8 h-8 rounded-full">
                    <div>
                        <div class="font-semibold">${coin.name}</div>
                        <div class="text-sm text-gray-400">${coin.symbol.toUpperCase()}</div>
                    </div>
                </div>
            </td>
            <td class="px-6 py-4 text-right">
                <div class="font-semibold">$${this.formatNumber(coin.current_price)}</div>
            </td>
            <td class="px-6 py-4 text-right">
                <div class="flex items-center justify-end space-x-2">
                    <i class="fas ${priceChangeIcon} text-sm ${priceChangeClass}"></i>
                    <span class="${priceChangeClass} font-semibold">${priceChange.toFixed(2)}%</span>
                </div>
            </td>
            <td class="px-6 py-4 text-right">
                <div class="font-semibold">$${this.formatNumber(coin.market_cap)}</div>
            </td>
            <td class="px-6 py-4 text-right">
                <div class="font-semibold">$${this.formatNumber(coin.total_volume)}</div>
            </td>
            <td class="px-6 py-4 text-right">
                <div class="font-semibold">${this.formatNumber(coin.circulating_supply)} ${coin.symbol.toUpperCase()}</div>
            </td>
        `;
        
        return row;
    }

    updateStats() {
        const totalMarketCap = this.cryptoData.reduce((sum, coin) => sum + (coin.market_cap || 0), 0);
        const totalVolume = this.cryptoData.reduce((sum, coin) => sum + (coin.total_volume || 0), 0);
        const btc = this.cryptoData.find(coin => coin.id === 'bitcoin');
        const btcDominance = btc ? ((btc.market_cap / totalMarketCap) * 100).toFixed(2) : 0;
        
        this.totalMarketCap.textContent = `$${this.formatNumber(totalMarketCap)}`;
        this.totalVolume.textContent = `$${this.formatNumber(totalVolume)}`;
        this.activeCoins.textContent = this.cryptoData.length;
        this.btcDominance.textContent = `${btcDominance}%`;
    }

    updatePagination() {
        const maxPages = Math.ceil(this.filteredData.length / this.itemsPerPage);
        
        this.prevPage.disabled = this.currentPage <= 1;
        this.nextPage.disabled = this.currentPage >= maxPages;
        
        this.pageInfo.textContent = `Page ${this.currentPage} of ${maxPages}`;
        
        if (maxPages <= 1) {
            this.pagination.classList.add('hidden');
        } else {
            this.pagination.classList.remove('hidden');
        }
    }

    updateLastUpdated() {
        const now = new Date();
        this.lastUpdated.textContent = now.toLocaleTimeString();
    }

    formatNumber(num) {
        if (num === null || num === undefined) return '0';
        
        if (num >= 1e12) {
            return (num / 1e12).toFixed(2) + 'T';
        } else if (num >= 1e9) {
            return (num / 1e9).toFixed(2) + 'B';
        } else if (num >= 1e6) {
            return (num / 1e6).toFixed(2) + 'M';
        } else if (num >= 1e3) {
            return (num / 1e3).toFixed(2) + 'K';
        } else {
            return num.toFixed(2);
        }
    }

    showLoading() {
        this.loadingState.classList.remove('hidden');
        this.errorState.classList.add('hidden');
        this.cryptoTable.classList.add('hidden');
        this.pagination.classList.add('hidden');
    }

    showError() {
        this.loadingState.classList.add('hidden');
        this.errorState.classList.remove('hidden');
        this.cryptoTable.classList.add('hidden');
        this.pagination.classList.add('hidden');
    }

    showTable() {
        this.loadingState.classList.add('hidden');
        this.errorState.classList.add('hidden');
        this.cryptoTable.classList.remove('hidden');
    }

    startAutoRefresh() {
        // Auto-refresh every 5 minutes
        setInterval(() => {
            this.loadCryptoData();
        }, 5 * 60 * 1000);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CryptoPriceTracker();
});

// Add some nice animations and interactions
document.addEventListener('DOMContentLoaded', () => {
    // Add smooth scrolling for better UX
    const smoothScroll = (target) => {
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    };

    // Add loading animation for refresh button
    const refreshBtn = document.getElementById('refreshBtn');
    refreshBtn.addEventListener('click', () => {
        refreshBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Refreshing...';
        refreshBtn.disabled = true;
        
        setTimeout(() => {
            refreshBtn.innerHTML = '<i class="fas fa-sync-alt mr-2"></i>Refresh';
            refreshBtn.disabled = false;
        }, 2000);
    });

    // Add search input focus effect
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('focus', () => {
        searchInput.parentElement.classList.add('ring-2', 'ring-lighter');
    });
    
    searchInput.addEventListener('blur', () => {
        searchInput.parentElement.classList.remove('ring-2', 'ring-lighter');
    });

    // Add table row hover effects
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest('tr')) {
            e.target.closest('tr').style.transform = 'scale(1.01)';
            e.target.closest('tr').style.transition = 'transform 0.2s ease';
        }
    });

    document.addEventListener('mouseout', (e) => {
        if (e.target.closest('tr')) {
            e.target.closest('tr').style.transform = 'scale(1)';
        }
    });
});

