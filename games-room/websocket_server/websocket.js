const {createServer} = require('http')
const { Server} = require('socket.io')


const httpServer = createServer()
const io = new Server(httpServer,{
    cors: {
        origin:"*",
        methods:['GET','POST']    
    }

});

io.on('connection',async(socket)=>{
    console.log(socket.id+ " connected!")

    socket.on('gameConnection',(username,id,room_id)=>{
        console.log(username,id,room_id);
        socket.join(room_id+'room')
        let clientNumber = io.sockets.adapter.rooms.get(room_id + 'room').size;
        if (clientNumber<2){
        socket.emit('responseevent','U must wait for another player')
        }else{
        socket.to(room_id+'room').emit('responseevent','start game!')

        }
    })


})

httpServer.listen(5000,()=>{
    console.log('Connected ws');
})