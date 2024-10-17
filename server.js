const express = require("express");
const { convertCurrency } = require("./Currency-package/index"); // Import from the NPM package

const app = express();
const PORT = 3000;

// REST API endpoint: /convert?amount=100&from=USD&to=EUR
app.get("/convert", async (req, res) => {
  try {
    const { amount, from, to } = req.query;

    if (!amount || !from || !to) {
      return res.status(400).json({ error: "Missing required query parameters." });
    }

    const convertedAmount = await convertCurrency(parseFloat(amount), from, to);
    res.json({ amount, from, to, convertedAmount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Currency API listening at http://localhost:${PORT}`);
});
