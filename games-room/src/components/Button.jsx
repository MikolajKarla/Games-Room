'use client'
import React from 'react'
import "./components.css"
let nothing =() =>{};  //default function if func is passed
function Button({text='',func=nothing}) {
  return (
    <button className='btn lg:w-4/12 sm:w-full m-2' onClick={func}>
        {text}
    </button>
  )
}

export default Button
