export enum Quality {
  Low = 'Low',
  High = 'High',
}

export type Direction = 'send' | 'receive';

export enum MediaKind {
  Audio = 'audio',
  Video = 'video',
}
export enum MediaType {
  UserMedia = 'userMedia',
  ScreenShare = 'screenShare',
}

export enum PlayingType {
  Audio = 'audio',
  Video = 'video',
  Screen = 'screen',
}

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

export interface MediaTrack {
  userName: string;
  userId: string;
  enabled: boolean;
  muted: boolean;
  track: MediaStreamTrack;
  kind: MediaKind;
  type: MediaType;
  producerId: string;
}

export interface RenderMediaTrack {
  userName: string;
  userId: string;
  enabled: boolean;
  muted: boolean;
  track: MediaStreamTrack;
  kind: MediaKind;
  type: MediaType;
  producerId: string;
  playingType: PlayingType;
}
