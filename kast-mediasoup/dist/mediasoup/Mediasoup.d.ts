import IMediasoup from './IMediasoup';
import Worker from './Worker';
import MediasoupConfig from 'mediasoup/MediasoupConfig';
import IMediasoupInternal from 'mediasoup/IMediasoupInternal';
import { Filter } from 'mediasoup/Utils';
import WorkerConfig from 'mediasoup/WorkerConfig';
import Router from 'mediasoup/Router';
import Transport from 'mediasoup/Transport';
export default class Mediasoup extends IMediasoup implements IMediasoupInternal {
    private readonly config;
    private readonly workers;
    constructor(config: MediasoupConfig);
    createRouter(appData: Filter): Promise<Router>;
    private findBestWorker;
    createWorker(config: WorkerConfig): Promise<Worker>;
    findRouter(filter: Filter): Router | undefined;
    findWorker(roomId: string): Worker | undefined;
    getConfig(): MediasoupConfig;
    getArray(): Worker[];
    closeRouter(router: Router): void;
    removeTransport(roomId: string, transport: Transport): void;
}
