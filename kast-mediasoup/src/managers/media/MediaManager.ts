import {Injectable} from '@nestjs/common';
import IMediaManager from 'managers/media/IMediaManager';
import IMediasoup from 'mediasoup/IMediasoup';
import {RtpCapabilities, RtpParameters} from 'mediasoup/lib/types';
import {MediaKind, MediaType, MuteAction, Quality} from 'entities/Mediasoup';
import {types} from 'mediasoup';
import ILogger from 'utils/ILogger';
import IRecordService from 'services/record/IRecordSevice';
import {IConfigService} from '@spryrocks/config-node';
import WebRtcTransport from 'mediasoup/WebRtcTransport';
import Producer from 'mediasoup/Producer';
import Router from 'mediasoup/Router';

@Injectable()
export default class MediaManager extends IMediaManager {
  constructor(
    private readonly mediasoup: IMediasoup,
    private readonly logger: ILogger,
    private readonly recordService: IRecordService,
    private readonly configService: IConfigService,
  ) {
    super();
  }

  async createRouter(roomId: string) {
    const router = await this.mediasoup.createRouter({roomId});
    this.logger.logRouterCreated(router);
    return router;
  }

  async createTransport(
    roomId: string,
    userId: string,
    direction: 'send' | 'receive',
    clientId: string,
  ) {
    const router =
      (await this.mediasoup.findRouter({roomId})) || (await this.createRouter(roomId));
    await this.removeNotUsedTransports(router, roomId, userId, direction);
    const transport = await router.createWebRtcTransport({
      roomId,
      userId,
      direction,
      clientId,
    });
    this.logger.logWebRtcTransportCreated(transport, router);
    return transport;
  }

  private async removeNotUsedTransports(
    router: Router,
    roomId: string,
    userId: string,
    direction: 'send' | 'receive',
  ) {
    const transports = await MediaManager.findWebRtcTransportsByUserId(
      router,
      roomId,
      userId,
      direction,
    );
    transports.forEach((transport) => {
      router.removeTransport(transport);
      this.logger.logWebRtcTransportRemoved(transport, router);
    });
  }

  async createPlainTransport(
    roomId: string,
    userId: string,
    direction: 'send' | 'receive',
    clientId: string,
  ) {
    let router = await this.mediasoup.findRouter({roomId});
    if (!router) {
      router = await this.mediasoup.createRouter({roomId});
    }
    const transport = await router.createPlainTransport(
      {
        roomId,
        userId,
        direction,
        clientId,
      },
      this.configService,
    );
    return transport;
  }

  async connectTransport(
    roomId: string,
    dtlsParameters: object,
    direction: 'send' | 'receive',
    clientId: string,
    quality: Quality,
  ) {
    const router = await this.findOrCreateRouter(roomId);
    const transport = router.findTransport({roomId, direction, clientId});
    if (!transport) throw new Error(`'Transport not found', ${transport}`);

    await transport.connectToRouter(dtlsParameters as types.DtlsParameters);
    if (quality === Quality.Low) await transport.setMaxIncomingBitrate(2000);
    if (quality === Quality.High) await transport.setMaxIncomingBitrate(80000);
  }

  findTransportByRoomId(roomId: string, direction: 'send' | 'receive') {
    const router = this.mediasoup.findRouter({roomId});
    if (!router) {
      throw new Error(`findTransportByRoomId cannot find router by roomId ${roomId}`);
    }
    return router.findTransport({roomId, direction});
  }

  static findWebRtcTransportsByUserId(
    router: Router,
    roomId: string,
    userId: string,
    direction: 'send' | 'receive',
  ): WebRtcTransport[] {
    return router
      .findTransportsByFilter({roomId, userId, direction})
      .filter((transport) => transport instanceof WebRtcTransport)
      .map((transport) => transport as WebRtcTransport);
  }

  findTransport(roomId: string, direction: 'send' | 'receive', clientId: string) {
    const router = this.mediasoup.findRouter({roomId});
    if (!router)
      throw new Error(
        `findTransport cannot find router by roomId ${roomId}/${direction}`,
      );
    const transport = router.findTransport({
      roomId,
      direction,
      clientId,
    });
    // console.log('FIND TRINSPORT', transport);
    return transport;
  }

  async createProducer(
    roomId: string,
    transportId: string,
    clientId: string,
    userId: string,
    rtpParameters: RtpParameters,
    mediaType: MediaType,
    mediaKind: MediaKind,
  ) {
    const router = await this.findOrCreateRouter(roomId);
    const transport = this.findTransport(roomId, 'send', clientId); // todo: refactor
    if (!transport)
      throw new Error(
        `No transport By roomId ${roomId} direction send and clientid ${clientId}`,
      );
    if (!(transport instanceof WebRtcTransport)) {
      throw new Error('transport type should be WebRtc');
    }
    const producer = await transport.createProducer(
      transportId,
      rtpParameters,
      mediaKind,
      {
        roomId,
        clientId,
        userId,
        mediaType,
      },
    );
    this.logger.logProducerCreated(producer, transport, router);
    return producer;
  }

  async createConsumer(
    roomId: string,
    producerId: string,
    rtpCapabilities: RtpCapabilities,
    clientId: string,
    userId: string,
  ) {
    const transport = this.findTransport(roomId, 'receive', clientId);
    if (!transport)
      throw new Error(
        ` createConsumer. cannot find transport by roomId ${roomId} direction receive and clientid ${clientId}`,
      );
    if (!(transport instanceof WebRtcTransport)) {
      throw new Error('transport type should be WebRtc');
    }
    const appData = {
      roomId,
      clientId,
      userId,
    };
    const consumer = await transport.createConsumer(producerId, rtpCapabilities, appData);
    this.logger.consumerLog('consumer created', consumer.id);
    // const {id, producerId, rtpParameters, appData } = consumer
    return consumer;
  }

  async findRouter(roomId: string) {
    return this.mediasoup.findRouter({roomId});
  }

  async findOrCreateRouter(roomId: string) {
    return (await this.findRouter(roomId)) || this.createRouter(roomId);
  }

  async findProducer(roomId: string, userId: string) {
    const transport = this.findTransportByRoomId(roomId, 'send');
    if (!transport) throw new Error(`cannot find transport by roomID ${roomId}`);
    const producer = transport.findProducer({roomId});
    if (!producer) throw new Error(`cannot find producer by userId ${userId}`);
    return producer;
  }

  async findProducerById(roomId: string, producerId: string) {
    const transport = this.findTransportByRoomId(roomId, 'send');
    if (!transport) throw new Error(`cannot find transport by roomId ${roomId}`);
    const producer = transport.findProducerById(producerId);
    if (!producer) throw new Error(`cannot find producer by producerId ${producerId}`);
    return producer;
  }

  async findAllProducersByUserId(roomId: string, userId: string) {
    const transport = this.findTransportByRoomId(roomId, 'send');
    if (!transport) throw new Error(`cannot find transport by transport ${transport}`);
    const producers = transport.getProducers;
    const userProducers = producers.filter((element: Producer) => {
      return element.appData.userId === userId;
    });
    if (!userProducers) throw new Error(`cannot find producer by userId ${userId}`);
    return userProducers;
  }

  async getProducers(roomId: string) {
    const router = await this.mediasoup.findRouter({roomId});
    if (!router) throw new Error(`cannot find router by roomId ${router}`);
    const transports = router.getTransports();
    const producers: {
      id: string;
      kind: MediaKind;
      rtpParameters: object;
      appData: object;
    }[] = [];
    transports
      .filter((t) => t instanceof WebRtcTransport && t.dtlsState === 'connected')
      .forEach((transport) => {
        producers.push(...transport.producers);
      });
    if (!producers) throw new Error(`no producer on this router.roomId ${router.roomId}`);
    return producers;
  }

  async findConsumer(roomId: string, clientId: string, userId: string) {
    const transport = this.findTransportByRoomId(roomId, 'receive');
    if (!transport)
      throw new Error(`Consumer:cannot find transport by transport ${transport}`);
    const consumer = transport.findConsumer({userId, clientId, roomId});
    if (!consumer)
      throw new Error(`COnsumer: cannot find consumer by clientId ${clientId}`);
    return consumer;
  }

  // eslint-disable-next-line class-methods-use-this
  async startRecording(
    roomId: string,
    userId: string,
    recordId: string,
    producerId?: string,
    audioProducerId?: string,
  ) {
    const router = await this.findOrCreateRouter(roomId);
    router.rtpCapabilities.codecs?.find((c) => c.mimeType === 'video/H264');
    if (producerId) {
      const producerIdTransport = await router.createPlainTransport(
        {
          roomId,
          userId,
        },
        this.configService,
      );
      await producerIdTransport.connect('127.0.0.1', 5006, 5007);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const videoConsumer = await producerIdTransport.createConsumer(
        producerId,
        router.rtpCapabilities,
        {roomId, userId},
      );
      producerIdTransport.transport.on('connect', () => {
        // this.logger.log('audio transport connect');
      });
    }
    if (audioProducerId) {
      const audioTransport = await router.createPlainTransport(
        {
          roomId,
          userId,
        },
        this.configService,
      );
      await audioTransport.connect('127.0.0.1', 5004, 5005);
      const audioConsumer = await audioTransport.createConsumer(
        audioProducerId,
        router.rtpCapabilities,
        {roomId, userId},
      );
      audioTransport.transport.on('connect', () => {
        this.logger.consumerLog('audio transport connect', audioConsumer.id);
      });
    }
    const audio = !!audioProducerId;
    return this.recordService.startRecording(roomId, recordId, audio);
    // return true;
  }

  // eslint-disable-next-line class-methods-use-this
  async stopRecording(roomId: string) {
    return this.recordService.stopRecording(roomId);
  }

  async leaveRoom(roomId: string, userId: string) {
    const router = await this.findRouter(roomId);
    if (!router) throw new Error(`leaveRoom: router not been found, room Id: ${roomId}`);
    const recvTransport = router.findTransport({userId, direction: 'receive'});
    const sendTransport = router.findTransport({userId, direction: 'send'});
    if (!recvTransport || !sendTransport)
      throw new Error(`leaveRoom: router not been found, user Id: ${roomId}`);
    if (recvTransport !== undefined) {
      recvTransport.close();
    }
    if (sendTransport !== undefined) {
      sendTransport.close();
    }
    return true;
  }

  async closeRouter(roomId: string) {
    const router = this.mediasoup.findRouter({roomId});
    if (!router) throw new Error('Router not found');
    router.close();
    return true;
  }

  async muteProducer(
    action: MuteAction,
    roomId: string,
    userId: string,
    producerId: string,
  ) {
    const producer = await this.findProducerById(roomId, producerId);
    // const producers = await this.findAllProducersByUserId(roomId, userId);
    if (!producer) throw new Error('no producer for mute');
    if (action === MuteAction.Mute) await producer.pause();
    else if (action === MuteAction.UnMute) await producer.resume();
    // if (!producers) throw new Error('no producer for mute');
    // if (action === MuteAction.Mute) {
    //   producers.forEach((element: Producer) => {
    //     element.pause();
    //   });
    // } else if (action === MuteAction.UnMute) {
    //   producers.forEach((element: Producer) => {
    //     element.resume();
    //   });
    // }
    return true;
  }
}
