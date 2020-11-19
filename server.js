const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const server = http.createServer(app);
const socketio = require('socket.io');
const io = socketio(server);
const formatMessage = require('./utilities/formatMessage');

let userDB = {}; //Hashtable with Key=socket.id and values=Username

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));


//listen to the submit form;



io.on('connection', socket => {
    console.log('A Client Has connected!');

    socket.on('joinRoom', payload => {
        let user = payload.userName;
        let room = payload.roomName;

        userDB[socket.id] = {user, room}; //Add a new entry to the hashmap

        socket.join(room);
        socket.broadcast.to(room).emit('userJoined', user);
    });


    
    socket.on('disconnect', () => {
        io.emit('message', 'A user has left the chat');
    });

    //Listen for clients sending the chatMessage event
    socket.on('chatMessage', payload => {
        const message = formatMessage(payload.username, payload.roomName, payload.msg);
        io.to(payload.roomName).emit('message', message);
    })
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})