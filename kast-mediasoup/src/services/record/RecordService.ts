/* eslint-disable global-require,@typescript-eslint/no-unused-vars,no-console,@typescript-eslint/ban-ts-ignore */
import IRecordService from 'services/record/IRecordSevice';
import Worker from 'mediasoup/Worker';
import Router from 'mediasoup/Router';
import Consumer from 'mediasoup/Consumer';
import {RtpParameters} from 'mediasoup/lib/RtpParameters';
import {ChildProcess} from 'child_process';
import {getProjectRoot} from 'utils/FileSystemUtils';
import ffmpegPath from 'ffmpeg-static';
import ILogger from 'utils/ILogger';

export default class RecordService extends IRecordService {
  private readonly processes: Map<string, ChildProcess> = new Map();

  private readonly configDirectory: string;

  constructor(private readonly recordingsDirectory: string) {
    super();
    this.configDirectory = `${getProjectRoot()}/config`;
  }

  async startRecording(roomId: string, recordId: string, audio: boolean) {
    const process = require('child_process');
    this.processes.set(roomId, process);
    // @ts-ignore
    let recResolve;
    const promise = new Promise((res) => {
      recResolve = res;
    });
    const video = true;
    const h264 = true;
    const exit = false;
    // TODO set vp8
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
      // "-loglevel debug",
      // "-analyzeduration 5M",
      // "-probesize 5M",
      '-fflags +genpts',
      '-use_wallclock_as_timestamps 1',
      `-i ${cmdInputPath}`,
      cmdCodec,
      cmdFormat,
      `-y ${cmdOutputPath}`,
    ]
      .join(' ')
      .trim();

    const recProcess = process.spawn(ffmpegPath, cmdArgStr.split(/\s+/));
    this.processes.set(roomId, recProcess);
    // @ts-ignore
    recProcess.stderr.on('data', (chunk) => {
      chunk
        .toString()
        .split(/\r?\n/g)
        .filter(Boolean)
        // @ts-ignore
        .forEach((line) => {
          console.log(line);
          if (line.startsWith('ffmpeg version')) {
            setTimeout(() => {
              // @ts-ignore
              recResolve();
            }, 1000);
          }
        });
    });
    await recResolve;
    console.log(`Start recording roomID: ${roomId}.Audio Producer Id: ${audio}`);
    return true;
  }

  async stopRecording(roomId: string) {
    const process = this.processes.get(roomId);
    if (!process) {
      return false;
    }
    process.kill('SIGINT');
    console.log(`Stop recording roomID: ${roomId}.Process PID:: ${process.pid}`);
    return true;
  }
}
