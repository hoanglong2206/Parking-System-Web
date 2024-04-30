const dotenv = require("dotenv");
const app = require("./app");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);

dotenv.config({
  path: ".env",
});

const port = process.env.PORT || 5001;
const DB = process.env.DATABASE_LOCAL;

mongoose.connect(DB).then(() => {
  console.log("DB connection successful");
});

const socketIo = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

socketIo.on("connection", (socket) => {
  console.log("New client connected" + socket.id);

  socket.on("get-users", (data) => {
    socket.join(data.id);
    socket.to(data.id).emit("get-users", data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
