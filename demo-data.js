// Demo cryptocurrency data for testing when API is unavailable
// This file contains sample data that mimics the CoinGecko API response

const demoCryptoData = [
  {
    id: "bitcoin",
    symbol: "btc",
    name: "Bitcoin",
    image:
      "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
    current_price: 43250.25,
    market_cap: 847123456789,
    market_cap_rank: 1,
    fully_diluted_valuation: 908765432109,
    total_volume: 23456789012,
    high_24h: 44500.5,
    low_24h: 42000.0,
    price_change_24h: 1250.25,
    price_change_percentage_24h: 2.98,
    market_cap_change_24h: 24567890123,
    market_cap_change_percentage_24h: 2.98,
    circulating_supply: 19500000,
    total_supply: 21000000,
    max_supply: 21000000,
    ath: 69045,
    ath_change_percentage: -37.35,
    ath_date: "2021-11-10T14:24:11.849Z",
    atl: 67.81,
    atl_change_percentage: 63675.12,
    atl_date: "2013-07-06T00:00:00.000Z",
    roi: null,
    last_updated: "2024-01-15T12:00:00.000Z",
  },
  {
    id: "ethereum",
    symbol: "eth",
    name: "Ethereum",
    image:
      "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1696501628",
    current_price: 2650.75,
    market_cap: 318765432109,
    market_cap_rank: 2,
    fully_diluted_valuation: 318765432109,
    total_volume: 15678901234,
    high_24h: 2700.0,
    low_24h: 2600.0,
    price_change_24h: 50.75,
    price_change_percentage_24h: 1.95,
    market_cap_change_24h: 6123456789,
    market_cap_change_percentage_24h: 1.95,
    circulating_supply: 120000000,
    total_supply: 120000000,
    max_supply: null,
    ath: 4878.26,
    ath_change_percentage: -45.68,
    ath_date: "2021-11-10T14:24:11.849Z",
    atl: 0.432979,
    atl_change_percentage: 612345.67,
    atl_date: "2015-10-20T00:00:00.000Z",
    roi: {
      times: 85.2,
      currency: "btc",
      percentage: 8520.0,
    },
    last_updated: "2024-01-15T12:00:00.000Z",
  },
  {
    id: "dogecoin",
    symbol: "doge",
    name: "Dogecoin",
    image:
      "https://assets.coingecko.com/coins/images/5/large/dogecoin.png?1696501409",
    current_price: 0.085,
    market_cap: 12345678901,
    market_cap_rank: 8,
    fully_diluted_valuation: 12345678901,
    total_volume: 567890123,
    high_24h: 0.087,
    low_24h: 0.083,
    price_change_24h: 0.002,
    price_change_percentage_24h: 2.41,
    market_cap_change_24h: 290123456,
    market_cap_change_percentage_24h: 2.41,
    circulating_supply: 145000000000,
    total_supply: 145000000000,
    max_supply: null,
    ath: 0.731578,
    ath_change_percentage: -88.38,
    ath_date: "2021-05-08T05:08:23.458Z",
    atl: 0.0000869,
    atl_change_percentage: 97845.67,
    atl_date: "2015-05-06T00:00:00.000Z",
    roi: null,
    last_updated: "2024-01-15T12:00:00.000Z",
  },
  {
    id: "monero",
    symbol: "xmr",
    name: "Monero",
    image:
      "https://assets.coingecko.com/coins/images/69/large/monero_logo.png?1696501460",
    current_price: 165.5,
    market_cap: 3012345678,
    market_cap_rank: 25,
    fully_diluted_valuation: 3012345678,
    total_volume: 23456789,
    high_24h: 168.0,
    low_24h: 163.0,
    price_change_24h: 2.5,
    price_change_percentage_24h: 1.53,
    market_cap_change_24h: 45678901,
    market_cap_change_percentage_24h: 1.53,
    circulating_supply: 18200000,
    total_supply: 18200000,
    max_supply: null,
    ath: 542.33,
    ath_change_percentage: -69.48,
    ath_date: "2018-01-09T00:00:00.000Z",
    atl: 0.213,
    atl_change_percentage: 77689.67,
    atl_date: "2015-01-14T00:00:00.000Z",
    roi: null,
    last_updated: "2024-01-15T12:00:00.000Z",
  },
  {
    id: "cardano",
    symbol: "ada",
    name: "Cardano",
    image:
      "https://assets.coingecko.com/coins/images/975/large/Cardano_Logo.png?1696502090",
    current_price: 0.485,
    market_cap: 17012345678,
    market_cap_rank: 9,
    fully_diluted_valuation: 21876543210,
    total_volume: 345678901,
    high_24h: 0.49,
    low_24h: 0.48,
    price_change_24h: 0.005,
    price_change_percentage_24h: 1.04,
    market_cap_change_24h: 175123456,
    market_cap_change_percentage_24h: 1.04,
    circulating_supply: 35000000000,
    total_supply: 45000000000,
    max_supply: 45000000000,
    ath: 3.09,
    ath_change_percentage: -84.3,
    ath_date: "2021-09-02T06:00:10.474Z",
    atl: 0.01735475,
    atl_change_percentage: 2694.67,
    atl_date: "2020-03-13T02:22:55.044Z",
    roi: null,
    last_updated: "2024-01-15T12:00:00.000Z",
  },
];

// Export for use in other files
if (typeof module !== "undefined" && module.exports) {
  module.exports = demoCryptoData;
} else {
  window.demoCryptoData = demoCryptoData;
}

// Function to get demo data (useful for testing)
function getDemoData() {
  return [...demoCryptoData];
}

// Function to simulate API delay
function getDemoDataWithDelay(delay = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...demoCryptoData]);
    }, delay);
  });
}
