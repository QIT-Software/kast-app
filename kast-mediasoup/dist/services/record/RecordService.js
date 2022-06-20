"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const IRecordSevice_1 = __importDefault(require("./IRecordSevice"));
const Worker_1 = __importDefault(require("../../mediasoup/Worker"));
const Router_1 = __importDefault(require("../../mediasoup/Router"));
const Consumer_1 = __importDefault(require("../../mediasoup/Consumer"));
const FileSystemUtils_1 = require("../../utils/FileSystemUtils");
const ffmpeg_static_1 = __importDefault(require("ffmpeg-static"));
const ILogger_1 = __importDefault(require("../../utils/ILogger"));
class RecordService extends IRecordSevice_1.default {
    constructor(recordingsDirectory) {
        super();
        this.recordingsDirectory = recordingsDirectory;
        this.processes = new Map();
        this.configDirectory = `${FileSystemUtils_1.getProjectRoot()}/config`;
    }
    async startRecording(roomId, recordId, audio) {
        const process = require('child_process');
        this.processes.set(roomId, process);
        let recResolve;
        const promise = new Promise((res) => {
            recResolve = res;
        });
        const video = true;
        const h264 = true;
        const exit = false;
        let cmdInputPath = `${this.configDirectory}/input-h264.sdp`;
        let cmdOutputPath = `${this.recordingsDirectory}/output-ffmpeg-vp8.mp4`;
        let cmdCodec = '';
        let cmdFormat = '-f avi -flags +global_header';
        if (audio) {
            cmdCodec += ' -map 0:a:0 -c:a aac';
        }
        if (video) {
            cmdCodec += ' -map 0:v:0 -c:v copy';
            if (h264) {
                cmdInputPath = `${this.configDirectory}/input-h264.sdp`;
                cmdOutputPath = `${this.recordingsDirectory}/${recordId}`;
                cmdFormat = '-f mp4 -strict experimental';
            }
        }
        const cmdArgStr = [
            '-nostdin',
            '-protocol_whitelist file,rtp,udp',
            '-fflags +genpts',
            '-use_wallclock_as_timestamps 1',
            `-i ${cmdInputPath}`,
            cmdCodec,
            cmdFormat,
            `-y ${cmdOutputPath}`,
        ]
            .join(' ')
            .trim();
        const recProcess = process.spawn(ffmpeg_static_1.default, cmdArgStr.split(/\s+/));
        this.processes.set(roomId, recProcess);
        recProcess.stderr.on('data', (chunk) => {
            chunk
                .toString()
                .split(/\r?\n/g)
                .filter(Boolean)
                .forEach((line) => {
                console.log(line);
                if (line.startsWith('ffmpeg version')) {
                    setTimeout(() => {
                        recResolve();
                    }, 1000);
                }
            });
        });
        await recResolve;
        console.log(`Start recording roomID: ${roomId}.Audio Producer Id: ${audio}`);
        return true;
    }
    async stopRecording(roomId) {
        const process = this.processes.get(roomId);
        if (!process) {
            return false;
        }
        process.kill('SIGINT');
        console.log(`Stop recording roomID: ${roomId}.Process PID:: ${process.pid}`);
        return true;
    }
}
exports.default = RecordService;
//# sourceMappingURL=RecordService.js.map