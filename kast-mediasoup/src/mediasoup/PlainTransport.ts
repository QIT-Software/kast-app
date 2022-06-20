import {types} from 'mediasoup';
import IMediasoupInternal from './IMediasoupInternal';
import Producer from './Producer';
import Consumer from './Consumer';
import {Filter, matchAppData} from 'mediasoup/Utils';
import {MediaKind} from 'entities/Mediasoup';
import Transport from 'mediasoup/Transport';
import Router from 'mediasoup/Router';

export default class PlainTransport extends Transport {
  constructor(
    readonly mediasoup: IMediasoupInternal,
    readonly router: Router,
    private readonly instance: types.PlainTransport,
  ) {
    super(mediasoup, instance);
  }

  public get roomId() {
    return this.instance.appData.roomId;
  }

  public get id() {
    return this.instance.id;
  }

  public get appData() {
    return this.instance.appData;
  }

  public get getProducers() {
    return this.producers;
  }

  public async createProducer(
    transportId: string,
    rtpParameters: types.RtpParameters,
    mediaKind: MediaKind,
    appData: object,
  ): Promise<Producer> {
    const producer = new Producer(
      this.mediasoup,
      await this.instance.produce({
        kind: mediaKind,
        rtpParameters,
        appData,
      }),
    );
    this.pushProducer(producer);
    return producer;
  }

  public async createConsumer(
    producerId: string,
    rtpCapabilities: types.RtpCapabilities,
    appData: object,
  ): Promise<Consumer> {
    const consumer = new Consumer(
      this.mediasoup,
      await this.instance.consume({
        producerId,
        rtpCapabilities,
        appData,
      }),
    );
    this.pushConsumer(consumer);
    return consumer;
  }

  public findProducer(filter: Filter) {
    for (const producer of this.producers) {
      if (matchAppData(producer.appData, filter)) return producer;
    }
    return undefined;
  }

  public findConsumer(filter: Filter) {
    for (const consumer of this.consumers) {
      if (matchAppData(consumer.appData, filter)) return consumer;
    }
    return undefined;
  }

  public async connect(ip?: string, port?: number, rtcpPort?: number): Promise<void> {
    return this.instance.connect({ip, port, rtcpPort});
  }

  public get transport() {
    return this.instance;
  }
}
