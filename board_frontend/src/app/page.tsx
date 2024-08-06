"use client";
import { useState, useEffect } from "react";

import { v4 as uuidv4 } from "uuid";
import Hero from "@/components/Hero";
import NavBar from "@/components/NavBar";
import { socket } from "../lib/socket";

export default function Home() {
  //setting up for socket io connection
  const [isJoined, setIsJoined] = useState(false);
  const [user, setUser] = useState({
    roomId: null,
    userId: null,
    userName: null,
    host: undefined,
    meetingTitle: null,
    presenter: undefined,
  });

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
        <Hero
          isJoined={isJoined}
          uuidv4={uuidv4}
          setIsJoined={setIsJoined}
          setUser={setUser}
          socket={socket}
        />
      </div>
    </>
  );
}
