const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const server = http.createServer(app);
const socketio = require('socket.io');
const io = socketio(server);


//Set static folder
app.use(express.static(path.join(__dirname, 'public')));


//listen to the submit form;



io.on('connection', socket => {
    console.log('A Client Has connected!');

    socket.emit('message', 'Hello!');

 
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})