import { RefObject } from "react";

export type dataToCanvas={  
    canvasRef:RefObject<HTMLCanvasElement>;
    ctx:any;
    color:string;
    tool:string;
    element: any;
    setElement:Function
}