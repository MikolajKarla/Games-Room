const { createServer } = require('http');
const { Server } = require('socket.io');

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ['GET', 'POST']
    },
});

let username, id,sign
let turn =false;
let room =0
let userCount = 0

io.on('connection', async (socket) => {
    
    socket.on('gameConnection', (user) => {
        let clientNumber
        userCount++
        username = user.username;
        id = user.id;
        if(userCount%2==0 || userCount==0){
            socket.join(room + 'room');
         clientNumber = io.sockets.adapter.rooms.get((room) + 'room').size;

        }else{
            room++
            socket.join(room + 'room');
         clientNumber = io.sockets.adapter.rooms.get((room) + 'room').size;
        console.log(clientNumber);
    }
    console.log(username, id, room,userCount);

        if (clientNumber < 2) {

            socket.emit('responseevent', false,'U must wait for another player');
            socket.join(room + 'room');
            sign = 'X'
        }else{
            socket.to(room + 'room').emit('responseevent',true, 'start game!');
            socket.emit('responseevent', 'start game!');
            sign = 'O'

        }
        // Set variables in socket instance
        socket.username = username;
        socket.sign = sign
        socket.room = room;
    });

    socket.on('clickField', (field,turn) => {
        console.log(field, socket.sign, socket.room+"room");
        socket.emit('markField', field, socket.sign,turn);
        socket.to(socket.room+'room').emit('markField', field, socket.sign,turn=!turn);
        socket.emit('CheckWin',socket.username,socket.sign)

    });

    socket.on('endGame', (status,winner='') =>{
        if(status==1){
            socket.to(socket.room+'room').emit('Result',(winner+' wygrał!!'));
            socket.emit('Result',(winner+' wygrał!!'));


        }else if(status==0){
            socket.to(socket.room+'room').emit('Result','Remis!!');
            socket.emit('Result','Remis!!');

        }
    })
});

httpServer.listen(5000, () => {
    console.log('Connected ws');
});

