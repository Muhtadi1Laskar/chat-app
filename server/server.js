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
        from: 'Admin',
        text: 'Welcome to the Chat App',
        createdAt: new Date().getTime()
    });

    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New user joined',
        createdAt: new Date().getTime()
    });

    socket.on('newMessage', function(newMessage){
        console.log("Message: ", newMessage);
        
        

        io.emit('newMessage', {
            from: newMessage.from,
            text: newMessage.text,
            createdAt: new Date().getTime()

        });
        // socket.broadcast.emit('newMessage', {
        //     from: newMessage.from,
        //     text: newMessage.text,
        //     vreatedAt: new Date().getTime()
        // });
    });

    socket.on('disconnect', function(){
        console.log("Disconnect from the Frontend");
    });
});

//Fire up the server
server.listen(PORT, () => {
    console.log(`App is listening to port ${PORT}`);
});
