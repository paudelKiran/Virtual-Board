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

const DrawerComp = () => {
  const { user, roomUsers, noUsers } = useBoardContext();
  console.log(user);
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
        <DrawerContent className="bg-secondary text-black right-0 top-0 w-[50vw] md:w-[30vw] h-screen mt-0">
          <DrawerHeader>
            <DrawerTitle className="mt-0 p-0 text-center">
              Participants
            </DrawerTitle>
            {/* <DrawerDescription>This action cannot be undone.</DrawerDescription> */}
          </DrawerHeader>
          <DrawerDescription className="m-1 space-y-1">
            {roomUsers?.map((roomUser: any) => (
              <p
                key={roomUser.userName}
                className="bg-green-200 px-2 pl-4 text-lg rounded-[4px] hover:bg-yellow-50"
              >
                {roomUser.userName}
                {`${roomUser.userId === user[0].userId ? " (You) " : ""}`}
                {`${roomUser.host === true ? " (Host) " : ""}`}
              </p>
            ))}
          </DrawerDescription>
          <DrawerFooter className="justify-center">
            <DrawerClose className="w-fit py-1 px-4 border-2 h-fit hover:bg-yellow-50 rounded-[3.5px]">
              Back
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DrawerComp;
