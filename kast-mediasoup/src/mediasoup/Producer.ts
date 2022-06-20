import {types} from 'mediasoup';
import IMediasoupInternal from './IMediasoupInternal';
import {BaseEntity} from 'mediasoup/BaseEntity';

export default class Producer extends BaseEntity {
  constructor(mediasoup: IMediasoupInternal, private readonly instance: types.Producer) {
    super();
    this.instance = instance;
  }

  public get roomId() {
    return this.instance.appData.roomId;
  }

  public get id() {
    return this.instance.id;
  }

  public get kind() {
    return this.instance.kind;
  }

  public get appData() {
    return this.instance.appData;
  }

  public get rtpParameters() {
    return this.instance.rtpParameters;
  }

  public close() {
    return this.instance.close();
  }

  public pause() {
    if (this.instance.paused) {
      return this.instance.resume();
    }
    return this.instance.pause();
  }

  public resume() {
    return this.instance.resume();
  }

  public get clientId() {
    return this.instance.appData.clientId;
  }

  public get userId() {
    return this.instance.appData.userId;
  }

  public get mediaType() {
    return this.instance.appData.mediaType;
  }
}
