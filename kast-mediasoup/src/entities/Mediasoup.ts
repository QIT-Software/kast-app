export type MediaKind = 'audio' | 'video';

export type MediaType = 'camera' | 'screen';

export type Direction = 'send' | 'receive';

export interface ConsumerOptions {
  id: string;
  producerId: string;
  rtpParameters: object;
  appData: object;
}

export interface RouterOptions {
  rtpCapabilities: object;
}

export interface ProducerOptions {
  id: string;
  kind: MediaKind;
  rtpParameters: object;
  appData: object;
}

export interface TransportOptions {
  id: string;
  iceCandidates: object;
  iceParameters: object;
  dtlsParameters: object;
}
export enum MuteAction {
  Mute = 'Mute',
  UnMute = 'unMute',
}

export enum Quality {
  Low = 'Low',
  High = 'High',
}
