const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const authRoutes = require("./routes/auth");
const receiptRoutes = require("./routes/receipt");
const mainCategoryRoutes = require("./routes/mainCategory");
const swaggerDoc = require("./swaggerDoc");

const server = express();

server.use(cors());
server.use(express.json());
server.use(morgan("dev"));

swaggerDoc(server);

server.use("/api/auth", authRoutes);
server.use("/api/receipts", receiptRoutes);
server.use("/api/main-categories", mainCategoryRoutes);

module.exports = server;
