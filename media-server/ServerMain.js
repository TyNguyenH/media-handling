const https = require("https");
const fs = require("fs");
const ServerApp = require("./ServerApp");
require("dotenv").config();

const keyPem = fs.existsSync("./key.pem") ? fs.readFileSync("./key.pem") : fs.readFileSync("./server.key");
const certPem = fs.existsSync("./cert.pem") ? fs.readFileSync("./cert.pem") : fs.readFileSync("./server.cert");

// Initialize https server
const httpsServer = https.createServer({
    key: keyPem,
    cert: certPem
}, ServerApp);

// Server listens
httpsServer.listen(process.env.HOST_PORT, () => {
    console.log(`Running on port: ${process.env.HOST_PORT}`);
});