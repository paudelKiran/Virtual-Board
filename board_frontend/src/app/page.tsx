"use client";
import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import NavBar from "@/components/NavBar";
import { useBoardContext } from "@/context/myContext";

export default function Home() {
  const { socket, setIsJoined, isJoined, setUser, uuidv4 } = useBoardContext();

  useEffect(() => {
    //room created response
    socket.on("roomCreated", (data: any) => {
      if (data.success) {
        setIsJoined(data.success);
        console.log("room created ommm", data.success);
      } else {
        console.log("chin tabak dam dam");
      }
    });

    //room joined response
    socket.on("roomJoined", (data: any) => {
      if (data.success) {
        setIsJoined(data.success);
        console.log("room joined ommm", data.success);
      } else {
        console.log("chin tabak dam dam");
      }
    });
  }, []);

  return (
    <>
      <NavBar noUsers={3} />
      <div>
        <Hero />
      </div>
    </>
  );
}
