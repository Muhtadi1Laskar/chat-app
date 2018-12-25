const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');
const {
    generateMessage,
    generateLocationMessage
} = require('./utils/message')

const publicPath = path.join(__dirname, '../public');
const PORT = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

//Static file
app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log("New user connected");

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat App'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    socket.on('createMessage', (newMessage, callback) => {
        console.log("Message: ", newMessage);
        io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));
        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    socket.on('disconnect', function () {
        console.log("Disconnect from the Frontend");
    });
});

//Fire up the server
server.listen(PORT, () => {
    console.log(`App is listening to port ${PORT}`);
});