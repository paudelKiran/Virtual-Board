const express = require("express");
const { Server } = require("socket.io");
const { createServer } = require("http");
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
  socket.on("createRoomData", (data) => {
    const { roomId, userId, userName, host, meetingTitle, presenter } = data;
    socket.join(roomId);
    roomIdGlobal = roomId;
    socket.emit("roomCreated", { success: true });
    console.log("create triggered");
  });

  //? data requested from join room
  socket.on("joinRoomData", (data) => {
    const { roomId, userId, userName, host, presenter } = data;
    socket.join(roomId);
    socket.emit("roomJoined", { success: true });
    socket.broadcast.to(roomId).emit("boardResponse", {
      imageUrl: imageGlobal,
    });
    console.log("join triggered");
  });

  //? data sent from whiteboard
  socket.on("boardData", (data) => {
    imageGlobal = data;
    socket.broadcast.to(roomIdGlobal).emit("boardResponse", {
      imageUrl: imageGlobal,
    });
  });
});

server.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
