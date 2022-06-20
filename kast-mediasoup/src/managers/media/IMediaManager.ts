import {
  ConsumerOptions,
  MediaKind,
  MediaType,
  MuteAction,
  ProducerOptions,
  Quality,
  RouterOptions,
  TransportOptions,
} from 'entities/Mediasoup';
import PlainRtpTransport from 'mediasoup/PlainTransport';

export default abstract class IMediaManager {
  abstract createRouter(roomId: string): Promise<RouterOptions>;

  abstract createTransport(
    roomId: string,
    userId: string,
    direction: 'send' | 'receive',
    clientId: string,
  ): Promise<TransportOptions>;

  abstract createPlainTransport(
    roomId: string,
    userId: string,
    direction: 'send' | 'receive',
    clientId: string,
  ): Promise<PlainRtpTransport>;

  abstract connectTransport(
    roomId: string,
    dtlsParameters: object,
    direction: 'send' | 'receive',
    clientId: string,
    quality: Quality,
  ): Promise<void>;

  abstract createProducer(
    roomId: string,
    transportId: string,
    clientId: string,
    userId: string,
    rtpParameters: object,
    mediaType: MediaType,
    mediaKind: MediaKind,
  ): Promise<ProducerOptions>;

  abstract createConsumer(
    roomId: string,
    producerId: string,
    rtpCapabilities: object,
    clientId: string,
    userId: string,
  ): Promise<ConsumerOptions>;

  abstract findRouter(roomId: string): Promise<RouterOptions | undefined>;

  abstract findOrCreateRouter(roomId: string): Promise<RouterOptions>;

  abstract getProducers(roomId: string): Promise<ProducerOptions[]>;

  abstract findProducer(
    roomId: string,
    userId: string,
  ): Promise<ProducerOptions> | undefined;

  abstract findProducer(
    roomId: string,
    userId: string,
  ): Promise<ProducerOptions> | undefined;

  abstract findProducerById(
    roomId: string,
    producerId: string,
  ): Promise<ProducerOptions> | undefined;

  abstract findConsumer(
    roomId: string,
    clientId: string,
    userId: string,
  ): Promise<ConsumerOptions> | undefined;

  abstract startRecording(
    roomId: string,
    userId: string,
    recordId: string,
    producerId?: string,
    audioProducerId?: string,
  ): Promise<boolean>;

  abstract stopRecording(
    roomId: string,
    userId: string,
    producerId?: string,
    audioProducerId?: string,
  ): Promise<boolean>;

  abstract leaveRoom(roomId: string, userId: string): Promise<boolean>;

  abstract closeRouter(roomId: string): Promise<boolean>;

  abstract muteProducer(
    action: MuteAction,
    roomId: string,
    userId: string,
    producerId: string,
  ): Promise<boolean>;
}
