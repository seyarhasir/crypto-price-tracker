// Crypto Price Tracker - Main JavaScript File
class CryptoPriceTracker {
  constructor() {
    this.cryptoData = [];
    this.currentPage = 1;
    this.itemsPerPage = 20;
    this.currentSort = { field: "market_cap", direction: "desc" };
    this.searchTerm = "";
    this.isLoading = false;

    this.initializeElements();
    this.bindEvents();
    this.loadData();
  }

  initializeElements() {
    // Core elements
    this.searchInput = document.getElementById("searchInput");
    this.cryptoTable = document.getElementById("cryptoTable");
    this.cryptoTableBody = document.getElementById("cryptoTableBody");
    this.loadingState = document.getElementById("loadingState");
    this.errorState = document.getElementById("errorState");
    this.retryBtn = document.getElementById("retryBtn");
    this.refreshBtn = document.getElementById("refreshBtn");
    this.lastUpdated = document.getElementById("lastUpdated");

    // Stats elements
    this.totalMarketCap = document.getElementById("totalMarketCap");
    this.totalVolume = document.getElementById("totalVolume");
    this.activeCoins = document.getElementById("activeCoins");
    this.btcDominance = document.getElementById("btcDominance");

    // Market sentiment elements
    this.gainingCoins = document.getElementById("gainingCoins");
    this.losingCoins = document.getElementById("losingCoins");
    this.stableCoins = document.getElementById("stableCoins");

    // Sorting buttons
    this.sortMarketCap = document.getElementById("sortMarketCap");
    this.sortPrice = document.getElementById("sortPrice");
    this.sortChange = document.getElementById("sortChange");

    // Pagination elements
    this.prevPage = document.getElementById("prevPage");
    this.nextPage = document.getElementById("nextPage");
    this.pageInfo = document.getElementById("pageInfo");

    // Mobile menu elements
    this.mobileMenuBtn = document.getElementById("mobileMenuBtn");
    this.mobileMenu = document.getElementById("mobileMenu");

    // Initialize mobile menu state
    this.isMobileMenuOpen = false;
  }

  bindEvents() {
    // Search functionality
    this.searchInput?.addEventListener("input", (e) => {
      this.searchTerm = e.target.value.toLowerCase();
      this.currentPage = 1;
      this.renderTable();
    });

    // Sorting functionality
    this.sortMarketCap?.addEventListener("click", () =>
      this.sortBy("market_cap")
    );
    this.sortPrice?.addEventListener("click", () =>
      this.sortBy("current_price")
    );
    this.sortChange?.addEventListener("click", () =>
      this.sortBy("price_change_percentage_24h")
    );

    // Pagination
    this.prevPage?.addEventListener("click", () => this.previousPage());
    this.nextPage?.addEventListener("click", () => this.nextPage());

    // Retry and refresh
    this.retryBtn?.addEventListener("click", () => this.loadData());
    this.refreshBtn?.addEventListener("click", () => this.loadData());

    // Auto-refresh every 5 minutes
    this.startAutoRefresh();

    // Mobile menu
    this.mobileMenuBtn?.addEventListener("click", () =>
      this.toggleMobileMenu()
    );

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (
        !this.mobileMenu?.contains(e.target) &&
        !this.mobileMenuBtn?.contains(e.target)
      ) {
        this.closeMobileMenu();
      }
    });

    // Handle window resize for responsive behavior
    window.addEventListener("resize", () => this.handleResize());

    // Handle escape key for mobile menu
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeMobileMenu();
      }
    });
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;

    if (this.isMobileMenuOpen) {
      this.openMobileMenu();
    } else {
      this.closeMobileMenu();
    }
  }

  openMobileMenu() {
    this.mobileMenu.classList.remove("hidden");
    this.mobileMenu.classList.add("mobile-menu-enter");
    this.mobileMenuBtn.innerHTML = '<i class="fas fa-times text-xl"></i>';

    // Add backdrop blur effect
    document.body.style.overflow = "hidden";
  }

  closeMobileMenu() {
    this.mobileMenu.classList.add("hidden");
    this.mobileMenu.classList.remove("mobile-menu-enter");
    this.mobileMenuBtn.innerHTML = '<i class="fas fa-bars text-xl"></i>';

    // Remove backdrop blur effect
    document.body.style.overflow = "";
    this.isMobileMenuOpen = false;
  }

  handleResize() {
    // Close mobile menu on larger screens
    if (window.innerWidth >= 1024 && this.isMobileMenuOpen) {
      this.closeMobileMenu();
    }
  }

  async loadData() {
    if (this.isLoading) return;

    this.isLoading = true;
    this.showLoading();

    try {
      // Fetch live data from CoinGecko API
      const response = await fetch(
        `${CONFIG.COINGECKO.BASE_URL}${CONFIG.COINGECKO.ENDPOINTS.MARKETS}?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&x_cg_demo_api_key=${CONFIG.COINGECKO.API_KEY}`
      );

      if (!response.ok) {
        throw new Error(
          `API request failed: ${response.status} ${response.statusText}`
        );
      }

      this.cryptoData = await response.json();

      if (this.cryptoData && this.cryptoData.length > 0) {
        this.updateStats();
        this.renderTable();
        this.updateLastUpdated();
        this.hideLoading();
      } else {
        throw new Error("No data received from API");
      }
    } catch (error) {
      console.error("Error loading data:", error);
      this.showError();
    } finally {
      this.isLoading = false;
    }
  }

  showLoading() {
    this.loadingState?.classList.remove("hidden");
    this.cryptoTable?.classList.add("hidden");
    this.errorState?.classList.add("hidden");
  }

  hideLoading() {
    this.loadingState?.classList.add("hidden");
    this.cryptoTable?.classList.remove("hidden");
  }

  showError() {
    this.loadingState?.classList.add("hidden");
    this.cryptoTable?.classList.add("hidden");
    this.errorState?.classList.remove("hidden");
  }

  updateStats() {
    if (!this.cryptoData.length) return;

    const totalMarketCap = this.cryptoData.reduce(
      (sum, coin) => sum + (coin.market_cap || 0),
      0
    );
    const totalVolume = this.cryptoData.reduce(
      (sum, coin) => sum + (coin.total_volume || 0),
      0
    );
    const btcData = this.cryptoData.find(
      (coin) => coin.symbol.toLowerCase() === "btc"
    );
    const btcDominance = btcData
      ? ((btcData.market_cap / totalMarketCap) * 100).toFixed(1)
      : "--";

    this.totalMarketCap.textContent = this.formatCurrency(totalMarketCap);
    this.totalVolume.textContent = this.formatCurrency(totalVolume);
    this.activeCoins.textContent = this.cryptoData.length;
    this.btcDominance.textContent = `${btcDominance}%`;

    this.updateMarketSentiment();
  }

  updateMarketSentiment() {
    let gaining = 0;
    let losing = 0;
    let stable = 0;

    this.cryptoData.forEach((coin) => {
      const change = coin.price_change_percentage_24h || 0;
      if (change > 0.5) {
        gaining++;
      } else if (change < -0.5) {
        losing++;
      } else {
        stable++;
      }
    });

    if (this.gainingCoins) this.gainingCoins.textContent = gaining;
    if (this.losingCoins) this.losingCoins.textContent = losing;
    if (this.stableCoins) this.stableCoins.textContent = stable;
  }

  updateLastUpdated() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    const dateString = now.toLocaleDateString();

    if (this.lastUpdated) {
      this.lastUpdated.textContent = `${dateString} ${timeString}`;
    }
  }

  sortBy(field) {
    if (this.currentSort.field === field) {
      this.currentSort.direction =
        this.currentSort.direction === "asc" ? "desc" : "asc";
    } else {
      this.currentSort.field = field;
      this.currentSort.direction = "desc";
    }

    // Update button states
    this.updateSortButtonStates();

    // Sort data
    this.cryptoData.sort((a, b) => {
      let aVal = a[field] || 0;
      let bVal = b[field] || 0;

      if (field === "price_change_percentage_24h") {
        aVal = Math.abs(aVal);
        bVal = Math.abs(bVal);
      }

      if (this.currentSort.direction === "asc") {
        return aVal - bVal;
      } else {
        return bVal - aVal;
      }
    });

    this.currentPage = 1;
    this.renderTable();
  }

  updateSortButtonStates() {
    const buttons = [this.sortMarketCap, this.sortPrice, this.sortChange];
    const fields = [
      "market_cap",
      "current_price",
      "price_change_percentage_24h",
    ];

    buttons.forEach((button, index) => {
      if (button) {
        const field = fields[index];
        const isActive = this.currentSort.field === field;
        const direction = this.currentSort.direction === "asc" ? "up" : "down";

        button.innerHTML = `
          <i class="fas fa-sort-amount-${isActive ? direction : "down"}"></i>
          <span class="hidden sm:inline">${this.getSortButtonText(field)}</span>
          <span class="sm:hidden">${this.getSortButtonTextShort(field)}</span>
        `;

        button.className = `btn-primary px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2 ${
          isActive
            ? "bg-lighter text-white"
            : "bg-lighter hover:bg-blue-600 text-white"
        }`;
      }
    });
  }

  getSortButtonText(field) {
    switch (field) {
      case "market_cap":
        return "Market Cap";
      case "current_price":
        return "Price";
      case "price_change_percentage_24h":
        return "24h Change";
      default:
        return field;
    }
  }

  getSortButtonTextShort(field) {
    switch (field) {
      case "market_cap":
        return "MCap";
      case "current_price":
        return "Price";
      case "price_change_percentage_24h":
        return "24h";
      default:
        return field;
    }
  }

  renderTable() {
    if (!this.cryptoTableBody) return;

    const filteredData = this.getFilteredData();
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    const pageData = filteredData.slice(startIndex, endIndex);

    this.cryptoTableBody.innerHTML = "";

    pageData.forEach((coin, index) => {
      const row = this.createCoinRow(coin, startIndex + index + 1);
      this.cryptoTableBody.appendChild(row);
    });

    this.updatePagination(filteredData.length);
  }

  getFilteredData() {
    if (!this.searchTerm) return this.cryptoData;

    return this.cryptoData.filter(
      (coin) =>
        coin.name.toLowerCase().includes(this.searchTerm) ||
        coin.symbol.toLowerCase().includes(this.searchTerm)
    );
  }

  createCoinRow(coin, rank) {
    const row = document.createElement("tr");
    row.className =
      "crypto-table-row hover:bg-gray-700 transition-all duration-300";

    const isPositive = (coin.price_change_percentage_24h || 0) > 0;
    const isNegative = (coin.price_change_percentage_24h || 0) < 0;

    const priceChangeClass = isPositive
      ? "text-green-400"
      : isNegative
      ? "text-red-400"
      : "text-gray-400";
    const priceChangeIcon = isPositive
      ? "fa-arrow-up"
      : isNegative
      ? "fa-arrow-down"
      : "fa-minus";

    row.innerHTML = `
      <td class="px-4 sm:px-6 py-4 text-sm font-medium text-gray-300">
        <div class="flex items-center space-x-2">
          <span class="text-lg font-bold">${rank}</span>
          ${
            rank <= 3
              ? `<i class="fas fa-crown text-yellow-400 text-sm"></i>`
              : ""
          }
        </div>
      </td>
      <td class="px-4 sm:px-6 py-4">
        <div class="flex items-center space-x-3">
          <img src="${coin.image}" alt="${
      coin.name
    }" class="w-8 h-8 rounded-full">
          <div>
            <div class="font-medium text-white-text">${coin.name}</div>
            <div class="text-sm text-gray-400 uppercase">${coin.symbol}</div>
          </div>
        </div>
      </td>
      <td class="px-4 sm:px-6 py-4 text-right">
        <div class="text-white-text font-medium">${this.formatCurrency(
          coin.current_price
        )}</div>
        <div class="text-xs text-gray-400">${coin.symbol.toUpperCase()}</div>
      </td>
      <td class="px-4 sm:px-6 py-4 text-right">
        <div class="flex items-center justify-end space-x-1">
          <i class="fas ${priceChangeIcon} text-xs ${priceChangeClass}"></i>
          <span class="${priceChangeClass} font-medium ${
      isPositive
        ? "price-change-positive"
        : isNegative
        ? "price-change-negative"
        : ""
    }">
            ${(coin.price_change_percentage_24h || 0).toFixed(2)}%
          </span>
        </div>
      </td>
      <td class="px-4 sm:px-6 py-4 text-right hidden md:table-cell">
        <div class="text-white-text font-medium">${this.formatCurrency(
          coin.market_cap
        )}</div>
        <div class="text-xs text-gray-400">Rank #${
          coin.market_cap_rank || "N/A"
        }</div>
      </td>
      <td class="px-4 sm:px-6 py-4 text-right hidden lg:table-cell">
        <div class="text-white-text font-medium">${this.formatCurrency(
          coin.total_volume
        )}</div>
      </td>
      <td class="px-4 sm:px-6 py-4 text-center">
        <div class="flex items-center justify-center space-x-2">
          <button
            onclick="cryptoTracker.addToWatchlist('${coin.id}', '${
      coin.name
    }', '${coin.symbol}')"
            class="text-blue-400 hover:text-blue-300 transition-colors p-2 rounded-lg hover:bg-blue-400/20"
            title="Add to watchlist"
          >
            <i class="fas fa-eye"></i>
          </button>
          <button
            onclick="cryptoTracker.addToPortfolio('${coin.id}', '${
      coin.name
    }', '${coin.symbol}')"
            class="text-green-400 hover:text-green-300 transition-colors p-2 rounded-lg hover:bg-green-400/20"
            title="Add to portfolio"
          >
            <i class="fas fa-plus"></i>
          </button>
          <button
            onclick="cryptoTracker.setPriceAlert('${coin.id}', '${
      coin.name
    }', '${coin.symbol}')"
            class="text-yellow-400 hover:text-yellow-300 transition-colors p-2 rounded-lg hover:bg-yellow-400/20"
            title="Set price alert"
          >
            <i class="fas fa-bell"></i>
          </button>
        </div>
      </td>
    `;

    return row;
  }

  updatePagination(totalItems) {
    const totalPages = Math.ceil(totalItems / this.itemsPerPage);

    if (this.pageInfo) {
      this.pageInfo.textContent = `Page ${this.currentPage} of ${totalPages}`;
    }

    if (this.prevPage) {
      this.prevPage.disabled = this.currentPage === 1;
      this.prevPage.classList.toggle("opacity-50", this.currentPage === 1);
      this.prevPage.classList.toggle(
        "cursor-not-allowed",
        this.currentPage === 1
      );
    }

    if (this.nextPage) {
      this.nextPage.disabled = this.currentPage === totalPages;
      this.nextPage.classList.toggle(
        "opacity-50",
        this.currentPage === totalPages
      );
      this.nextPage.classList.toggle(
        "cursor-not-allowed",
        this.currentPage === totalPages
      );
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.renderTable();
      this.scrollToTop();
    }
  }

  nextPage() {
    const totalPages = Math.ceil(
      this.getFilteredData().length / this.itemsPerPage
    );
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.renderTable();
      this.scrollToTop();
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  formatCurrency(value) {
    if (value === null || value === undefined) return "--";

    if (value >= 1e12) {
      return `$${(value / 1e12).toFixed(2)}T`;
    } else if (value >= 1e9) {
      return `$${(value / 1e9).toFixed(2)}B`;
    } else if (value >= 1e6) {
      return `$${(value / 1e6).toFixed(2)}M`;
    } else if (value >= 1e3) {
      return `$${(value / 1e3).toFixed(2)}K`;
    } else {
      return `$${value.toFixed(2)}`;
    }
  }

  // Action methods for the dashboard buttons
  addToWatchlist(coinId, coinName, coinSymbol) {
    // Store the coin info in localStorage for the watchlist page
    const watchlistData = JSON.parse(
      localStorage.getItem("cryptoWatchlist") || "[]"
    );
    const existingCoin = watchlistData.find((coin) => coin.id === coinId);

    if (!existingCoin) {
      watchlistData.push({
        id: coinId,
        name: coinName,
        symbol: coinSymbol,
        addedAt: new Date().toISOString(),
      });
      localStorage.setItem("cryptoWatchlist", JSON.stringify(watchlistData));

      this.showNotification(`Added ${coinName} to watchlist!`, "success");
    } else {
      this.showNotification(
        `${coinName} is already in your watchlist!`,
        "info"
      );
    }
  }

  addToPortfolio(coinId, coinName, coinSymbol) {
    // Store the coin info in localStorage for the portfolio page
    const portfolioData = JSON.parse(
      localStorage.getItem("cryptoPortfolio") || "[]"
    );
    const existingAsset = portfolioData.find((asset) => asset.id === coinId);

    if (!existingAsset) {
      // Redirect to portfolio page with pre-filled data
      localStorage.setItem(
        "addAssetPrefill",
        JSON.stringify({
          id: coinId,
          name: coinName,
          symbol: coinSymbol,
        })
      );

      this.showNotification(
        `Redirecting to portfolio to add ${coinName}...`,
        "info"
      );

      // Small delay to show notification before redirect
      setTimeout(() => {
        window.location.href = "portfolio.html";
      }, 1500);
    } else {
      this.showNotification(
        `${coinName} is already in your portfolio!`,
        "info"
      );
    }
  }

  setPriceAlert(coinId, coinName, coinSymbol) {
    // Store the coin info in localStorage for the alerts page
    const alertsData = JSON.parse(localStorage.getItem("cryptoAlerts") || "[]");
    const existingAlert = alertsData.find((alert) => alert.id === coinId);

    if (!existingAlert) {
      // Redirect to alerts page with pre-filled data
      localStorage.setItem(
        "addAlertPrefill",
        JSON.stringify({
          id: coinId,
          name: coinName,
          symbol: coinSymbol,
        })
      );

      this.showNotification(
        `Redirecting to alerts to set price alert for ${coinName}...`,
        "info"
      );

      // Small delay to show notification before redirect
      setTimeout(() => {
        window.location.href = "alerts.html";
      }, 1500);
    } else {
      this.showNotification(
        `Price alert for ${coinName} already exists!`,
        "info"
      );
    }
  }

  showNotification(message, type = "info") {
    // Create notification element
    const notification = document.createElement("div");
    notification.className = `notification fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg max-w-sm transform transition-all duration-300 translate-x-full`;

    const iconMap = {
      success: "fa-check-circle text-green-400",
      error: "fa-exclamation-circle text-red-400",
      warning: "fa-exclamation-triangle text-yellow-400",
      info: "fa-info-circle text-blue-400",
    };

    notification.innerHTML = `
      <div class="flex items-center space-x-3">
        <i class="fas ${iconMap[type]} text-xl"></i>
        <div>
          <p class="text-white-text font-medium">${message}</p>
        </div>
        <button onclick="this.parentElement.parentElement.remove()" class="text-gray-400 hover:text-white-text transition-colors">
          <i class="fas fa-times"></i>
        </button>
      </div>
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.classList.remove("translate-x-full");
    }, 100);

    // Auto remove after 5 seconds
    setTimeout(() => {
      notification.classList.add("translate-x-full");
      setTimeout(() => {
        if (notification.parentElement) {
          notification.remove();
        }
      }, 300);
    }, 5000);
  }

  startAutoRefresh() {
    // Auto-refresh based on config
    setInterval(() => {
      this.loadData();
      this.showNotification("Data refreshed automatically", "info");
    }, CONFIG.APP.AUTO_REFRESH_INTERVAL);
  }
}

// Initialize the application
let cryptoTracker;

document.addEventListener("DOMContentLoaded", () => {
  cryptoTracker = new CryptoPriceTracker();
});
