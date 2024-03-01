import React, { useEffect } from 'react'

function TTTComponent({socket,result}) {
    const appendBoard = () => {
        const buttons = [];
        for (let i = 0; i < 9; i++) {
            buttons.push(<button key={i} onClick={(e)=>clickedButton(e)} className='text-white border-2 sm:p-14  p-6 text-5xl md:p-16 lg:p-10 w-auto' id={i}>...</button>);
        }
        return buttons;
    }
    const clickedButton = (e)=>{
    socket.emit('clickField',e.target.id)
        let btn =  document.getElementById(e.target.id)
        btn.innerHTML= socket.sign
        btn.value= socket.sign

        btn.disabled = true;
    }
  return (
    <body className=' h-screen flex justify-center'>
        <div className="board grid grid-cols-3 place-content-center gap-2">
        <h3 className='text-center col-span-3 lg:text-3xl md:text-3xl text-3xl'>Wynik: {result}</h3>

        {appendBoard()}
        </div>
    </body>
  )
}

export default TTTComponent
