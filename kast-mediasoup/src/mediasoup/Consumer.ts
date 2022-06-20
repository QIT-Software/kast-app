import {types} from 'mediasoup';
import IMediasoupInternal from './IMediasoupInternal';
import {BaseEntity} from 'mediasoup/BaseEntity';

export default class Consumer extends BaseEntity {
  constructor(mediasoup: IMediasoupInternal, private readonly instance: types.Consumer) {
    super();
    this.instance = instance;
  }

  public get roomId() {
    return this.instance.appData.roomId;
  }

  public get id() {
    return this.instance.id;
  }

  public get producerId() {
    return this.instance.producerId;
  }

  public get rtpParameters() {
    return this.instance.rtpParameters;
  }

  get appData() {
    return this.instance.appData;
  }

  public close() {
    this.instance.close();
  }
}
