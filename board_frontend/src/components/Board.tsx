"use client";
import React from "react";
import { useRef, useState, useEffect } from "react";
import Canvas from "./Canvas";
import { MenuBar } from "./MenuBar";
import { UserType } from "@/types/declaration";
import { useBoardContext } from "@/context/myContext";

const Board = () => {
  const { socket, user } = useBoardContext();
  let canvasRef = useRef<HTMLCanvasElement>(null);
  let ctx = useRef(null);
  let imgRef = useRef<HTMLImageElement>(null);

  const [tool, setTool] = useState("pencil");
  const [color, setColor] = useState("black");
  const [element, setElement] = useState([]); //this for storing the path of drawn line through mouse

  useEffect(() => {
    console.log(user[0].presenter);
    socket.on("boardResponse", (data: any) => {
      console.log(data);
      if (imgRef.current) {
        if (data.imageUrl) {
          imgRef.current.src = data.imageUrl;
        }
      }
    });
  }, []);
  useEffect(() => {
    const canvasImg = canvasRef.current?.toDataURL();
    socket.emit("boardData", canvasImg);
  }, [element]);

  return (
    <>
      <section className="h-full w-screen overflow-hidden flex justify-center bg-secondary">
        <div className="flex fixed left-5 bottom-[50%] h-fit bg-white rounded-t-3xl rounded-b-3xl px-0 py-2">
          <MenuBar tool={tool} setTool={setTool} />
        </div>
        <div className="h-[75vh] w-[80vw]">
          {user[0].presenter ? (
            <Canvas
              canvasRef={canvasRef}
              ctx={ctx}
              setElement={setElement}
              tool={tool}
              color={color}
              element={element}
            />
          ) : (
            <div className="h-[77vh] w-[82vw] border-black border-4 rounded-md m-2 mb-10 overflow-hidden">
              <img
                className="w-75vw h-80vh overflow-hidden"
                ref={imgRef}
                alt="Real time board being shared"
                src="/time.jpg"
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Board;
