import Cursor from "@/components/Cursor";
import Image from "next/image";
import './globals.css'
import Button from "@/components/Button";


export default function Home() {


  return (
    <>
    <head>
      <title>Game Saloon</title>
    </head>
    <body>
    <Cursor/>
    <main className="flex min-h-screen text-bolder flex-col items-center justify-center text-center p-24">
    <h1 className="text-5xl text-white title m-2  ">Game Saloon</h1>
    <Button text="Whack a Mole!"></Button>
    <Button text="Tic Tac Toe"></Button>
    <Button text="Ships Game"></Button>

    </main>
    </body>
    </>
  );
}