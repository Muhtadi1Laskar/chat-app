let socket = io();

    socket.on('connect', function(){
           console.log("Connected to server");

           socket.emit('newMessage', {
               from: "Nusaibah",
               text: "I love you"
           })
       });

       socket.on('newMessage', function(newMessage){
           console.log("Got a new message", newMessage);
       });

       socket.on('disconnect', function(){
           console.log("Disconnected from server");
       });

       