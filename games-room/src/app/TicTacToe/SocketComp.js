'use client'
import Button from '@/components/Button';
import TTTComponent from '@/components/TTTComponent';
import React, { useEffect, useState} from 'react';
import { io } from 'socket.io-client';

function SocketComp() {
    
    const [socket, setSocket] = useState();
    let ip = ""
    useEffect(() => {
        const newSocket = io("http://"+ip+":5000")
    
        newSocket.on('connect', () => {
            setSocket(newSocket);
        });
    
        newSocket.on('responseevent', (data) => {
            console.log(data);
        });
    
        newSocket.on('connect_error', (error) => {
            console.error("Socket connection error:", error);
        });
        newSocket.on('connect_timeout', () => {
            console.error("Socket connection timeout.");
        })
    
        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
    }, []);
const submit = ()=>{

    socket.emit('gameConnection',{username:'miko',id:Math.floor(Math.random()*100000),room_id:'1'});
    window.localStorage.setItem('authorize', JSON.stringify(true));

}


    return (

        <>
        {window.localStorage.getItem('authorize')?
            <TTTComponent/>
        :
        <main>
        <input  type="text" id="username-field" placeholder="Username"/>
        <br/>
        <Button text='Submit your name!' func={submit} />
        </main>
        }
        </>
    );
}

export default SocketComp;
