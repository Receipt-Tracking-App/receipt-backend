const express = require("express");
const morgan = require("morgan");
const authRoutes = require("./routes/auth");

const server = express();

server.use(express.json());
server.use(morgan("dev"));

server.use("/api/auth", authRoutes);

module.exports = server;
