const socket = io();

socket.on('connect', () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    //console.log(`<div>${urlParams.get('userName')}`);
    let userName = urlParams.get('userName');
    renderUserJoinedMsg(userName);
 
    

});

socket.on('message', (msg) => {
    console.log(msg);
    //output msg here
});

const msgInput = document.getElementById('msgInput');
const sendButton = document.getElementById('button-addon2');

// Execute a function when the user releases a key on the keyboard
msgInput.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("button-addon2").click();
    }
  });

sendButton.addEventListener("click", () => {
    const msg = msgInput.value;
    const username = getUserName();

    socket.emit('chatMessage', msg);

    renderPersonalMsg(msg, username);
    msgInput.value = ""; //clear the input field
})



function renderPersonalMsg(msg, userName) {
    let node = document.createElement('div');
    node.setAttribute("class", "alert alert-primary mx-4"); //or node.setAttribute("class", "className") works as well
    node.setAttribute("role", "alert");

    node.innerHTML = 
    `
    <p><strong>${userName}</strong> 8:30pm</p>
    <hr>
    <p class="mb-0">${msg}</p>
    `;


    document.getElementById("content").appendChild(node); 
}

function renderOutsiderMsg(msg) {
    let node = document.createElement('div');
    node.setAttribute("class", "alert alert-secondary mx-4"); //or node.setAttribute("class", "className") works as well
    node.setAttribute("role", "alert");

    node.innerHTML = 
    `
    <p><strong>${userName}</strong> 8:30pm</p>
    <hr>
    <p class="mb-0">${msg}</p>
    `;

    document.getElementById("content").appendChild(node); 
}

function renderUserJoinedMsg(user) {
    let node = document.createElement('div');
    node.setAttribute("class", "alert alert-success mx-4 my-2"); //or node.setAttribute("class", "className") works as well
    node.setAttribute("role", "alert");
    let textNode = document.createTextNode(user + " Has Joined the Room!");
    node.appendChild(textNode);
    document.getElementById("content").appendChild(node);  
}

function getUserName() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    //console.log(`<div>${urlParams.get('userName')}`);
    let userName = urlParams.get('userName');

    return userName;
}




/**
 * Some References
 * 
 * 
 * socket.emit('message', "this is a test"); //sending to sender-client only
socket.broadcast.emit('message', "this is a test"); //sending to all clients except sender
socket.broadcast.to('game').emit('message', 'nice game'); //sending to all clients in 'game' room(channel) except sender
socket.to('game').emit('message', 'enjoy the game'); //sending to sender client, only if they are in 'game' room(channel)
socket.broadcast.to(socketid).emit('message', 'for your eyes only'); //sending to individual socketid
io.emit('message', "this is a test"); //sending to all clients, include sender
io.in('game').emit('message', 'cool game'); //sending to all clients in 'game' room(channel), include sender
io.of('myNamespace').emit('message', 'gg'); //sending to all clients in namespace 'myNamespace', include sender
socket.emit(); //send to all connected clients
socket.broadcast.emit(); //send to all connected clients except the one that sent the message
socket.on(); //event listener, can be called on client to execute on server
io.sockets.socket(); //for emiting to specific clients
io.sockets.emit(); //send to all connected clients (same as socket.emit)
io.sockets.on() ; //initial connection from a client.
 */