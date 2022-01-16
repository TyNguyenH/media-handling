const Constants = require("./utils/Constants");
const { exec } = require("child_process");

let sourceVideoPath = "";
let destinationVideoPath = "";
let resolution = "";
let minBitRate = "";
let maxBitRate = "";
let level = "";

for (const arg of process.argv) {
    if (arg.includes("--src=")) {
        sourceVideoPath = arg.slice(arg.indexOf("=") + 1);
        if (sourceVideoPath.indexOf(".mp4") === -1) {
            sourceVideoPath += ".mp4";
        }
    }
    if (arg.includes("--dest=")) {
        destinationVideoPath = arg.slice(arg.indexOf("=") + 1);
        if (destinationVideoPath.indexOf(".mp4") === -1) {
            destinationVideoPath += ".mp4";
        }
    }
    if (arg.includes("--res=")) {
        resolution = arg.slice(arg.indexOf("=") + 1);
        if (resolution === "480p") {
            minBitRate = Constants.H264.res_480p.minBitRate;
            maxBitRate = Constants.H264.res_480p.maxBitRate;
            level = Constants.H264.res_480p.level;
        }
        if (resolution === "720p") {
            minBitRate = Constants.H264.res_720p.minBitRate;
            maxBitRate = Constants.H264.res_720p.maxBitRate;
            level = Constants.H264.res_720p.level;
        }
    }
}

const encodeVideoCommand = `ffmpeg -i ${sourceVideoPath} -c:a copy \
                        -vf "scale=-2:480" \
                        -c:v libx264 -profile:v main -level:v ${level} \
                        -x264-params scenecut=0:open_gop=0:min-keyint=72:keyint=72 \
                        -minrate ${minBitRate} -maxrate ${maxBitRate} -bufsize ${maxBitRate} -b:v ${maxBitRate} \
                        -y ${destinationVideoPath}`;

exec(encodeVideoCommand, (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }

    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }

    console.log(`stdout: ${stdout}`);
});