"use client";
import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { v4 as uuidv4 } from "uuid";
import { socket } from "../lib/socket";
import { UserType } from "@/types/declaration";

// Define the structure for the user object

// Define the context type
type MyContextType = {
  user: UserType[];
  isJoined: boolean;
  uuidv4: () => string;
  socket: any;
  setIsJoined: Dispatch<SetStateAction<boolean>>;
  setUser: Dispatch<React.SetStateAction<UserType[]>>;
};

// Provide a non-null initial value
const BoardContext = createContext<MyContextType>({
  user: [],
  isJoined: false,
  uuidv4,
  socket,
  setIsJoined: () => {},
  setUser: () => {},
});

export const BoardProvider = ({ children }: { children: React.ReactNode }) => {
  const [isJoined, setIsJoined] = useState(false);
  const [user, setUser] = useState<UserType[]>([]);

  return (
    <BoardContext.Provider
      value={{ user, isJoined, uuidv4, socket, setIsJoined, setUser }}
    >
      {children}
    </BoardContext.Provider>
  );
};

export const useBoardContext = () => {
  const context = useContext(BoardContext);

  if (!context) {
    throw new Error("useBoardContext must be used within a BoardProvider");
  }

  return context;
};