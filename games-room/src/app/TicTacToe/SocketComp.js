'use client'
import Button from '@/components/Button';
import React, { useEffect, useState} from 'react';
import { io } from 'socket.io-client';

function SocketComp() {
    
    const [socket, setSocket] = useState();
    const [buttonText, setButtonText] = useState('Send Event');
    const [authorize, setAuthorize] = useState(false);

    useEffect(() => {
        const newSocket = io("http://172.20.10.2:5000")
    
        newSocket.on('connect', () => {
            setSocket(newSocket);
            console.log(newSocket, newSocket.id);
        });
    
        newSocket.on('responseevent', (data) => {
            setButtonText(data);
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

function submit() {
    console.log('fromsokcetcomp', authorize);
    setAuthorize(true);
    window.localStorage.setItem('authorize', JSON.stringify(true));
    console.log('fromsokcetcomp2', authorize);
}
const sendEvent = ()=>{
    socket.emit('gameConnection',('miko',Math.floor(Math.random()*1000),'1'));
}


    return (

        <>
        {authorize?
                <div>
                <button className='text-white border-2 border-white' onClick={sendEvent}>{buttonText}</button>
            </div>
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
