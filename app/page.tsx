"use client";

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D>();
  const [myCharacter, setMyCharacter] = useState<HTMLImageElement>();

  useEffect(() => {
    if (canvas && canvas.current) {
      const context = canvas.current.getContext("2d");
      if (context) {
        const myImage = new Image();
        myImage.src = "/img/characters/pomeranian.png";
        setContext(context);
        setMyCharacter(myImage);
        myImage.onload = () => {
          context.drawImage(myImage, 0, 0, 80, 80);
        };
      }
    }
  }, [canvas]);

  return (
    <main className="mx-auto bg-white">
      <canvas
        width={800}
        height={500}
        className="bg-green-500/50"
        ref={canvas}
      />
    </main>
  );
}
