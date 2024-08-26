"use client";
import React from "react";
import { useRef, useState, useEffect } from "react";
import Canvas from "./Canvas";
import { MenuBar } from "./MenuBar";
import { useRouter } from "next/navigation";
import { useBoardContext } from "@/context/myContext";
import rough from "roughjs";

const Board = () => {
  const {
    socket,
    user,
    canvasRef,
    ctx,
    color,
    tool,
    setTool,
    element,
    setElement,
    strokeWidth,
  } = useBoardContext();

  const generator = rough.generator();
  const redrawElements = () => {
    const roughCanvas = rough.canvas(canvasRef.current);

    element.forEach((elem) => {
      if (elem.tool === "pencil" && elem.path) {
        roughCanvas.linearPath(elem.path, {
          stroke: elem.stroke,
          roughness: 0,
          strokeWidth: elem.strokeWidth,
        });
      } else if (
        elem.tool === "line" &&
        elem.x1 !== undefined &&
        elem.y1 !== undefined &&
        elem.width !== undefined &&
        elem.height !== undefined
      ) {
        roughCanvas.draw(
          generator.line(elem.x1, elem.y1, elem.width, elem.height, {
            stroke: elem.stroke,
            roughness: 0,
            strokeWidth: elem.strokeWidth,
          })
        );
      } else if (
        elem.tool === "rectangle" &&
        elem.x1 !== undefined &&
        elem.y1 !== undefined &&
        elem.width !== undefined &&
        elem.height !== undefined
      ) {
        roughCanvas.draw(
          generator.rectangle(elem.x1, elem.y1, elem.width, elem.height, {
            stroke: elem.stroke,
            roughness: 0,
            strokeWidth: elem.strokeWidth,
          })
        );
      }
    });
  };

  // let imgRef = useRef<HTMLImageElement>(null);
  let canvasDivRef = useRef<HTMLDivElement>(null);
  const [currentImg, setCurrentImg] = useState<string>("");
  const [prevImg, setPrevImg] = useState<string>("");

  useEffect(() => {
    // Listening for data from the backend
    const handleBoardResponse = (data: any) => {
      console.log("data fetched:", data);
      const img = new Image();
      img.src = data.imgUrl;
      setPrevImg(currentImg);
      setCurrentImg(data.imgUrl);
      img.onload = () => {
        // ctx.current?.clearRect(
        //   0,
        //   0,
        //   canvasRef.current?.width || 0,
        //   canvasRef.current?.height || 0
        // );
        ctx.current?.drawImage(img, 0, 0);
      };
      // redrawElements();
    };
    socket.on("boardResponse", handleBoardResponse);

    return () => {
      socket.off("boardResponse");
    };
  }, []);

  useEffect(() => {
    // socket.on("getState", () => {
    if (!canvasRef.current?.toDataURL()) return;
    console.log("sending canvas state");
    socket.emit("boardData", canvasRef?.current.toDataURL());
    // });

    return () => {
      // socket.off("getState");
      socket.off("boardData");
    };
  }, [element]);

  return (
    <>
      <section className="h-full w-screen overflow-hidden flex justify-center ">
        <div className="flex fixed left-5 bottom-[50%] h-fit bg-col4 rounded-t-3xl rounded-b-3xl px-0 py-2">
          <MenuBar />
        </div>
        <div className="h-[77vh] w-[82vw]">
          <Canvas
            canvasRef={canvasRef}
            ctx={ctx}
            setElement={setElement}
            tool={tool}
            color={color}
            element={element}
            strokeWidth={strokeWidth}
            canvasDivRef={canvasDivRef}
            redrawElements={redrawElements}
            prevImg={currentImg}
          />
          {/* ) : (
            <div className="h-[77vh] w-[82vw] border-primary border-4 rounded-md m-2 mb-10 overflow-hidden">
              <img
                className="w-75vw h-80vh overflow-hidden"
                ref={imgRef}
                alt="Real time board being shared"
                src="/time.jpg"
              />
            </div>
          )} */}
        </div>
      </section>
    </>
  );
};

export default Board;
