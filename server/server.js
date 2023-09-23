const express = require('express');
const cors = require('cors');
const fs = require('fs'); // Import the 'fs' module for file operations
const app = express();
const port = 3000;

//app.use('/', express.static('public'));
app.use(cors());

// Read the budget data from the JSON file
const budget = {
    myBudget: [
        {
            title: 'Eat out',
            budget: 50
        },
        {
            title: 'Rent',
            budget:200
        },
        {
            title: 'Grocery',
            budget: 90
        }
        ]
    
    };
const budgetData = JSON.parse(fs.readFileSync('budget-data.json', 'utf8'));

/*app.get('/hello', (req, res) => {
    res.send('Hello World!');
});*/

app.get('/budget', (req, res) => {
    res.json(budgetData);
});

app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});