const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const PORT = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

//Static file
app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log("New user connected");

    socket.emit('newMessage', {
        from: "Muhtadi Laskar",
        text: "Hello World",
        createdAt: 123123
    });

    socket.on('newMessage', function(newMessage){
        console.log("Message: ", newMessage);
    });

    socket.on('disconnect', function(){
        console.log("Disconnect from the Frontend");
    });
});

//Fire up the server
server.listen(PORT, () => {
    console.log(`App is listening to port ${PORT}`);
});
