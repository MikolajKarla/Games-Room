'use client'
import React, { useEffect } from 'react'
import './components.css'

function Cursor() {
    useEffect(() => {
    let cursor = document.getElementById('cursor')
    document.onmousemove = (e)=>{
      cursor.style.top = e.pageY + 'px'
      cursor.style.left = e.pageX + 'px'
      document.querySelector('main')
    }
    })


  return (
    <div id='cursor'></div>
  )
}

export default Cursor
