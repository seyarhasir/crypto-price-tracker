const fs = require("fs");
const path = require("path");

// Copy the template file to create config.js
const templatePath = path.join(__dirname, "public", "config.template.js");
const configPath = path.join(__dirname, "public", "config.js");

// Read the template file
let configContent = fs.readFileSync(templatePath, "utf8");

// Replace placeholders with actual environment variables
configContent = configContent.replace(
  "YOUR_COINGECKO_API_KEY_HERE",
  process.env.COINGECKO_API_KEY || "CG-k76jT5K4RWaSgENT9CJThfqu"
);

configContent = configContent.replace(
  "https://api.coingecko.com/api/v3",
  process.env.COINGECKO_BASE_URL || "https://api.coingecko.com/api/v3"
);

// Write the updated config file
fs.writeFileSync(configPath, configContent);

console.log("✅ Config file created from template with environment variables");
console.log(
  "🔑 API Key:",
  process.env.COINGECKO_API_KEY ? "***SET***" : "***NOT SET***"
);
console.log(
  "🌐 Base URL:",
  process.env.COINGECKO_BASE_URL || "https://api.coingecko.com/api/v3"
);
