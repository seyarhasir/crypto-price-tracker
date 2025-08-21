// Crypto Converter System
class CryptoConverter {
  constructor() {
    this.exchangeRates = this.getExchangeRates();
    this.currencies = this.getCurrencies();

    this.initializeElements();
    this.bindEvents();
    this.updateLastUpdated();
    this.populatePopularConversions();
  }

  initializeElements() {
    // Converter elements
    this.fromCurrency = document.getElementById("fromCurrency");
    this.toCurrency = document.getElementById("toCurrency");
    this.fromAmount = document.getElementById("fromAmount");
    this.toAmount = document.getElementById("toAmount");
    this.fromCurrencySymbol = document.getElementById("fromCurrencySymbol");
    this.toCurrencySymbol = document.getElementById("toCurrencySymbol");

    // Display elements
    this.exchangeRate = document.getElementById("exchangeRate");
    this.lastUpdated = document.getElementById("lastUpdated");

    // Buttons
    this.swapBtn = document.getElementById("swapBtn");
    this.quickAmounts = document.querySelectorAll(".quick-amount");

    // Mobile menu
    this.mobileMenuBtn = document.getElementById("mobileMenuBtn");
    this.mobileMenu = document.getElementById("mobileMenu");
  }

  bindEvents() {
    // Currency selection changes
    this.fromCurrency.addEventListener("change", () =>
      this.handleCurrencyChange()
    );
    this.toCurrency.addEventListener("change", () =>
      this.handleCurrencyChange()
    );

    // Amount input changes
    this.fromAmount.addEventListener("input", () => this.convert());

    // Swap button
    this.swapBtn.addEventListener("click", () => this.swapCurrencies());

    // Quick amount buttons
    this.quickAmounts.forEach((btn) => {
      btn.addEventListener("click", (e) =>
        this.setQuickAmount(e.target.dataset.amount)
      );
    });

    // Mobile menu
    this.mobileMenuBtn.addEventListener("click", () => this.toggleMobileMenu());
  }

  getExchangeRates() {
    // Simulated exchange rates (in real app, these would come from API)
    return {
      // Fiat to USD rates
      eur: 1.08,
      gbp: 1.27,
      jpy: 0.0067,
      cad: 0.74,
      aud: 0.66,
      chf: 1.12,
      cny: 0.14,

      // Crypto to USD rates
      bitcoin: 43250.25,
      ethereum: 2650.75,
      dogecoin: 0.085,
      cardano: 0.52,
      solana: 98.45,
    };
  }

  getCurrencies() {
    return {
      usd: { name: "US Dollar", symbol: "$", type: "fiat" },
      eur: { name: "Euro", symbol: "€", type: "fiat" },
      gbp: { name: "British Pound", symbol: "£", type: "fiat" },
      jpy: { name: "Japanese Yen", symbol: "¥", type: "fiat" },
      cad: { name: "Canadian Dollar", symbol: "C$", type: "fiat" },
      aud: { name: "Australian Dollar", symbol: "A$", type: "fiat" },
      chf: { name: "Swiss Franc", symbol: "CHF", symbol: "CHF", type: "fiat" },
      cny: { name: "Chinese Yuan", symbol: "¥", type: "fiat" },
      bitcoin: { name: "Bitcoin", symbol: "BTC", type: "crypto" },
      ethereum: { name: "Ethereum", symbol: "ETH", type: "crypto" },
      dogecoin: { name: "Dogecoin", symbol: "DOGE", type: "crypto" },
      cardano: { name: "Cardano", symbol: "ADA", type: "crypto" },
      solana: { name: "Solana", symbol: "SOL", type: "crypto" },
    };
  }

  handleCurrencyChange() {
    this.updateCurrencySymbols();
    this.convert();
    this.updateExchangeRateDisplay();
  }

  updateCurrencySymbols() {
    const fromCurrency = this.fromCurrency.value;
    const toCurrency = this.toCurrency.value;

    this.fromCurrencySymbol.textContent =
      this.currencies[fromCurrency]?.symbol || fromCurrency.toUpperCase();
    this.toCurrencySymbol.textContent =
      this.currencies[toCurrency]?.symbol || toCurrency.toUpperCase();
  }

  convert() {
    const fromCurrency = this.fromCurrency.value;
    const toCurrency = this.toCurrency.value;
    const amount = parseFloat(this.fromAmount.value) || 0;

    if (amount <= 0) {
      this.toAmount.value = "";
      return;
    }

    const convertedAmount = this.calculateConversion(
      fromCurrency,
      toCurrency,
      amount
    );
    this.toAmount.value = convertedAmount.toFixed(6);
  }

  calculateConversion(fromCurrency, toCurrency, amount) {
    // Convert from currency to USD first
    let usdAmount = amount;

    if (fromCurrency !== "usd") {
      if (this.currencies[fromCurrency]?.type === "fiat") {
        // Convert fiat to USD
        usdAmount = amount / this.exchangeRates[fromCurrency];
      } else {
        // Convert crypto to USD
        usdAmount = amount * this.exchangeRates[fromCurrency];
      }
    }

    // Convert USD to target currency
    if (toCurrency === "usd") {
      return usdAmount;
    } else if (this.currencies[toCurrency]?.type === "fiat") {
      // Convert USD to fiat
      return usdAmount * this.exchangeRates[toCurrency];
    } else {
      // Convert USD to crypto
      return usdAmount / this.exchangeRates[toCurrency];
    }
  }

  updateExchangeRateDisplay() {
    const fromCurrency = this.fromCurrency.value;
    const toCurrency = this.toCurrency.value;

    if (fromCurrency === toCurrency) {
      this.exchangeRate.textContent = "1:1 (Same Currency)";
      return;
    }

    const rate = this.calculateConversion(fromCurrency, toCurrency, 1);
    const fromSymbol =
      this.currencies[fromCurrency]?.symbol || fromCurrency.toUpperCase();
    const toSymbol =
      this.currencies[toCurrency]?.symbol || toCurrency.toUpperCase();

    if (rate < 0.01) {
      this.exchangeRate.textContent = `1 ${fromSymbol} = ${rate.toFixed(
        8
      )} ${toSymbol}`;
    } else if (rate < 1) {
      this.exchangeRate.textContent = `1 ${fromSymbol} = ${rate.toFixed(
        4
      )} ${toSymbol}`;
    } else {
      this.exchangeRate.textContent = `1 ${fromSymbol} = ${rate.toFixed(
        2
      )} ${toSymbol}`;
    }
  }

  swapCurrencies() {
    const tempCurrency = this.fromCurrency.value;
    const tempAmount = this.fromAmount.value;

    this.fromCurrency.value = this.toCurrency.value;
    this.toCurrency.value = tempCurrency;

    this.fromAmount.value = this.toAmount.value;
    this.toAmount.value = tempAmount;

    this.handleCurrencyChange();
  }

  setQuickAmount(amount) {
    this.fromAmount.value = amount;
    this.convert();
  }

  updateLastUpdated() {
    const now = new Date();
    this.lastUpdated.textContent = now.toLocaleString();
  }

  populatePopularConversions() {
    const popularConversions = [
      { from: "usd", to: "bitcoin", amount: 1000 },
      { from: "usd", to: "ethereum", amount: 1000 },
      { from: "eur", to: "bitcoin", amount: 1000 },
      { from: "bitcoin", to: "usd", amount: 0.1 },
      { from: "ethereum", to: "usd", amount: 1 },
      { from: "usd", to: "dogecoin", amount: 100 },
    ];

    const container = document.getElementById("popularConversions");

    popularConversions.forEach((conversion) => {
      const card = this.createPopularConversionCard(conversion);
      container.appendChild(card);
    });
  }

  createPopularConversionCard(conversion) {
    const card = document.createElement("div");
    card.className =
      "bg-primary rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer";

    const fromCurrency = this.currencies[conversion.from];
    const toCurrency = this.currencies[conversion.to];
    const convertedAmount = this.calculateConversion(
      conversion.from,
      conversion.to,
      conversion.amount
    );

    card.innerHTML = `
      <div class="text-center">
        <div class="text-2xl font-bold mb-2">
          ${conversion.amount} ${
      fromCurrency?.symbol || conversion.from.toUpperCase()
    }
        </div>
        <div class="text-gray-400 mb-4">equals</div>
        <div class="text-xl font-semibold text-lighter">
          ${convertedAmount.toFixed(6)} ${
      toCurrency?.symbol || conversion.to.toUpperCase()
    }
        </div>
        <div class="text-sm text-gray-400 mt-2">
          ${fromCurrency?.name || conversion.from} → ${
      toCurrency?.name || conversion.to
    }
        </div>
      </div>
    `;

    // Add click event to set this conversion
    card.addEventListener("click", () => {
      this.fromCurrency.value = conversion.from;
      this.toCurrency.value = conversion.to;
      this.fromAmount.value = conversion.amount;
      this.handleCurrencyChange();

      // Scroll to converter
      document.querySelector(".bg-primary.shadow-lg.p-8").scrollIntoView({
        behavior: "smooth",
      });
    });

    return card;
  }

  toggleMobileMenu() {
    this.mobileMenu.classList.toggle("hidden");
  }
}

// Initialize the converter when DOM is loaded
let cryptoConverter;
document.addEventListener("DOMContentLoaded", () => {
  cryptoConverter = new CryptoConverter();
});
