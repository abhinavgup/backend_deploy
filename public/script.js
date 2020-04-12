var socket=io();

socket.on('connected',function(){


console.log('client connected at'+ socket.id);

})



$(function(){


let inpl=$('#logbox');
let dil=$('#soc-login');
let btl=$('#lgn-btn');


let inp=$('#msgbox');
let di=$('#soc-chat');
let bt=$('#btn');
let lis=$('#list');


var user='';




bt.click(function(){

socket.emit('sendmessage',{message: inp.val(),
user:user
}

)

})


btl.click(function(){

        user= inpl.val();
        dil.hide();
        di.show();

socket.emit('login',{


user:user


})

})



socket.on('receivemessage',function(data){
    lis.append($('<li>'+ data.user + ':' + data.message +'</li>'))
})








})