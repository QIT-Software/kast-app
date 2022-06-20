import ILogger from 'utils/ILogger';
import Router from 'mediasoup/Router';
import WebRtcTransport from 'mediasoup/WebRtcTransport';
import Producer from 'mediasoup/Producer';
export default class Logger extends ILogger {
    logRouterCreated(router: Router): void;
    logWebRtcTransportCreated(transport: WebRtcTransport, router: Router): void;
    logWebRtcTransportRemoved(transport: WebRtcTransport, router: Router): void;
    logProducerCreated(producer: Producer, transport: WebRtcTransport, router: Router): void;
    routerLog(message: string, info: string): void;
    consumerLog(message: string, info: string): void;
    transportLog(message: string, info: string): void;
    recordLog(message: string, roomId: string, audioMessage?: string, audio?: unknown): void;
    private static stringifyRouter;
    private static stringifyWebRtcTransport;
    private static stringifyProducer;
}
