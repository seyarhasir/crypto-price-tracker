const fs = require("fs");
const path = require("path");

// Read the config file
const configPath = path.join(__dirname, "public", "config.js");
let configContent = fs.readFileSync(configPath, "utf8");

// Replace placeholders with actual environment variables
configContent = configContent.replace(
  "NETLIFY_COINGECKO_API_KEY",
  process.env.COINGECKO_API_KEY || "CG-k76jT5K4RWaSgENT9CJThfqu"
);

configContent = configContent.replace(
  "NETLIFY_COINGECKO_BASE_URL",
  process.env.COINGECKO_BASE_URL || "https://api.coingecko.com/api/v3"
);

// Write the updated config file
fs.writeFileSync(configPath, configContent);

console.log("✅ Config file updated with environment variables");
console.log(
  "🔑 API Key:",
  process.env.COINGECKO_API_KEY ? "***SET***" : "***NOT SET***"
);
console.log(
  "🌐 Base URL:",
  process.env.COINGECKO_BASE_URL || "https://api.coingecko.com/api/v3"
);
