const express = require('express');
const app = express();

const port = process.env.PORT || 8000;
const baseUrl = `http://localhost:${port}`;


app.get('/', (req, res) => {
   res.status(200).send('hello world!');
});

// Server
module.exports = app;