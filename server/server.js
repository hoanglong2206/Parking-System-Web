const dotenv = require("dotenv");
const app = require("./app");
const mongoose = require("mongoose");
const http = require("http");
// const { Server } = require("socket.io");

dotenv.config({
  path: ".env",
});

const port = process.env.PORT || 5001;
// const DB = process.env.DATABASE_LOCAL;
const DB = process.env.DATABASE_CLOUD.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

const server = http.createServer(app);

mongoose.connect(DB).then(() => {
  console.log("DB connection successful");
});

// const socketIo = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173",
//     credentials: true,
//   },
// });

// socketIo.on("connection", (socket) => {
//   console.log("New client connected" + socket.id);

//   socket.on("sendData", (data) => {
//     console.log(data);
//     socketIo.emit("receiveData", data);
//   });

//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//   });
// });

server.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
