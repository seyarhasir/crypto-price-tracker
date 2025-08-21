// CONFIG TEMPLATE - COPY THIS FILE TO config.js AND ADD YOUR API KEY
// This file is safe to commit to public repositories

const CONFIG = {
  // CoinGecko API Configuration
  COINGECKO: {
    // ⚠️ REPLACE THESE WITH YOUR ACTUAL API KEY AND BASE URL
    API_KEY: "YOUR_COINGECKO_API_KEY_HERE",
    BASE_URL: "https://api.coingecko.com/api/v3",
    ENDPOINTS: {
      MARKETS: "/coins/markets",
      SIMPLE_PRICE: "/simple/price",
    },
  },

  // App Configuration
  APP: {
    AUTO_REFRESH_INTERVAL: 300000, // 5 minutes in milliseconds
    ITEMS_PER_PAGE: 20,
    MAX_RETRIES: 3,
  },
};

// Export for use in other files
if (typeof module !== "undefined" && module.exports) {
  module.exports = CONFIG;
} else {
  window.CONFIG = CONFIG;
}
