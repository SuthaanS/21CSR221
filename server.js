const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 9876;
const WIN_SIZE = 10;

let windowState = [];

const validIds = ['p', 'f', 'e', 'r'];

const fetchNumbers = async (type) => {
  const apiUrl = `http://thirdpartyserver.com/api/${type}`;
  try {
    const res = await axios.get(apiUrl, { timeout: 1000 });
    return res.data.numbers;
  } catch (error) {
    console.error(`Error fetching numbers: ${error.message}`);
    return [];
  }
};

app.get('/numbers/:numberid', async (req, res) => {
  const numId = req.params.numberid;

  if (!validIds.includes(numId)) {
    return res.status(400).json({ error: 'Invalid number ID' });
  }

  const newNum = await fetchNumbers(numId);

  const uniqNum = [...new Set([...winState, ...newNum])];

  if (uniqNum.length > WIN_SIZE) {
    winState = uniqNum.slice(-WIN_SIZE);
  } else {
    winState = uniqNum;
  }

  const average =
    winState.reduce((sum, num) => sum + num, 0) / winState.length;

  res.json({
    windowPrevState: winState.slice(0, -newNumbers.length),
    windowCurrState: winState,
    numbers: newNumbers,
    avg: average.toFixed(2),
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
