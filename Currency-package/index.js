const axios = require("axios");

const API_URL = "https://open.er-api.com/v6/latest";

// Fetch live exchange rates from the API
async function fetchRates(baseCurrency) {
  try {
    const response = await axios.get(`${API_URL}/${baseCurrency}`);
    return response.data.rates;
  } catch (error) {
    throw new Error("Failed to fetch exchange rates.");
  }
}

/**
 * Convert an amount from one currency to another
 * @param {number} amount - The amount to convert
 * @param {string} from - The source currency
 * @param {string} to - The target currency
 */
async function convertCurrency(amount, from, to) {
  if (from === to) return amount;

  const rates = await fetchRates(from);
  if (!rates[to]) {
    throw new Error(`Unsupported target currency: ${to}`);
  }

  const convertedAmount = amount * rates[to];
  return convertedAmount.toFixed(2); // Limit to 2 decimal places
}

module.exports = { convertCurrency }; // Ensure it's correctly exported
