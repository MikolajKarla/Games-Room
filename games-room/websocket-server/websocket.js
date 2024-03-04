const { createServer } = require('http');
const { Server } = require('socket.io');

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ['GET', 'POST']
    },
});

let username, id, room;
let sign='O'
let turn =false;


io.on('connection', async (socket) => {
    console.log(socket.id + " connected!");

    socket.on('gameConnection', (user) => {
        username = user.username;
        id = user.id;
        room = user.room_id;
        sign =sign==="X"?'O':"X"
        console.log(username, id, room,sign);
        socket.join(room + 'room');

        let clientNumber = io.sockets.adapter.rooms.get(room + 'room').size;
        console.log(clientNumber);
        if (clientNumber < 2) {
            socket.emit('responseevent', false,'U must wait for another player');
        } else {
            socket.to(room + 'room').emit('responseevent',true, 'start game!');
            socket.emit('responseevent', 'start game!');
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
            socket.emit('Result',(winner+' wygrał!!'));

        }
    })
});

httpServer.listen(5000, () => {
    console.log('Connected ws');
});

