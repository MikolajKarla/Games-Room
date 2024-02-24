'use client'
import React from 'react'

import "./components.css"

function Button({text='',func='', targetpage='#'}) {
    
let nothing =() =>{
    if(targetpage!=="#") 
    {window.location= targetpage}
    };  //default function if func is not passed
    
  return (
    <button className='btn lg:w-4/12 md:w-8/12 w-full m-2' onClick={func==''?nothing:func}>
        <a href={targetpage}/>{text}
        </button>
      )
}

export default Button
