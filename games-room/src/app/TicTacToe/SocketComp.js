'use client'
import Button from '@/components/Button';
import TTTComponent from '@/components/TTTComponent';
import React, { useEffect, useState} from 'react';
import { io } from 'socket.io-client';

function SocketComp() {
    
    const [socket, setSocket] = useState();
    const [authorize, setAuthorize] = useState(false);
    const[emptyField, setEmptyField] = useState('')
    const [ready,setReady] = useState(false)
    const[result,setResult] = useState('')

let end=false;
let combination = [[0,1,2], [3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]] 
    let ip = ""
    useEffect(() => {
        const newSocket = io("http://"+ip+":5000")
    
        newSocket.on('connect', () => {
            setSocket(newSocket);
        });
    
        newSocket.on('responseevent', (ready,data) => {
            setReady(ready)
            console.log(data);
        });
    
        newSocket.on('connect_error', (error) => {
            console.error("Socket connection error:", error);
        });
        newSocket.on('connect_timeout', () => {
            console.error("Socket connection timeout.");
        })
        newSocket.on('markField',(field,sign,turn)=>{
            let btn =  document.getElementById(field)
            btn.innerHTML= sign
             btn.disabled = true;
             let btns=document.querySelectorAll("button");
             if(turn){
                btns.forEach(e=>{
                    e.innerHTML=="..."? e.disabled=false : e.disabled=true
                 })
                }else{
             btns.forEach(e=>{
                e.disabled=true
             })}

        })
        newSocket.on('CheckWin',(username,sign)=>{
            combination.forEach(arrays => {
                let winningSet = sign+sign+sign
                let comb =''
                arrays.forEach(element => {
                let btn1 =  document.getElementById(element)
                comb+=btn1.innerText

            });
                if((comb)==winningSet){
                console.log('Wygrales!! ',username);
                end=true;
                newSocket.emit('endGame',1,(username));
                let btns=document.querySelectorAll("button");
                btns.forEach(e=>{
                    e.disabled=true
                 })
                }


            });
            let draw=true
            for (let i = 0; i < 9; i++) {
                let btn =  document.getElementById(i).innerText
                if(btn=="..."){
                    draw=false}
            }
            if(draw && !end){
                newSocket.emit('endGame',0,(username));
        }
    })

        newSocket.on('Result',(result) => {
            setResult(result);
            let btns=document.querySelectorAll("button");
            btns.forEach(e=>{
                e.disabled=true
             })
            })

    
        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
    }, []);
const submit = ()=>{
    let username = document.querySelector('#username-field').value 
    if(username){
        socket.emit('gameConnection',{username:username,id:Math.floor(Math.random()*100000),room_id:'1'});
        window.localStorage.setItem('authorize', JSON.stringify(true));
        setAuthorize(window.localStorage.getItem('authorize'))
    }
}


    return (

        <>
        { /* (window.localStorage.getItem('authorize') || */ (authorize)?
        ((ready)?
        <>

        <TTTComponent socket={socket} result={result}/>
        </>
        :<p className='text-white text-4xl'>Czekaj na przeciwnika...</p>)
        :
        <main className="flex min-h-screen text-bolder flex-col items-center justify-center text-center p-24">
        <input  type="text" className='text-black p-2' id="username-field" required placeholder="Username"/>
        {emptyField}<br/>
        <Button text='Submit your name!' func={submit} />
        </main>
        }
        </>
    );
}

export default SocketComp;
