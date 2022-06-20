export enum MuteAction {
  Mute = 'Mute',
  UnMute = 'unMute',
}

export type MutePattern = {
  area: 'producer';
  action: 'mute';
};

export interface MuteRequest {
  action: MuteAction;
  userId: string;
  roomId: string;
  producerId: string;
}

export interface MuteResponse {
  response: boolean;
}
