import Board from "@/components/Board";
import NavBar from "@/components/NavBar";
import React from "react";

const page = ({ params }: any) => {
  return (
    <>
      <NavBar noUsers={3} isActive={true} meetingId={params.meetingId} />
      <Board />
    </>
  );
};

export default page;
