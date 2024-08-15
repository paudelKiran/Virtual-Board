"use client";
import Board from "@/components/Board";
import NavBar from "@/components/NavBar";
import React from "react";
import { useBoardContext } from "@/context/myContext";
import { useRouter } from "next/navigation";

const page = ({ params }: any) => {
  const { user } = useBoardContext();
  const router = useRouter();
  const handleGoBack = (e: any) => {
    router.push("/");
  };
  return (
    <>
      {user[0] ? (
        <>
          <NavBar isActive={true} meetingId={params.meetingId} />
          <Board />
        </>
      ) : (
        <div className="h-full w-full flex items-center justify-center flex-col space-y-6 text-col3">
          <div className="flex flex-col items-center">
            <h1 className="text-5xl">Sorry! We couldn't connect you.</h1>
            <p className="texl-2xl">Please, go back and rejoin.</p>
          </div>
          <button
            className=" bg-secondary hover:bg-col5 text-white font-bold py-[1px] px-4 rounded focus:outline-none focus:shadow-outline h-9"
            type="button"
            onClick={handleGoBack}
          >
            Go Back
          </button>
        </div>
      )}
    </>
  );
};

export default page;
