import {Subject} from 'rxjs';
import {Consumer} from 'mediasoup-client/lib/types';
import {
  MediaKind,
  MediaTrack,
  MediaType,
  PlayingType,
  Quality,
  RenderMediaTrack,
} from 'entities/Mediasoup';
import {ParticipantTrack} from 'entities/Participant';
import Room from 'entities/Room';

export default interface IMediasoupService {
  initialize(roomId: string): Promise<void>;
  consume(roomId: string): Promise<Consumer>;
  getMediaForRenderNew(): RenderMediaTrack[];
  getMediaForRenderNewSubject(): Subject<RenderMediaTrack[]>;
  getPlayStatus(): {
    audio: boolean;
    camera: boolean;
    screen: boolean;
  };
  getAudioTrackSubject(): Subject<MediaTrack[]>;
  getVideoTrackSubject(): Subject<MediaTrack[]>;
  getScreenTrackSubject(): Subject<MediaTrack[]>;

  produceAudio(roomId: string): Promise<void>;
  produceCamera(roomId: string, quality: Quality): Promise<void>;
  produceScreen(roomId: string, quality: Quality): Promise<void>;

  playResumeAudio(roomId: string): Promise<void>;
  playResumeCamera(roomId: string): Promise<void>;
  playResumeScreen(roomId: string): Promise<void>;

  stopAll(): Promise<void>;

  getParticipantTracks(room: Room): Promise<void>;

  changeQuality(quality: Quality): void;

  consumeMedia(
    roomId: string,
    kind: MediaKind,
    type: MediaType,
    userId: string,
    options: ParticipantTrack,
    userMedia: string,
    producerId: string,
    playingType: PlayingType,
  ): Promise<RenderMediaTrack>;
  pushParticipantTracks(room: Room): Promise<void>;

  startRecording(
    roomId: string,
    producerId?: string,
    audioProducerId?: string,
  ): Promise<boolean>;
  stopRecording(roomId?: string): Promise<boolean>;
}
