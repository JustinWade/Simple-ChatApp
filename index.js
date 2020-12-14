const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// renders our client side JavaScript
app.get('/', function(req, res) {
    res.render('index.ejs');
});

// opens socket connection between server and client / displays when user joins
io.sockets.on('connection', function(socket) {
    socket.on('username', function(username) {
        socket.username = username;
        io.emit('is_online', '🔵 <i>' + socket.username + ' join the chat..</i>');
    });

    // disconnects and displays user leaving
    socket.on('disconnect', function(username) {
        io.emit('is_online', '🔴 <i>' + socket.username + ' left the chat..</i>');
    })

    // displays message content by user
    socket.on('chat_message', function(message) {
        io.emit('chat_message', '<strong>' + socket.username + '</strong>: ' + message);
    });

});

// http listener on localhost port
const server = http.listen(8080, function() {
    console.log('listening on port 8080');
});
