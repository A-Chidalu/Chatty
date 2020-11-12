const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const server = http.createServer(app);
const socketio = require('socket.io');
const io = socketio(server);
const formatMessage = require('./utilities/formatMessage');


//Set static folder
app.use(express.static(path.join(__dirname, 'public')));


//listen to the submit form;



io.on('connection', socket => {
    console.log('A Client Has connected!');

    socket.emit('message', 'Hello!');

    socket.broadcast.emit('message', 'A user has joined the chat');
    
    socket.on('disconnect', () => {
        io.emit('message', 'A user has left the chat');
    });

    //Listen for clients sending the chatMessage event
    socket.on('chatMessage', payload => {
        const message = formatMessage(payload.username, payload.msg);
        io.emit('message', message);
    })
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})