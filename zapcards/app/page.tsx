import React from "react";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div>
        <p>ZapCards</p>
      </div>
      <div className="flex flex-col items-center gap-6">
        <div className="w-full max-w-sm p-6 rounded-2xl text-center">
          <p className="font-black text-4xl">Select an option</p>
        </div>
        <div className="w-full max-w-sm p-6 border rounded-2xl text-center hover:bg-white transition-all duration-500 hover:text-black">
          <a className="">Comida</a>
        </div>
        <div className="w-full max-w-sm p-6 border rounded-2xl text-center hover:bg-white transition-all duration-500 hover:text-black">
          <a className="">Cosas de casa</a>
        </div>
        <div className="w-full max-w-sm p-6 border rounded-2xl text-center hover:bg-white transition-all duration-500 hover:text-black">
          <a className="">Animales</a>
        </div>
        <div className="w-full max-w-sm p-6 border rounded-2xl text-center hover:bg-white transition-all duration-500 hover:text-black">
          <a className="">Verbos</a>
        </div>
      </div>
    </>
  );
}
