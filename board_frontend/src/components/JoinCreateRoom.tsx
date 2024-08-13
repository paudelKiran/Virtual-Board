"use client";
import { useState } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useBoardContext } from "@/context/myContext";
import { UserType } from "@/types/declaration";
import { toast } from "react-toastify";
import CopyButton from "./CopyButton";

const FormSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
});

export function JoinCreateRoom() {
  const { socket, user, setUser, uuidv4 } = useBoardContext();
  //starting with some constants
  const router = useRouter();
  const [roomId, setRoomId] = useState(uuidv4());

  const handleCreateRoom = (e: any) => {
    //usernameCreate,meetingTitle
    e.preventDefault();
    const username = document.getElementById(
      "usernameCreate"
    ) as HTMLInputElement;
    const meetingTitle = document.getElementById(
      "meetingTitle"
    ) as HTMLInputElement;
    let usernameVal = username.value;
    // let meetingTitleVal = meetingTitle.value;
    let userDet: UserType = {
      roomId: roomId,
      userId: uuidv4(),
      userName: usernameVal,
      host: true,
      presenter: true,
    };
    setUser([userDet]);
    username.value = "";
    meetingTitle.value = "";
    socket.emit("createRoomData", userDet, function (response: any) {
      if (response.success) {
        router.push(`/meeting/${roomId}`);
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    });
  };

  const handleJoinRoom = (e: any) => {
    //usernameJoin, meetingId
    e.preventDefault();
    const username = document.getElementById(
      "usernameJoin"
    ) as HTMLInputElement;
    const meetingId = document.getElementById(
      "meetingIdJoin"
    ) as HTMLInputElement;
    let usernameVal = username.value;
    let meetingIdVal = meetingId.value;
    let userDet = {
      roomId: meetingIdVal,
      userId: uuidv4(),
      userName: usernameVal,
      host: false,
      presenter: false,
    };
    setUser([userDet]);
    socket.emit("joinRoomData", userDet, function (response: any) {
      if (response.success) {
        router.push(`/meeting/${roomId}`);
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    });
  };

  return (
    <div className="w-full h-[70vh] flex flex-row justify-evenly mt-5">
      {/* create room form */}
      <div className=" w-2/5 h-full justify-center flex items-center">
        <form
          className="bg-yellow-50 shadow-md rounded px-8 pt-6 pb-8 h-full w-full"
          onSubmit={(e) => handleCreateRoom(e)}
        >
          <h1 className="text-5xl font-bold mb-5">Create Room</h1>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Join as
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="usernameCreate"
              type="text"
              placeholder="Your name"
              required
              minLength={3}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Meeting Title
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="meetingTitle"
              type="text"
              placeholder="Minimum 3 characters"
              required
              minLength={3}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Meeting ID
            </label>
            <div className="flex space-x-1">
              <input
                className="shadow appearance-none border rounded w-[90%] py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="meetingId"
                type="text"
                readOnly={true}
                value={roomId}
              />
              <CopyButton text={roomId} />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-[0.5px] px-4 rounded focus:outline-none focus:shadow-outline h-8"
              type="submit"
            >
              Create room
            </button>
          </div>
        </form>
      </div>

      {/* join room form  */}
      <div className=" w-2/5 h-full justify-center flex items-center">
        <form
          className="bg-yellow-50 shadow-inner rounded px-8 pt-6 pb-8 h-full w-full"
          onSubmit={handleJoinRoom}
        >
          <h1 className="text-5xl font-bold mb-5">Join Room</h1>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Join as
            </label>
            <input
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="usernameJoin"
              type="text"
              placeholder="Your name"
              minLength={3}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Meeting ID
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="meetingIdJoin"
              type="text"
              placeholder=".."
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-[0.5px] px-4 rounded focus:outline-none focus:shadow-outline h-8"
              type="submit"
            >
              Join room
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default JoinCreateRoom;
