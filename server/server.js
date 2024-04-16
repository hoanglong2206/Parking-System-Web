const dotenv = require("dotenv");
const app = require("./app");
const mongoose = require("mongoose");
const http = require("http");

const server = http.createServer(app);

dotenv.config({
  path: ".env",
});

const port = process.env.PORT || 5001;
const DB = process.env.DATABASE_LOCAL;

mongoose.connect(DB).then(() => {
  console.log("DB connection successful");
});

server.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
