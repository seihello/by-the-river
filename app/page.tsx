"use client";

import { useCallback, useEffect, useRef, useState } from "react";

enum Direction {
  None,
  Up,
  UpRight,
  Right,
  DownRight,
  Down,
  DownLeft,
  Left,
  UpLeft,
}

const SPEED = 10;

export default function Home() {
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D>();
  const [myCharacter, setMyCharacter] = useState<HTMLImageElement>();
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 400,
    y: 200,
  });
  // const [timer, setTimer] = useState<NodeJS.Timeout | null>();
  const [movingDirection, setMovingDirection] = useState<Direction>(
    Direction.None,
  );

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    console.log("e.repeat", e.repeat);

    if (e.repeat) return;

    const newTimer = setInterval(() => {
      switch (e.key) {
        case "ArrowUp":
          setPosition((prev) => ({ ...prev, y: prev.y - SPEED }));
          break;
        case "ArrowDown":
          setPosition((prev) => ({ ...prev, y: prev.y + SPEED }));
          break;
        case "ArrowRight":
          setPosition((prev) => ({ ...prev, x: prev.x + SPEED }));
          break;
        case "ArrowLeft":
          setPosition((prev) => ({ ...prev, x: prev.x - SPEED }));
          break;
      }
    }, 50);

    document.addEventListener("keyup", () => {
      clearInterval(newTimer);
    });
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  useEffect(() => {
    if (canvas && canvas.current) {
      const context = canvas.current.getContext("2d");
      if (context) {
        const myImage = new Image();
        myImage.src = "/img/characters/pomeranian.png";
        setContext(context);
        setMyCharacter(myImage);
        myImage.onload = () => {
          context.drawImage(myImage, position.x, position.y, 80, 80);
        };
      }
    }
  }, [canvas]);

  useEffect(() => {
    if (context && myCharacter) {
      context.clearRect(0, 0, 800, 500);
      context.drawImage(myCharacter, position.x, position.y, 80, 80);
    }
  }, [context, position, myCharacter]);

  return (
    <main className="mx-auto bg-white">
      <canvas width={800} height={500} className="bg-green-700" ref={canvas} />
    </main>
  );
}
