const express = require("express");
const { Server } = require("socket.io");
const { createServer } = require("http");
const {
  findRoom,
  createRoom,
  roomDisclose,
  userJoin,
  userLeave,
  getUsersInRoom,
} = require("./utils/user");
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});
const port = 9000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

io.on("connection", (socket) => {
  // console.log("Ommm chin tabak dam dam");
  let imageGlobal, roomIdGlobal;

  //? data requested from create room
  socket.on("createRoomData", (data, callback) => {
    const { roomId, userName } = data;
    roomIdGlobal = roomId;
    data.socketId = socket.id;
    const roomUsers = userJoin(data);
    createRoom(roomId);
    socket.join(roomId);

    if (roomUsers) {
      callback({ success: true, message: `Meeting has been created.` });
      io.to(roomId).emit("allUsers", roomUsers);
    } else {
      callback({ success: false, message: `Error creating a meeting.` });
    }
  });

  //? data requested from join room
  socket.on("joinRoomData", (data, callback) => {
    const { roomId } = data;
    data.socketId = socket.id;
    const doRoomExist = findRoom(roomId);
    //doRoomExist gets room id if exits else undefined
    if (doRoomExist) {
      const roomUsers = userJoin(data);
      socket.join(roomId);

      io.to(roomId).emit("allUsers", roomUsers);
      callback({
        success: true,
        message: "Successfully joined to the room.",
      });
    } else {
      callback({
        success: false,
        message: "No room with such ID is currently created.",
      });
    }
  });

  //? data sent from whiteboard
  socket.on("boardData", (data) => {
    imageGlobal = data;
    socket.broadcast.to(roomIdGlobal).emit("boardResponse", {
      imageUrl: imageGlobal,
    });
  });

  //for disconnection
  socket.on("disconnect", () => {
    const userLeft = userLeave(socket.id);
    console.log(userLeft);

    if (userLeft) {
      console.log(userLeft);
      const usersInRoom = getUsersInRoom(userLeft.roomId);
      socket.broadcast.to(userLeft.roomId).emit("userLeft", {
        message: `${userLeft.userName} left the room.`,
      });
      socket.broadcast.to(userLeft.roomId).emit("allUsers", usersInRoom);
    }
  });
});

server.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
