const socket = io();

socket.on('connect', () => {
    document.getElementsByClassName('chatArea').innerText = "A Connection Happened!";
})