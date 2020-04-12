const express=require('express');

const app=express();

const path=require('path');

const socketio=require('socket.io');

const http=require('http');

const server=http.createServer(app);

const io=socketio(server);

const server_port=process.env.PORT || 3000;

app.use('/', express.static(path.join(__dirname, 'public')));


var userSockets={};


io.on('connection',function(socket) {
    
console.log('server connected at'+ socket.id);
socket.emit('connected');

socket.on('sendmessage',function(data){
    // socket.broadcast.emit('receivemessage',data);// this sends data to all clients except to that client which has initiated message
    // io.emit('receivemessage',data); // thus sends mesage to all clients
    if(data.message.startsWith('@')){

   var recepient=data.message.split(":")[0].substr(1);

    var recepientsocket=userSockets[recepient];

   io.to(recepientsocket).emit('receivemessage',data); 

    }
    else{
         socket.broadcast.emit('receivemessage',data);
    }
     
})




socket.on('login',function(data){

userSockets[data.user]=socket.id;
console.log(userSockets);
})










})


server.listen(server_port);






