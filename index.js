const server = require("./server");
const config = require("./config");
const PORT = config.port;

server.listen(PORT, () => {
  console.log(`--Server is on port ${PORT}--`);
});
