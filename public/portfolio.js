// Portfolio Management System
class PortfolioManager {
  constructor() {
    this.portfolio = [];
    this.currentPrices = {};
    this.isMobileMenuOpen = false;

    this.initializeElements();
    this.bindEvents();
    this.initializePortfolio();
  }

  async initializePortfolio() {
    await this.loadPortfolio();
    await this.loadCurrentPrices();
    this.updatePortfolioDisplay();
    this.checkForPrefillData();
  }

  async refreshPrices() {
    try {
      this.showNotification("Refreshing prices...", "info");
      await this.loadCurrentPrices();
      this.updatePortfolioDisplay();
      this.showNotification("Prices updated successfully!", "success");
    } catch (error) {
      console.error("Error refreshing prices:", error);
      this.showNotification("Failed to refresh prices", "error");
    }
  }

  initializeElements() {
    // Core elements
    this.addAssetBtn = document.getElementById("addAssetBtn");
    this.refreshPricesBtn = document.getElementById("refreshPricesBtn");
    this.addAssetModal = document.getElementById("addAssetModal");
    this.closeModal = document.getElementById("closeModal");
    this.cancelBtn = document.getElementById("cancelBtn");
    this.addAssetForm = document.getElementById("addAssetForm");

    // Form elements
    this.cryptoSelect = document.getElementById("cryptoSelect");
    this.quantity = document.getElementById("quantity");
    this.buyPrice = document.getElementById("buyPrice");
    this.buyDate = document.getElementById("buyDate");

    // Display elements
    this.emptyState = document.getElementById("emptyState");
    this.assetsTable = document.getElementById("assetsTable");
    this.portfolioTableBody = document.getElementById("portfolioTableBody");
    this.emptyStateAddBtn = document.getElementById("emptyStateAddBtn");

    // Summary elements
    this.totalValue = document.getElementById("totalValue");
    this.totalPnL = document.getElementById("totalPnL");
    this.assetCount = document.getElementById("assetCount");
    this.totalPnLPercent = document.getElementById("totalPnLPercent");

    // Mobile menu elements
    this.mobileMenuBtn = document.getElementById("mobileMenuBtn");
    this.mobileMenu = document.getElementById("mobileMenu");

    // Set default date to today
    if (this.buyDate) {
      this.buyDate.value = new Date().toISOString().split("T")[0];
    }
  }

  bindEvents() {
    // Modal controls
    this.addAssetBtn?.addEventListener("click", () => this.showModal());
    this.refreshPricesBtn?.addEventListener("click", () => this.refreshPrices());
    this.closeModal?.addEventListener("click", () => this.hideModal());
    this.cancelBtn?.addEventListener("click", () => this.hideModal());
    this.emptyStateAddBtn?.addEventListener("click", () => this.showModal());

    // Form submission
    this.addAssetForm?.addEventListener("submit", (e) =>
      this.handleAddAsset(e)
    );

    // Close modal when clicking outside
    this.addAssetModal?.addEventListener("click", (e) => {
      if (e.target === this.addAssetModal) {
        this.hideModal();
      }
    });

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

    // Handle escape key for mobile menu and modal
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeMobileMenu();
        this.hideModal();
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

  async checkForPrefillData() {
    const prefillData = localStorage.getItem("addAssetPrefill");
    if (prefillData) {
      try {
        const data = JSON.parse(prefillData);
        if (data.id && data.name && data.symbol) {
          // Pre-fill the form
          this.cryptoSelect.value = data.id;
          this.showModal();

          // Show a notification
          this.showNotification(
            `Pre-filling form for ${data.name} (${data.symbol.toUpperCase()})`,
            "info"
          );

          // Clear the prefill data
          localStorage.removeItem("addAssetPrefill");
        }
      } catch (error) {
        console.error("Error parsing prefill data:", error);
        localStorage.removeItem("addAssetPrefill");
      }
    }
  }

  showModal() {
    this.addAssetModal.classList.remove("hidden");
    // Focus on first input for better UX
    setTimeout(() => {
      this.cryptoSelect.focus();
    }, 100);
  }

  hideModal() {
    this.addAssetModal.classList.add("hidden");
    this.addAssetForm.reset();
    if (this.buyDate) {
      this.buyDate.value = new Date().toISOString().split("T")[0];
    }
  }

  async handleAddAsset(e) {
    e.preventDefault();

    const cryptoId = this.cryptoSelect.value;
    const quantity = parseFloat(this.quantity.value);
    const buyPrice = parseFloat(this.buyPrice.value);
    const buyDate = this.buyDate.value;

    if (!cryptoId || !quantity || !buyPrice || !buyDate) {
      this.showNotification("Please fill in all fields", "error");
      return;
    }

    if (quantity <= 0 || buyPrice <= 0) {
      this.showNotification(
        "Quantity and price must be greater than 0",
        "error"
      );
      return;
    }

    // Get crypto info
    const cryptoInfo = this.getCryptoInfo(cryptoId);
    if (!cryptoInfo) {
      this.showNotification("Invalid cryptocurrency selected", "error");
      return;
    }

    // Check if asset already exists
    const existingAssetIndex = this.portfolio.findIndex(
      (asset) => asset.id === cryptoId
    );

    if (existingAssetIndex !== -1) {
      // Update existing asset (average down/up)
      const existingAsset = this.portfolio[existingAssetIndex];
      const totalQuantity = existingAsset.quantity + quantity;
      const totalCost =
        existingAsset.quantity * existingAsset.buyPrice + quantity * buyPrice;
      const averagePrice = totalCost / totalQuantity;

      this.portfolio[existingAssetIndex] = {
        ...existingAsset,
        quantity: totalQuantity,
        buyPrice: averagePrice,
        lastUpdated: new Date().toISOString(),
      };

      this.showNotification(`Updated ${cryptoInfo.name} position`, "success");
    } else {
      // Add new asset
      const newAsset = {
        id: cryptoId,
        name: cryptoInfo.name,
        symbol: cryptoInfo.symbol,
        quantity: quantity,
        buyPrice: buyPrice,
        buyDate: buyDate,
        addedAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
      };

      this.portfolio.push(newAsset);
      this.showNotification(`Added ${cryptoInfo.name} to portfolio`, "success");
    }

    this.savePortfolio();
    // Refresh current prices and update display
    await this.loadCurrentPrices();
    this.updatePortfolioDisplay();
    this.hideModal();
  }

  getCryptoInfo(cryptoId) {
    const cryptoMap = {
      bitcoin: { name: "Bitcoin", symbol: "BTC" },
      ethereum: { name: "Ethereum", symbol: "ETH" },
      binancecoin: { name: "Binance Coin", symbol: "BNB" },
      cardano: { name: "Cardano", symbol: "ADA" },
      solana: { name: "Solana", symbol: "SOL" },
      ripple: { name: "Ripple", symbol: "XRP" },
      polkadot: { name: "Polkadot", symbol: "DOT" },
      dogecoin: { name: "Dogecoin", symbol: "DOGE" },
      "avalanche-2": { name: "Avalanche", symbol: "AVAX" },
      chainlink: { name: "Chainlink", symbol: "LINK" },
    };

    return cryptoMap[cryptoId];
  }

  async loadPortfolio() {
    const saved = localStorage.getItem("cryptoPortfolio");
    if (saved) {
      try {
        this.portfolio = JSON.parse(saved);
      } catch (error) {
        console.error("Error loading portfolio:", error);
        this.portfolio = [];
      }
    }
  }

  savePortfolio() {
    localStorage.setItem("cryptoPortfolio", JSON.stringify(this.portfolio));
  }

  async loadCurrentPrices() {
    try {
      // Fetch live prices from CoinGecko API
      const response = await fetch(
        `${CONFIG.COINGECKO.BASE_URL}${CONFIG.COINGECKO.ENDPOINTS.SIMPLE_PRICE}?ids=bitcoin,ethereum,binancecoin,cardano,solana,ripple,polkadot,dogecoin,avalanche-2,chainlink,polygon,tron,uniswap,bitcoin-cash,litecoin,stellar,cosmos,monero,ethereum-classic,filecoin&vs_currencies=usd&x_cg_demo_api_key=${CONFIG.COINGECKO.API_KEY}`
      );

      if (response.ok) {
        const data = await response.json();
        // Convert the response to our expected format
        this.currentPrices = {};
        Object.keys(data).forEach(coinId => {
          this.currentPrices[coinId] = data[coinId].usd;
        });
      } else {
        // Fallback to demo prices if API fails
        this.currentPrices = {
          bitcoin: 43250.25,
          ethereum: 2650.75,
          binancecoin: 312.45,
          cardano: 0.485,
          solana: 98.75,
          ripple: 0.523,
          polkadot: 6.89,
          dogecoin: 0.085,
          "avalanche-2": 23.45,
          chainlink: 14.67,
        };
      }
    } catch (error) {
      console.error("Error loading current prices:", error);
      // Fallback to demo prices
      this.currentPrices = {
        bitcoin: 43250.25,
        ethereum: 2650.75,
        binancecoin: 312.45,
        cardano: 0.485,
        solana: 98.75,
        ripple: 0.523,
        polkadot: 6.89,
        dogecoin: 0.085,
        "avalanche-2": 23.45,
        chainlink: 14.67,
      };
    }
  }

  updatePortfolioDisplay() {
    if (this.portfolio.length === 0) {
      this.showEmptyState();
      return;
    }

    this.hideEmptyState();
    this.updateSummary();
    this.renderPortfolioTable();
  }

  showEmptyState() {
    if (this.emptyState) this.emptyState.classList.remove("hidden");
    if (this.assetsTable) this.assetsTable.classList.add("hidden");
  }

  hideEmptyState() {
    if (this.emptyState) this.emptyState.classList.add("hidden");
    if (this.assetsTable) this.assetsTable.classList.remove("hidden");
  }

  updateSummary() {
    let totalValue = 0;
    let totalCost = 0;

    this.portfolio.forEach((asset) => {
      const currentPrice = this.currentPrices[asset.id] || 0;
      const assetValue = asset.quantity * currentPrice;
      const assetCost = asset.quantity * asset.buyPrice;

      totalValue += assetValue;
      totalCost += assetCost;
    });

    const totalPnL = totalValue - totalCost;
    const totalPnLPercent = totalCost > 0 ? (totalPnL / totalCost) * 100 : 0;

    if (this.totalValue)
      this.totalValue.textContent = this.formatCurrency(totalValue);
    if (this.totalPnL) {
      this.totalPnL.textContent = this.formatCurrency(totalPnL);
      this.totalPnL.className = `text-2xl lg:text-3xl font-bold ${
        totalPnL >= 0 ? "text-green-400" : "text-red-400"
      }`;
    }
    if (this.assetCount) this.assetCount.textContent = this.portfolio.length;
    if (this.totalPnLPercent) {
      this.totalPnLPercent.textContent = `${totalPnLPercent.toFixed(2)}%`;
      this.totalPnLPercent.className = `text-2xl lg:text-3xl font-bold ${
        totalPnLPercent >= 0 ? "text-green-400" : "text-red-400"
      }`;
    }
  }

  renderPortfolioTable() {
    if (!this.portfolioTableBody) return;

    this.portfolioTableBody.innerHTML = "";

    this.portfolio.forEach((asset) => {
      const row = this.createPortfolioRow(asset);
      this.portfolioTableBody.appendChild(row);
    });
  }

  createPortfolioRow(asset) {
    const currentPrice = this.currentPrices[asset.id] || 0;
    const totalValue = asset.quantity * currentPrice;
    const totalCost = asset.quantity * asset.buyPrice;
    const pnl = totalValue - totalCost;
    const pnlPercent = totalCost > 0 ? (pnl / totalCost) * 100 : 0;

    const row = document.createElement("tr");
    row.className = "hover:bg-gray-700 transition-all duration-300";

    row.innerHTML = `
      <td class="px-4 sm:px-6 py-4">
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 bg-darker rounded-full flex items-center justify-center">
            <i class="fas fa-coins text-yellow-400"></i>
          </div>
          <div>
            <div class="font-medium text-white-text">${asset.name}</div>
            <div class="text-sm text-gray-400 uppercase">${asset.symbol}</div>
          </div>
        </div>
      </td>
      <td class="px-4 sm:px-6 py-4 text-right">
        <div class="text-white-text font-medium">${asset.quantity.toFixed(
          6
        )}</div>
        <div class="text-xs text-gray-400">${asset.symbol}</div>
      </td>
      <td class="px-4 sm:px-6 py-4 text-right">
        <div class="text-white-text font-medium">${this.formatCurrency(
          asset.buyPrice
        )}</div>
        <div class="text-xs text-gray-400">${asset.buyDate}</div>
      </td>
      <td class="px-4 sm:px-6 py-4 text-right hidden md:table-cell">
        <div class="text-white-text font-medium">${this.formatCurrency(
          currentPrice
        )}</div>
        <div class="text-xs text-gray-400">Current</div>
      </td>
      <td class="px-4 sm:px-6 py-4 text-right">
        <div class="text-white-text font-medium">${this.formatCurrency(
          totalValue
        )}</div>
        <div class="text-xs text-gray-400">Total</div>
      </td>
      <td class="px-4 sm:px-6 py-4 text-right">
        <div class="font-medium ${
          pnl >= 0 ? "text-green-400" : "text-red-400"
        }">${this.formatCurrency(pnl)}</div>
        <div class="text-xs ${
          pnlPercent >= 0 ? "text-green-400" : "text-red-400"
        }">${pnlPercent.toFixed(2)}%</div>
      </td>
      <td class="px-4 sm:px-6 py-4 text-center">
        <div class="flex items-center justify-center space-x-2">
          <button
            onclick="portfolioManager.editAsset('${asset.id}')"
            class="text-blue-400 hover:text-blue-300 transition-colors p-2 rounded-lg hover:bg-blue-400/20"
            title="Edit asset"
          >
            <i class="fas fa-edit"></i>
          </button>
          <button
            onclick="portfolioManager.removeAsset('${asset.id}')"
            class="text-red-400 hover:text-red-300 transition-colors p-2 rounded-lg hover:bg-red-400/20"
            title="Remove asset"
          >
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </td>
    `;

    return row;
  }

  editAsset(assetId) {
    // TODO: Implement edit functionality
    this.showNotification("Edit functionality coming soon!", "info");
  }

  removeAsset(assetId) {
    if (
      confirm("Are you sure you want to remove this asset from your portfolio?")
    ) {
      this.portfolio = this.portfolio.filter((asset) => asset.id !== assetId);
      this.savePortfolio();
      // Refresh current prices and update display
      await this.loadCurrentPrices();
      this.updatePortfolioDisplay();
      this.showNotification("Asset removed from portfolio", "success");
    }
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
}

// Initialize the portfolio manager
let portfolioManager;

document.addEventListener("DOMContentLoaded", () => {
  portfolioManager = new PortfolioManager();
});
