const express = require('express');

const PORT = process.env.PORT || 5000;
const app = express();

app.get('/', (req, res) => {
    res.send({app: 'express app!'});
});

app.listen(PORT);