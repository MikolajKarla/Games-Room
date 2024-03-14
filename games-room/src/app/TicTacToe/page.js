import React from 'react'
import '@/app/globals.css'
import SocketComp from './SocketComp'
import Cursor from '@/components/Cursor'




function TicTacToe() {

  return (
    <>
    <Cursor/>
    <SocketComp />
    
    </>
  )
}

export default TicTacToe
