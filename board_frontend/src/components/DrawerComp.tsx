"use client";
import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import SvgImage from "./SvgImage";
import { useBoardContext } from "@/context/myContext";
import { Key } from "lucide-react";

const DrawerComp = () => {
  const { user, roomUsers, noUsers } = useBoardContext();
  return (
    <>
      <Drawer>
        <DrawerTrigger className="m-0 p-0">
          <SvgImage
            fileName="participants"
            extraClass="p-2 px-[9px]"
            text={String(noUsers)}
          />
        </DrawerTrigger>
        <DrawerContent className="bg-col4 text-col3 right-0 top-0 w-[50vw] md:w-[30vw] h-screen mt-0">
          <DrawerHeader>
            <DrawerTitle className="mt-0 p-0 text-center">
              Participants
            </DrawerTitle>
            {/* <DrawerDescription>This action cannot be undone.</DrawerDescription> */}
          </DrawerHeader>
          <DrawerDescription className="m-1 space-y-1">
            {roomUsers?.map((roomUser: any) => (
              <div
                key={roomUser.userName}
                className="bg-col4 hover:bg-hoverCol flex text-col3 px-2 pl-4 text-lg rounded-[4px] font-medium items-center justify-between"
              >
                <p>
                  {roomUser.userName}&nbsp;
                  <span className="text-col3">
                    {`${roomUser.userId === user[0].userId ? " (You) " : ""}`}
                    {`${roomUser.host === true ? " (Host) " : ""}`}
                  </span>
                </p>
                <SvgImage fileName="threeDot" extraClass="p-2 px-[9px]" />
              </div>
            ))}
          </DrawerDescription>
          <DrawerFooter className="justify-center">
            <DrawerClose className="w-fit bg-secondary hover:bg-col5 text-white font-bold py-[0.5px] px-4 rounded focus:outline-none focus:shadow-outline h-8">
              Back
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DrawerComp;
