const fs = require("fs");
const http = require("http");
const ServerApp = require("./ServerApp");
require("dotenv").config();


const httpServer = http.createServer(ServerApp);
httpServer.listen(process.env.HOST_PORT);