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
  findUser,
  arraysEqual,
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
  let imgGlobal = [],
    roomIdGlobal;

  // socket.on("client-ready", () => {
  //   const user = findUser(socket.id);
  //   if (user) {
  //     console.log("getting ready", user.roomId);

  //     socket.broadcast.to(user.roomId).emit("getState", { success: true });
  //   }
  // });

  //? data requested from create room
  socket.on("createRoomData", (data, callback) => {
    const { roomId } = data;
    data.socketId = socket.id;
    const roomUsers = userJoin(data);
    createRoom(roomId);
    socket.join(roomId);
    // console.log(roomId, "create");

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
    // console.log(roomId, "join");
    // data.presenter = true;
    const doRoomExist = findRoom(roomId);
    //doRoomExist gets room id if exits else undefined
    if (doRoomExist) {
      socket.join(data.roomId);
      const roomUsers = userJoin(data);

      socket.broadcast.to(roomId).emit("userJoined", {
        success: true,
        message: `${data.userName} joined the the room.`,
      });

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
    const user = findUser(socket.id);
    // imgGlobal = data;
    if (user) {
      socket.broadcast.to(user.roomId).emit("boardResponse", {
        imgUrl: data,
      });
    }
  });

  //for disconnection
  socket.on("disconnect", () => {
    const userLeft = userLeave(socket.id);

    if (userLeft) {
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
