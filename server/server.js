"use strict";

const express = require('express');
const app = express();
const nunjucks = require('nunjucks');

const server = require('http').Server(app);
const io = require('socket.io')(server, {serveClient: true});
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/nodejs-chat', {});
mongoose.Promise = require('bluebird');

nunjucks.configure('./client/views', {
    autoescape: true,
    express: app
});

app.use('/assets', express.static('./client/public'));

app.get('/', (req, res) => {
    res.render('index.html');
});

io.on('connection', function (socket) {
    socket.emit('connected', "Socket connected!");

    socket.join('all');

    socket.on('msg', content => {
        console.log("MSG", content);
        const obj = {
            date: new Date(),
            content: content,
            username: socket.id
        };
        socket.emit("message", obj);
        socket.to('all').emit("message", obj);
    });
});

server.listen(8000, '0.0.0.0', () => {
    console.log('Server started on port 8000');
});
