/* eslint-disable no-console,class-methods-use-this */
import ILogger from 'utils/ILogger';
import Router from 'mediasoup/Router';
import WebRtcTransport from 'mediasoup/WebRtcTransport';
import Producer from 'mediasoup/Producer';

export default class Logger extends ILogger {
  logRouterCreated(router: Router) {
    console.log('Router created: ', Logger.stringifyRouter(router));
  }

  logWebRtcTransportCreated(transport: WebRtcTransport, router: Router) {
    console.log(
      JSON.stringify({routerId: router.id}),
      'Transport created:',
      Logger.stringifyWebRtcTransport(transport),
    );
  }

  logWebRtcTransportRemoved(transport: WebRtcTransport, router: Router) {
    console.log(
      JSON.stringify({routerId: router.id}),
      'Transport removed:',
      Logger.stringifyWebRtcTransport(transport),
    );
  }

  logProducerCreated(producer: Producer, transport: WebRtcTransport, router: Router) {
    console.log(
      JSON.stringify({
        routerId: router.id,
        transportId: transport.id,
      }),
      'Producer created:',
      Logger.stringifyProducer(producer),
    );
  }

  routerLog(message: string, info: string) {
    console.log(`${message} ${info}`);
  }

  consumerLog(message: string, info: string) {
    console.log(`${message} ${info}`);
  }

  transportLog(message: string, info: string) {
    console.log(`${message} ${info}`);
  }

  recordLog(message: string, roomId: string, audioMessage?: string, audio?: unknown) {
    console.log(`${message} ${roomId} ${audioMessage} ${audio}`);
  }

  private static stringifyRouter(router: Router) {
    return `Router ${JSON.stringify({id: router.id, roomId: router.roomId})}`;
  }

  private static stringifyWebRtcTransport(transport: WebRtcTransport) {
    return `Transport ${JSON.stringify({
      roomId: transport.roomId,
      userId: transport.userId,
      direction: transport.direction,
      clientId: transport.clientId,
    })}`;
  }

  private static stringifyProducer(producer: Producer) {
    return `Producer ${JSON.stringify({
      kind: producer.kind,
      roomId: producer.roomId,
      clientId: producer.clientId,
      userId: producer.userId,
      mediaType: producer.mediaType,
    })}`;
  }
}
