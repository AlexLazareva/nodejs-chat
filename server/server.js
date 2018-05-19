"use strict";

const express = require('express');
const app = express();
const path = require('path');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});

app.listen(8000, '0.0.0.0', () => {
    console.log('Server started on port 8000');
});
