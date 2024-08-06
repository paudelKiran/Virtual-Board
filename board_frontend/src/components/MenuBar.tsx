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

export function MenuBar({
  tool,
  setTool,
}: {
  tool: string;
  setTool: Function;
}) {
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
        <MenubarTrigger onClick={handleSelectTool}>
          <SvgImage
            fileName={`${active ? active : "line"}`}
            extraClass={`${active ? "active" : ""}`}
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
        <MenubarTrigger>Tool</MenubarTrigger>
        <MenubarContent side="right" className="menuContent">
          <MenubarItem>Pencil</MenubarItem>
          <Separator orientation="vertical" />
          <MenubarItem>Line</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
