const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Gaggii geil so eifach');
});

app.get('/hello', (req, res) => {
    res.send('<h1>hello there, general kenobi!</h1>')
});

app.listen(3000, () => {
    console.log('The app is running on localhost:3000');
});