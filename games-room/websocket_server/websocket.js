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


    socket.on('myevent',(data)=>{
        console.log(data);
        socket.emit('responseevent','hello Client')
    })


})

httpServer.listen(5000,()=>{
    console.log('Connected ws');
})