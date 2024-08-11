const express = require("express");
const { Server } = require("socket.io");
const { createServer } = require("http");
const { userJoin, userLeave, getUsersInRoom } = require("./utils/user");
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
  socket.on("createRoomData", async (data) => {
    // const sockets = await io.fetchSockets();
    console.log(socket.rooms, " create");
    const { roomId, userName } = data;
    roomIdGlobal = roomId;
    const user = userJoin(data);
    socket.join(roomId);
    if (user) {
      socket.broadcast.to(roomId).emit("roomCreated", {
        success: true,
        message: `${userName} has joined`,
      });
    }
    console.log("create triggered");
  });

  //? data requested from join room
  socket.on("joinRoomData", (data) => {
    console.log(socket.rooms, " join");
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
