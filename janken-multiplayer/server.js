const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const players = {};

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('join', (playerName) => {
        players[socket.id] = { name: playerName, choice: null };
        io.emit('updatePlayers', players);
    });

    socket.on('makeChoice', (choice) => {
        if (players[socket.id]) {
            players[socket.id].choice = choice;
            io.emit('updatePlayers', players);
        }
    });

    socket.on('disconnect', () => {
        delete players[socket.id];
        io.emit('updatePlayers', players);
        console.log('user disconnected');
    });
});

app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`listening on *:${PORT}`);
});
