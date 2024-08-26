"use client";
import React, { useRef, useState, useLayoutEffect, useEffect } from "react";
import rough from "roughjs";

type Tool = "pencil" | "line" | "rectangle";

interface Element {
  tool: Tool;
  stroke: string;
  strokeWidth: number;
  path?: any;
  x1?: number;
  y1?: number;
  width?: number;
  height?: number;
  offsetX?: number;
  offsetY?: number;
}

interface CanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  ctx: React.MutableRefObject<CanvasRenderingContext2D | null>;
  color: string;
  tool: Tool;
  element: Element[];
  setElement: React.Dispatch<React.SetStateAction<Element[]>>;
  strokeWidth: number;
  canvasDivRef: React.RefObject<HTMLDivElement>;
  redrawElements: Function;
  prevImg: string;
}

const Canvas: React.FC<CanvasProps> = ({
  canvasRef,
  ctx,
  color,
  tool,
  element,
  setElement,
  strokeWidth,
  canvasDivRef,
  redrawElements,
  prevImg,
}) => {
  const generator = rough.generator();
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentElement, setCurrentElement] = useState<Element | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.log("Can't render");
      return;
    }

    const sizeWidth = (81 * window.innerWidth) / 100;
    const sizeHeight = (75 * window.innerHeight) / 100;
    canvas.width = sizeWidth;
    canvas.height = sizeHeight;

    const context = canvas.getContext("2d");
    if (context) {
      ctx.current = context;
      ctx.current.lineCap = "round";
      ctx.current.strokeStyle = color;
      ctx.current.lineWidth = strokeWidth;
    }
  }, [canvasRef]);

  useEffect(() => {
    if (ctx.current) {
      ctx.current.strokeStyle = color;
      ctx.current.lineWidth = strokeWidth;
    }
  }, [color, strokeWidth]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const { offsetX, offsetY } = e.nativeEvent;
    setIsDrawing(true);

    if (tool === "pencil") {
      const newElement: Element = {
        tool,
        offsetX,
        offsetY,
        stroke: color,
        strokeWidth,
        path: [[offsetX, offsetY]],
      };
      setElement((prevElements) => [...prevElements, newElement]);
      setCurrentElement(newElement);
    } else if (tool === "line" || tool === "rectangle") {
      const newElement: Element = {
        tool,
        x1: offsetX,
        y1: offsetY,
        stroke: color,
        strokeWidth,
      };
      setElement((prevElements) => [...prevElements, newElement]);
      setCurrentElement(newElement);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDrawing || !currentElement) return;

    const { offsetX, offsetY } = e.nativeEvent;
    let updatedElement = currentElement;

    if (tool === "pencil") {
      const newPath = [...(updatedElement.path || []), [offsetX, offsetY]];
      updatedElement = { ...updatedElement, path: newPath };
      setCurrentElement(updatedElement);
      setElement((prevElements) =>
        prevElements.map((elem, index) =>
          index === element.length - 1 ? updatedElement : elem
        )
      );
    } else if (tool === "line" || tool === "rectangle") {
      updatedElement = {
        ...updatedElement,
        width: offsetX,
        height: offsetY,
      };
      setCurrentElement(updatedElement);
      setElement((prevElements) =>
        prevElements.map((elem, index) =>
          index === element.length - 1 ? updatedElement : elem
        )
      );
    }

    // // Clear and redraw the canvas with all elements including the in-progress one

    // redrawElements();
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    setCurrentElement(null); // Clear the in-progress element after it's finalized
  };

  useLayoutEffect(() => {
    ctx.current?.clearRect(
      0,
      0,
      canvasRef.current?.width || 0,
      canvasRef.current?.height || 0
    );
    redrawElements();
    const img = new Image();
    img.src = prevImg;
    img.onload = () => {
      ctx.current?.drawImage(img, 0, 0);
    };
  }, [element]);

  useLayoutEffect(() => {
    const img = new Image();
    img.src = prevImg;
    img.onload = () => {
      ctx.current?.clearRect(
        0,
        0,
        canvasRef.current?.width || 0,
        canvasRef.current?.height || 0
      );
      ctx.current?.drawImage(img, 0, 0);
      redrawElements();
    };
  }, [prevImg]);

  return (
    <div
      className="flex justify-center h-[77vh] w-[82vw] border-primary border-4 rounded-md m-2 mb-10"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div
        className="flex justify-center pt-0.5 h-[75vh] w-[81vw]"
        ref={canvasDivRef}
      >
        <canvas ref={canvasRef} id="canvas" />
      </div>
    </div>
  );
};

export default Canvas;
