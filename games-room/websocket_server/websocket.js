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

    let username,id,room;

    socket.on('gameConnection',(user)=>{
        username = user.username
        id = user.id
        room = user.room_id
        console.log(username,id,room);
        socket.join(room+'room')

        let clientNumber = io.sockets.adapter.rooms.get(room + 'room').size;

        console.log(clientNumber);
        if (clientNumber<2){
        socket.emit('responseevent','U must wait for another player')
        }else{
        socket.to(room+'room').emit('responseevent','start game!')
        socket.emit('responseevent','start game!')
        }
    })


})

httpServer.listen(5000,()=>{
    console.log('Connected ws');
})