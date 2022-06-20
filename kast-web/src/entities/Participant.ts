import User from './User';
import {MediaKind, MediaTrack, MediaType, ProducerOptions} from 'entities/Mediasoup';
import {ViewModeEnum, ViewModeScale} from 'entities/Room';

export enum ParticipantRole {
  Owner = 'Owner',
  User = 'User',
}

export default interface Participant {
  id: string;
  user: User;
  role: ParticipantRole;
  media: ParticipantMedia;
  raiseHand: boolean | undefined;
  kicked: boolean;
  muted: boolean;
}

export interface WebinarOptions {
  viewMode: ViewModeEnum;
  viewModeScale: ViewModeScale;
}

export interface ParticipantMedia {
  userName: string;
  audio: ParticipantTrack;
  video: ParticipantTrack;
  screen: ParticipantTrack;
}

export type ParticipantTrack = {
  enabled: boolean;
  muted: boolean;
  clientId: string | null;
  userId: string;
  producerOptions: ProducerOptions | null;
  mediaKind: MediaKind | null;
  mediaType: MediaType | null;
};

export interface MediaForRender {
  userName: string;
  audio: MediaTrack | undefined;
  video: MediaTrack | undefined;
  screen: MediaTrack | undefined;
}

export enum MuteAction {
  Mute = 'Mute',
  UnMute = 'unMute',
}

export enum MuteMediaSource {
  Audio = 'Audio',
  Video = 'Video',
  Screen = 'Screen',
}
