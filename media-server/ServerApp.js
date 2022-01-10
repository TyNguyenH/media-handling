const fs = require("fs");
const path = require("path");

const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const Constants = require("./utils/Constants");
const Helpers = require("./utils/Helpers");


const readFileOptions = { encoding: "utf8", flag: "r" };
const MEDIA_RAW_KEYS_FOLDER = path.join(__dirname, "../media-raw-keys");

const keyIdAudio = fs.readFileSync(path.join(MEDIA_RAW_KEYS_FOLDER, "keyIdAudio.txt"), readFileOptions);
const keyIdSD = fs.readFileSync(path.join(MEDIA_RAW_KEYS_FOLDER, "keyIdSD.txt"), readFileOptions);
const keyIdHD = fs.readFileSync(path.join(MEDIA_RAW_KEYS_FOLDER, "keyIdHD.txt"), readFileOptions);

const keyAudio = fs.readFileSync(path.join(MEDIA_RAW_KEYS_FOLDER, "keyAudio.txt"), readFileOptions);
const keySD = fs.readFileSync(path.join(MEDIA_RAW_KEYS_FOLDER, "keySD.txt"), readFileOptions);
const keyHD = fs.readFileSync(path.join(MEDIA_RAW_KEYS_FOLDER, "keyHD.txt"), readFileOptions);

const ServerApp = express();

const limiter = rateLimit({
	windowMs: 1 * 60 * 1000,
	max: 500,
	standardHeaders: true,
	legacyHeaders: false,
});

const corsOptions = {
    origin: Constants.originWhiteList,
    optionsSuccessStatus: 200,
    methods: ["GET", "POST", "OPTIONS"]
}

ServerApp.disable("x-powered-by");
ServerApp.use(limiter);
ServerApp.use(cors(corsOptions));
ServerApp.use(helmet());
ServerApp.use(express.urlencoded({ extended: true }));
ServerApp.use(express.json());

const MEDIA_ENCRYPT = path.join(__dirname, "../media-encrypt");
ServerApp.use(express.static(MEDIA_ENCRYPT));

ServerApp.get("/", (req, res) => {
    res.send("<h1>Online</h1>");
});

ServerApp.get("/DRM/ClearKey", (req, res) => {
    const authorization = req.headers["authorization"];
    jwt.verify(authorization, process.env.ACCESS_TOKEN_SECRET, (err) => {
        if (err) {
            res.status(403).send({
                message: err.message
            })
        } else {
            res.send({
                drm: {
                    keyIdAudio,
                    keyAudio,
                    keyIdSD,
                    keySD,
                    keyIdHD,
                    keyHD
                }
            })
        }
    })
});

ServerApp.post("/auth", (req, res) => {
    const password = req.body.password;
    if (password === "password123") {
        const accessToken = jwt.sign(
            { password },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: Constants.JWTexpireTime }
        );

        res.send({
            message: "Success",
            accessToken
        })
    } else {
        res.send({
            message: "Failed"
        })
    }
});


module.exports = ServerApp;