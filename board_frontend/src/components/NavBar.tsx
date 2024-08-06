import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Separator } from "./ui/separator";

const NavBar = ({
  noUsers,
  isActive,
}: {
  noUsers: number;
  isActive?: boolean;
}) => {
  return (
    <>
      <div className="flex w-screen flex-col bg-yellow-50 h-fit py-2 px-5">
        <div className="flex flex-row px-5 justify-between items-center">
          <h1 className=" text-2xl font-extrabold font-serif">GoBoard</h1>

          <div className="flex">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
        {/* <hr className="h-[1px] my-1 bg-black" /> */}
        <Separator className={`${isActive ? "" : "hidden"} my-1`} />
        <div
          className={`flex h-fit ${
            isActive ? "" : "hidden"
          } my-1 justify-between px-5`}
        >
          <div className="flex space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="hover:bg-secondary hover:cursor-pointer flex py-0.5 h-fit p-1 rounded-[2px] justify-center items-center">
                    <img
                      src="/icons/undo.svg"
                      alt="Undo"
                      className="w-6 p-0 m-0"
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Undo</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {/* redo */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="hover:bg-secondary hover:cursor-pointer flex py-0.5 h-fit p-1 rounded-[2px] justify-center items-center">
                    <img
                      src="/icons/redo.svg"
                      alt="Redo"
                      className="w-6 p-0 m-0"
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Redo</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Separator className=" mx-4" orientation="vertical" />
            <Button className="py-1 px-2  h-fit hover:bg-secondary rounded-[3.5px]">
              Clear board
            </Button>
          </div>
          <div className="flex justify-self-end ">
            <h1>Connected Users :&nbsp;</h1>
            <h1>{noUsers}</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
