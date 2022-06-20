import Router from 'mediasoup/Router';
import WebRtcTransport from 'mediasoup/WebRtcTransport';
import Producer from 'mediasoup/Producer';
export default abstract class Logger {
    abstract logRouterCreated(router: Router): void;
    abstract logWebRtcTransportCreated(transport: WebRtcTransport, router: Router): void;
    abstract logWebRtcTransportRemoved(transport: WebRtcTransport, router: Router): void;
    abstract logProducerCreated(producer: Producer, transport: WebRtcTransport, router: Router): void;
    abstract routerLog(message: string, info: string): void;
    abstract consumerLog(message: string, info: string): void;
    abstract recordLog(message: string, roomId: string, audioMessage?: string, audio?: unknown): void;
}
