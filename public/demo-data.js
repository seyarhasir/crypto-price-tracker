const cryptoData = [
  {
    id: "bitcoin",
    symbol: "btc",
    name: "Bitcoin",
    image:
      "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
    current_price: 43250.25,
    market_cap: 847123456789,
    market_cap_rank: 1,
    total_volume: 23456789012,
    price_change_percentage_24h: 2.98,
    circulating_supply: 19500000,
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
    total_volume: 15678901234,
    price_change_percentage_24h: 1.95,
    circulating_supply: 120000000,
  },
  {
    id: "binancecoin",
    symbol: "bnb",
    name: "BNB",
    image:
      "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1696501826",
    current_price: 312.45,
    market_cap: 48123456789,
    market_cap_rank: 3,
    total_volume: 2345678901,
    price_change_percentage_24h: -0.85,
    circulating_supply: 154000000,
  },
  {
    id: "solana",
    symbol: "sol",
    name: "Solana",
    image:
      "https://assets.coingecko.com/coins/images/4128/large/solana.png?1696501826",
    current_price: 98.75,
    market_cap: 42345678901,
    market_cap_rank: 4,
    total_volume: 3456789012,
    price_change_percentage_24h: 5.23,
    circulating_supply: 428000000,
  },
  {
    id: "cardano",
    symbol: "ada",
    name: "Cardano",
    image:
      "https://assets.coingecko.com/coins/images/975/large/Cardano_Logo.png?1696501826",
    current_price: 0.485,
    market_cap: 17123456789,
    market_cap_rank: 5,
    total_volume: 1234567890,
    price_change_percentage_24h: 3.12,
    circulating_supply: 35300000000,
  },
  {
    id: "ripple",
    symbol: "xrp",
    name: "XRP",
    image:
      "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1696501826",
    current_price: 0.523,
    market_cap: 28123456789,
    market_cap_rank: 6,
    total_volume: 2345678901,
    price_change_percentage_24h: -1.45,
    circulating_supply: 53800000000,
  },
  {
    id: "polkadot",
    symbol: "dot",
    name: "Polkadot",
    image:
      "https://assets.coingecko.com/coins/images/12171/large/polkadot_new_logo.png?1696501826",
    current_price: 6.89,
    market_cap: 8912345678,
    market_cap_rank: 7,
    total_volume: 456789012,
    price_change_percentage_24h: 2.78,
    circulating_supply: 1290000000,
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
    total_volume: 567890123,
    price_change_percentage_24h: 2.41,
    circulating_supply: 145000000000,
  },
  {
    id: "avalanche-2",
    symbol: "avax",
    name: "Avalanche",
    image:
      "https://assets.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png?1696501826",
    current_price: 23.45,
    market_cap: 8234567890,
    market_cap_rank: 9,
    total_volume: 345678901,
    price_change_percentage_24h: 4.67,
    circulating_supply: 351000000,
  },
  {
    id: "chainlink",
    symbol: "link",
    name: "Chainlink",
    image:
      "https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png?1696501826",
    current_price: 14.67,
    market_cap: 8234567890,
    market_cap_rank: 10,
    total_volume: 456789012,
    price_change_percentage_24h: -0.92,
    circulating_supply: 561000000,
  },
  {
    id: "polygon",
    symbol: "matic",
    name: "Polygon",
    image:
      "https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png?1696501826",
    current_price: 0.89,
    market_cap: 8234567890,
    market_cap_rank: 11,
    total_volume: 567890123,
    price_change_percentage_24h: 1.34,
    circulating_supply: 9240000000,
  },
  {
    id: "tron",
    symbol: "trx",
    name: "TRON",
    image:
      "https://assets.coingecko.com/coins/images/1094/large/tron-logo.png?1696501826",
    current_price: 0.098,
    market_cap: 8912345678,
    market_cap_rank: 12,
    total_volume: 678901234,
    price_change_percentage_24h: 0.67,
    circulating_supply: 90800000000,
  },
  {
    id: "uniswap",
    symbol: "uni",
    name: "Uniswap",
    image:
      "https://assets.coingecko.com/coins/images/12504/large/uniswap-uni.png?1696501826",
    current_price: 7.23,
    market_cap: 4345678901,
    market_cap_rank: 13,
    total_volume: 234567890,
    price_change_percentage_24h: 2.15,
    circulating_supply: 600000000,
  },
  {
    id: "bitcoin-cash",
    symbol: "bch",
    name: "Bitcoin Cash",
    image:
      "https://assets.coingecko.com/coins/images/780/large/bitcoin-cash-circle.png?1696501826",
    current_price: 234.56,
    market_cap: 4567890123,
    market_cap_rank: 14,
    total_volume: 345678901,
    price_change_percentage_24h: 1.89,
    circulating_supply: 19400000,
  },
  {
    id: "litecoin",
    symbol: "ltc",
    name: "Litecoin",
    image:
      "https://assets.coingecko.com/coins/images/2/large/litecoin.png?1696501826",
    current_price: 67.89,
    market_cap: 5012345678,
    market_cap_rank: 15,
    total_volume: 456789012,
    price_change_percentage_24h: -0.45,
    circulating_supply: 73800000,
  },
  {
    id: "stellar",
    symbol: "xlm",
    name: "Stellar",
    image:
      "https://assets.coingecko.com/coins/images/100/large/Stellar_symbol_black_RGB.png?1696501826",
    current_price: 0.123,
    market_cap: 3456789012,
    market_cap_rank: 16,
    total_volume: 234567890,
    price_change_percentage_24h: 3.21,
    circulating_supply: 28100000000,
  },
  {
    id: "cosmos",
    symbol: "atom",
    name: "Cosmos",
    image:
      "https://assets.coingecko.com/coins/images/1481/large/cosmos_hub.png?1696501826",
    current_price: 8.45,
    market_cap: 3234567890,
    market_cap_rank: 17,
    total_volume: 234567890,
    price_change_percentage_24h: 4.56,
    circulating_supply: 383000000,
  },
  {
    id: "monero",
    symbol: "xmr",
    name: "Monero",
    image:
      "https://assets.coingecko.com/coins/images/69/large/monero_logo.png?1696501826",
    current_price: 156.78,
    market_cap: 2845678901,
    market_cap_rank: 18,
    total_volume: 123456789,
    price_change_percentage_24h: 1.23,
    circulating_supply: 18100000,
  },
  {
    id: "ethereum-classic",
    symbol: "etc",
    name: "Ethereum Classic",
    image:
      "https://assets.coingecko.com/coins/images/453/large/ethereum-classic-logo.png?1696501826",
    current_price: 23.45,
    market_cap: 3345678901,
    market_cap_rank: 19,
    total_volume: 234567890,
    price_change_percentage_24h: -2.34,
    circulating_supply: 142000000,
  },
  {
    id: "filecoin",
    symbol: "fil",
    name: "Filecoin",
    image:
      "https://assets.coingecko.com/coins/images/12817/large/filecoin.png?1696501826",
    current_price: 5.67,
    market_cap: 2345678901,
    market_cap_rank: 20,
    total_volume: 123456789,
    price_change_percentage_24h: 6.78,
    circulating_supply: 413000000,
  },
];

// Export for use in other files
if (typeof module !== "undefined" && module.exports) {
  module.exports = cryptoData;
} else {
  window.cryptoData = cryptoData;
}

// Function to get demo data (useful for testing)
function getDemoData() {
  return [...cryptoData];
}

// Function to simulate API delay
function getDemoDataWithDelay(delay = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...cryptoData]);
    }, delay);
  });
}
