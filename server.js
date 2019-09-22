const express = require("express");
const morgan = require("morgan");
const authRoutes = require("./routes/auth");
const swaggerDoc = require("./swaggerDoc");

const server = express();

server.use(express.json());
server.use(morgan("dev"));

swaggerDoc(server);

server.use("/api/auth", authRoutes);

module.exports = server;
