import {types} from 'mediasoup';
import IMediasoupInternal from './IMediasoupInternal';
import WebRtcTransport from './WebRtcTransport';
import {BaseEntity} from 'mediasoup/BaseEntity';
import {Filter, removeFromArray} from 'mediasoup/Utils';
import PlainRtpTransport from './PlainTransport';
import {IConfigService} from '@spryrocks/config-node';
import Transport from 'mediasoup/Transport';

export default class Router extends BaseEntity {
  private readonly transports: Array<Transport> = [];

  constructor(
    private readonly mediasoup: IMediasoupInternal,
    private readonly instance: types.Router,
  ) {
    super();
  }

  public get rtpCapabilities(): types.RtpCapabilities {
    return this.instance.rtpCapabilities;
  }

  public async createWebRtcTransport(appData: Filter) {
    const config = this.mediasoup.getConfig();
    const transport = new WebRtcTransport(
      this.mediasoup,
      await this.instance.createWebRtcTransport({
        enableUdp: true,
        enableTcp: true,
        preferUdp: true,
        listenIps: config.listenIps,
        initialAvailableOutgoingBitrate: config.initialAvailableOutgoingBitrate,
        appData,
      }),
    );
    this.transports.push(transport);
    return transport;
  }

  public async createPlainTransport(appData: Filter, configService: IConfigService) {
    const transport = new PlainRtpTransport(
      this.mediasoup,
      this,
      await this.instance.createPlainTransport({
        listenIp: configService.get('LISTEN_IP'),
        comedia: false,
        rtcpMux: false,
        appData,
      }),
    );
    this.transports.push(transport);
    return transport;
  }

  public get id() {
    return this.instance.id;
  }

  public get roomId() {
    return this.instance.appData.roomId;
  }

  public getTransports() {
    return this.transports;
  }

  public findTransport(filter: Filter) {
    for (const transport of this.transports) {
      if (transport.matchAppData(filter)) {
        return transport;
      }
    }

    return undefined;
  }

  public findTransportsByFilter(filter: Filter) {
    const transports: Transport[] = [];
    for (const transport of this.transports) {
      if (transport.matchAppData(filter)) {
        transports.push(transport);
      }
    }
    return transports;
  }

  public findTransports(filter: Filter) {
    return this.transports.filter((t) => t.matchAppData(filter));
  }

  public findTransportsById(transportId: string) {
    return this.transports.filter((t) => t.id === transportId);
  }

  public removeTransport(transport: Transport) {
    const index = this.transports.findIndex((t) => t.id === transport.id);
    this.transports[index].close();
    this.transports.splice(index, 1);
  }

  get appData() {
    return this.instance.appData;
  }

  public leaveRoom(userId: string) {
    this.transports.forEach((transport) => {
      if (transport.appData) {
        return transport.appData.userId !== userId;
      }
    });
  }

  public close() {
    this.transports.forEach((transport) => this.closeTransport(transport));
    this.instance.close();
  }

  public closeTransport(transport: Transport) {
    transport.close();
    removeFromArray(this.transports, transport);
  }
}
