const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
const server = http.createServer(app);

const io = new socketIo.Server(server, {
    cors: {
        origin: '*',
    },
});

io.on("connection", (socket) => {

    socket.on("join", (roomName) => {
        socket.join(roomName);
    });

    socket.on("done", (message,roomName) => {
        message = getRandomName() +" "+ message;
        io.to(roomName).except(socket.id).emit("send", message);
    });
});

const PORT = 7000;
server.listen(PORT, () => {
    console.log('server started in 7000');
});

const names = ['Aakash', 'Sagun', 'Amey', 'Anupam', 'Rishab'];

function getRandomName() {
  const randomIndex = Math.floor(Math.random() * names.length);
  return names[randomIndex];
}