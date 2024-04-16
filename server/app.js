const morgan = require("morgan");
const helmet = require("helmet");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();

const userRoute = require("./routes/user");

app.use(morgan("dev"));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, _res, next) {
  const url = req.url;
  const method = req.method;
  console.log(`URL: ${url}`);
  console.log(`Method: ${method}`);

  next();
});

app.use("/api/user", userRoute);

module.exports = app;
