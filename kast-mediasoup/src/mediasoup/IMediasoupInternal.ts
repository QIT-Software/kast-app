import MediasoupConfig from 'mediasoup/MediasoupConfig';
import Transport from 'mediasoup/Transport';

export default interface IMediasoupInternal {
  getConfig(): MediasoupConfig;
  removeTransport(roomId: string, transport: Transport): void;
}
