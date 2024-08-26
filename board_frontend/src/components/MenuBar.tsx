"use client";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Separator } from "./ui/separator";
import SvgImage from "./SvgImage";
import { useState } from "react";
import { useBoardContext } from "@/context/myContext";
import { Slider } from "@/components/ui/slider";

export function MenuBar() {
  const { color, setColor, tool, setTool, strokeWidth, setStrokeWidth } =
    useBoardContext();
  const [active, setActive] = useState("pencil");

  const handleSvgClick = (e: any, id: string) => {
    setTool(id);
    setActive(id);
    console.log(tool);
  };
  const handleSelectTool = (e: any) => {};
  return (
    <Menubar className="border-none rounded-[2px] p-0 h-fit">
      <MenubarMenu>
        <MenubarTrigger
          onClick={handleSelectTool}
          className={`${active ? "active" : ""} p-0.5 m-3 rounded-xl `}
        >
          <SvgImage
            fileName={`${active ? active : "line"}`}
            extraClass={` scale-75 hover:bg-transparent`}
          />
        </MenubarTrigger>
        <MenubarContent side="right" className="menuContent">
          <MenubarItem>
            <SvgImage fileName="pencil" click={handleSvgClick} />
          </MenubarItem>
          <Separator orientation="vertical" />

          <MenubarItem>
            <SvgImage fileName="line" click={handleSvgClick} />
            {/* <MenubarShortcut>⌘T</MenubarShortcut> */}
          </MenubarItem>
          <Separator orientation="vertical" />
          <MenubarItem>
            <SvgImage fileName="circle" click={handleSvgClick} />
          </MenubarItem>
          <Separator orientation="vertical" />
          <MenubarItem>
            <SvgImage fileName="rectangle" click={handleSvgClick} />
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="h-8 w-8 p-0.5 m-3">
          <input
            type="color"
            value={color}
            onChange={(e) => {
              setColor(e.target.value);
            }}
          />
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="h-8 w-8 p-0.5 m-3">
          <svg height="32" width="32" xmlns="http://www.w3.org/2000/svg">
            <line
              x1="0"
              y1="16"
              x2="32"
              y2="16"
              strokeWidth={strokeWidth}
              stroke={color}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </MenubarTrigger>
        <MenubarContent side="right" className=" h-10 menuContent">
          <Slider
            name="stroke"
            defaultValue={[strokeWidth]}
            max={5}
            step={1}
            min={1}
            onValueCommit={(e) => {
              setStrokeWidth(e[0]);
            }}
          />
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
