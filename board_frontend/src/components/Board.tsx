"use client";
import React from "react";
import { useRef, useState } from "react";
import Canvas from "./Canvas";
import { MenuBar } from "./MenuBar";

const Board = ({ meetingId }: any) => {
  let canvasRef = useRef<HTMLCanvasElement>(null);
  let ctx = useRef(null);

  const [tool, setTool] = useState("pencil");
  const [color, setColor] = useState("black");
  const [element, setElement] = useState([]); //this for storing the path of drawn line through mouse
  return (
    <>
      <section className="h-full w-screen overflow-hidden flex justify-center bg-secondary">
        <div className="flex fixed left-5 bottom-[50%] h-fit bg-white rounded-t-3xl rounded-b-3xl px-0 py-2">
          <MenuBar tool={tool} setTool={setTool} />
        </div>
        <div className="h-[75vh] w-[80vw]">
          <Canvas
            canvasRef={canvasRef}
            ctx={ctx}
            setElement={setElement}
            tool={tool}
            color={color}
            element={element}
          />
        </div>
      </section>
    </>
  );
};

export default Board;
