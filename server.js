const express = require('express');
const fs = require('fs'); // Import the 'fs' module for file operations
const app = express();
const port = 3000;

app.use('/', express.static('public'));

// Read the budget data from the JSON file
const budgetData = JSON.parse(fs.readFileSync('budget-data.json', 'utf8'));

app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

app.get('/budget', (req, res) => {
    res.json(budgetData);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
