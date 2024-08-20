"use client";
import { dataToCanvas } from "@/types/declaration";
import path from "path";
import React from "react";
import { useEffect, useRef, useState, useLayoutEffect } from "react";
import rough from "roughjs";

const Canvas = ({
  canvasRef,
  ctx,
  color,
  tool,
  element,
  setElement,
  strokeWidth,
  canvasDivRef,
}: dataToCanvas) => {
  const generator = rough.generator();
  const [isDrawing, setIsDrawing] = useState(false);

  //setup for drawing with pencil
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.log("can't render");
      return;
    }
    // h-[75vh] w-[80vw]
    //Setting the canvas site and width to be responsive
    var sizeWidth = (81 * window.innerWidth) / 100,
      sizeHeight = (75 * window.innerHeight) / 100;

    canvas.width = sizeWidth;
    canvas.height = sizeHeight;
    const context = canvas?.getContext("2d");
    // context.scale(2, 2);
    ctx.current = context;
    ctx.lineCap = "round";
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;

    // ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, []);

  useEffect(() => {
    ctx.current.strokeStyle = color;
  }, [color]);

  useEffect(() => {
    ctx.current.lineWidth = strokeWidth;
  }, [strokeWidth]);

  const handleMouseDown = (e: any) => {
    let { offsetX, offsetY } = e.nativeEvent;
    setIsDrawing(true);
    //for pencil
    if (tool === "pencil") {
      setElement((prevElements: any) => [
        ...prevElements,
        {
          tool: tool,
          offsetX,
          offsetY,
          stroke: color,
          strokeWidth: strokeWidth,
          path: [[offsetX, offsetY]],
        },
      ]);
    }
    //for line
    if (tool === "line" || tool === "rectangle") {
      setElement((prevElements: any) => [
        ...prevElements,
        {
          tool: tool,
          x1: offsetX,
          y1: offsetY,
          stroke: color,
          strokeWidth: strokeWidth,
        },
      ]);
    }
  };

  const handleMouseMove = (e: any) => {
    if (!isDrawing) {
      return;
    }
    // console.log(element, " test ");
    if (
      Array.isArray(element) &&
      element.length > 0 &&
      element[element.length - 1]?.path
    ) {
      let { offsetX, offsetY } = e.nativeEvent;
      //for pencil
      if (tool === "pencil") {
        const { path = "defaultPath" } = element[element.length - 1] || {};

        const newPath = [...path, [offsetX, offsetY]]; //continuously updating the path

        setElement((prevElement: any) =>
          prevElement.map((elem: any, index: number) => {
            if (index === element.length - 1) {
              return {
                ...elem,
                path: newPath,
              };
            } else {
              return {
                ...elem,
              };
            }
          })
        );
      }
      //for rectangle
      else if (tool === "rectangle") {
        setElement((prevElement: any) =>
          prevElement.map((elem: any, index: number) => {
            if (index === element.length - 1) {
              return {
                ...elem,
                width: offsetX - elem.x1,
                height: offsetY - elem.y1,
              };
            } else {
              return {
                ...elem,
              };
            }
          })
        );
      }
      //for the line
      else if (tool === "line") {
        setElement((prevElement: any) =>
          prevElement.map((elem: any, index: number) => {
            if (index === element.length - 1) {
              return {
                ...elem,
                width: offsetX,
                height: offsetY,
              };
            } else {
              return {
                ...elem,
              };
            }
          })
        );
      }
    }
  };

  const handleMouseUp = (e: any) => {
    setIsDrawing(false);
  };
  //   let { offsetX, offsetY } = e.nativeEvent;

  //   //for the rectangle

  // };

  //?writing into canvas
  useLayoutEffect(() => {
    if (canvasRef.current) {
      let roughCanvas = rough.canvas(canvasRef.current);
      if (element.length > 0) {
        ctx.current.clearRect(
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
      }

      element.forEach((elem: any) => {
        //for pencil
        if (elem.tool === "pencil") {
          roughCanvas.linearPath(elem?.path, {
            stroke: elem.stroke,
            roughness: 0,
            strokeWidth: elem.strokeWidth,
          });
        }
        //for line
        else if (elem.tool === "line") {
          roughCanvas.draw(
            generator.line(elem.x1, elem.y1, elem.width, elem.height, {
              stroke: elem.stroke,
              roughness: 0,
              strokeWidth: elem.strokeWidth,
            })
          );
        }
        //for rectangele
        else if (elem.tool === "rectangle") {
          roughCanvas.draw(
            generator.rectangle(elem.x1, elem.y1, elem.width, elem.height, {
              stroke: elem.stroke,
              roughness: 0,
              strokeWidth: elem.strokeWidth,
            })
          );
        }
        //for image
        else if (elem.tool === "image") {
          const img = new Image();
          img.src = elem.src;
          img.onload = () => {
            ctx.current.drawImage(img, 0, 0);
          };
        }
      });
    } else {
      console.log("unable to load canvas");
    }
  }, [element]);

  return (
    <>
      {/* {JSON.stringify(element[element.length - 1].path)} */}
      <div
        className="flex justify-center h-[77vh] w-[82vw] border-primary border-4 rounded-md m-2 mb-10"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <div
          className="flex justify-center pt-0.5 h-[75vh] w-[81vw]"
          ref={canvasDivRef}
        >
          <canvas ref={canvasRef} id="canvas" />
        </div>
      </div>
    </>
  );
};

export default Canvas;
