/* eslint-disable no-await-in-loop,no-restricted-syntax,class-methods-use-this,no-console */
import IMediasoupService from './IMediasoupService';
import {
  Direction,
  MediaKind,
  MediaTrack,
  MediaType,
  PlayingType,
  ProducerOptions,
  Quality,
  RenderMediaTrack,
  RouterOptions,
  TransportOptions,
} from 'entities/Mediasoup';
import {Device, types as mediasoupTypes, types} from 'mediasoup-client';
import {Subject} from 'rxjs';
import {AvikastApi} from 'api';
import {v4 as uuidv4} from 'uuid';
import {ParticipantTrack} from 'entities/Participant';
import {logger} from 'services/mediasoup/Utils';
import Room from 'entities/Room';

export type Callback = (data?: unknown) => void;
export type Errback = (error: unknown) => void;

export default class MediasoupService implements IMediasoupService {
  private device: Device | undefined;

  private clientProducers: {
    audio: types.Producer | undefined;
    camera: types.Producer | undefined;
    screen: types.Producer | undefined;
  };

  private playStatus: {
    audio: boolean;
    camera: boolean;
    screen: boolean;
  };

  private audioTrackSubject: Subject<MediaTrack[]>;

  private videoTrackSubject: Subject<MediaTrack[]>;

  private screenTrackSubject: Subject<MediaTrack[]>;

  private mediaForRenderNewSubject: Subject<RenderMediaTrack[]>;

  private sendTransport: types.Transport | undefined;

  private receiveTransport: types.Transport | undefined;

  private routerOptions: RouterOptions | undefined;

  private mediaForRenderNew: RenderMediaTrack[];

  public clientId: string;

  private audioClientDevice: unknown | undefined;

  private videoClientDevice: unknown | undefined;

  private screenClientDevice: unknown | undefined;

  // @ts-ignore
  private audioRecordProducerId: string | undefined;

  private videoRecordProducerId: string | undefined;

  private isInitializied: boolean;

  private quality: Quality;

  constructor() {
    this.device = new Device();
    this.audioTrackSubject = new Subject<MediaTrack[]>();
    this.videoTrackSubject = new Subject<MediaTrack[]>();
    this.screenTrackSubject = new Subject<MediaTrack[]>();
    this.mediaForRenderNewSubject = new Subject<RenderMediaTrack[]>();
    this.clientId = uuidv4();
    this.mediaForRenderNew = [];
    this.clientProducers = {
      audio: undefined,
      camera: undefined,
      screen: undefined,
    };
    this.playStatus = {
      audio: false,
      camera: false,
      screen: false,
    };

    this.audioClientDevice = undefined;
    this.videoClientDevice = undefined;
    this.screenClientDevice = undefined;

    this.audioRecordProducerId = undefined;
    this.videoRecordProducerId = undefined;
    this.isInitializied = false;
    this.quality = Quality.Low;
  }

  async initialize(roomId: string) {
    if (this.isInitializied) return;
    this.isInitializied = true;
    this.audioRecordProducerId = undefined;
    this.videoRecordProducerId = undefined;
    const routerOptions: RouterOptions = await AvikastApi.getRouter(roomId);
    await this.loadDevice(routerOptions.rtpCapabilities);
    await this.createSendTransport(roomId);
    this.routerOptions = await AvikastApi.getRouter(roomId);
    this.receiveTransport = await this.createReceiveTransport(roomId);
    const room = await AvikastApi.getRoomById(roomId);
    await this.pushParticipantTracks(room);
  }

  async loadDevice(routerRtpCapabilities: types.RtpCapabilities) {
    let device: Device;
    if (this.device) device = this.device;
    else {
      device = new Device();
      this.device = device;
    }
    if (device) device = this.device;
    else {
      device = new Device();
      this.device = device;
    }
    if (device.loaded) return;
    await this.device.load({routerRtpCapabilities});
  }

  private async createTransport(roomId: string, direction: Direction) {
    const options: TransportOptions = await AvikastApi.createTransport(
      roomId,
      direction,
      this.clientId,
    );
    switch (direction) {
      case 'send':
        return this.device!.createSendTransport({
          id: options.id,
          iceParameters: options.iceParameters as types.IceParameters,
          dtlsParameters: options.dtlsParameters as types.DtlsParameters,
          iceCandidates: options.iceCandidates as types.IceCandidate[],
        });
      default:
        return this.device!.createRecvTransport({
          id: options.id,
          iceParameters: options.iceParameters as types.IceParameters,
          dtlsParameters: options.dtlsParameters as types.DtlsParameters,
          iceCandidates: options.iceCandidates as types.IceCandidate[],
        });
    }
  }

  private async onTransportConnect(
    roomId: string,
    direction: Direction,
    dtlsParameters: types.DtlsParameters,
    callback: Callback,
    errback: Errback,
  ) {
    try {
      await AvikastApi.connectTransport(
        roomId,
        dtlsParameters,
        direction,
        this.clientId,
        this.quality,
      );
      callback();
      logger('connect transport success');
    } catch (e) {
      errback(e);
      logger('connect transport error', JSON.stringify(e));
    }
  }

  async onTransportProduce(
    roomId: string,
    callback: Callback,
    errback: Errback,
    transportId: string,
    rtpParameters: types.RtpParameters,
    mediaKind: MediaKind,
    mediaType: MediaType,
  ) {
    try {
      const {clientId} = this;
      const producerOptions: ProducerOptions = await AvikastApi.createProducer(
        roomId,
        transportId,
        clientId,
        rtpParameters,
        mediaKind,
        mediaType,
      );
      logger('on produce success');
      callback({id: producerOptions.id});
    } catch (e) {
      logger('on produce fail', e);
      errback(e);
    }
  }

  async createSendTransport(roomId: string) {
    const direction: Direction = 'send';
    const transport = await this.createTransport(roomId, direction);
    transport.on('connect', async ({dtlsParameters}, callback, errback) =>
      this.onTransportConnect(roomId, direction, dtlsParameters, callback, errback),
    );
    transport.on('produce', async ({rtpParameters, appData}, callback, errback) => {
      const {mediaKind, mediaType} = appData;
      await this.onTransportProduce(
        roomId,
        callback,
        errback,
        transport.id,
        rtpParameters,
        mediaKind,
        mediaType,
      );
    });
    transport.on('connectionstatechange', (connection) => {
      if (connection === 'disconnected') {
        logger('transport disconcted');
      }
      if (connection === 'new') {
        logger('transport Send', connection);
      }
      if (connection === 'connected') {
        logger('transport Send', connection);
      }
      if (connection === 'failed') {
        logger('transport Send ', connection);
      }
      logger('transport Send ', connection);
      if (connection === 'disconnected') {
        if (!this.videoRecordProducerId) {
          this.stopRecording(roomId);
        }
      }
      logger('transport Send ', connection);
      if (connection === 'closed') {
        if (!this.videoRecordProducerId) {
          this.stopRecording(roomId);
        }
      }
    });
    this.sendTransport = transport;
    return transport;
  }

  async createReceiveTransport(roomId: string) {
    const direction: Direction = 'receive';
    const transport = await this.createTransport(roomId, direction);
    transport.on('connect', async ({dtlsParameters}, callback, errback) =>
      this.onTransportConnect(roomId, direction, dtlsParameters, callback, errback),
    );

    transport.on('connectionstatechange', (connection) => {
      if (connection === 'disconnected') {
        throw new Error('media down');
      }
      if (connection === 'new') {
        logger('transport Recieve', connection);
      }
      if (connection === 'connected') {
        logger('transport Recieve', connection);
      }
      if (connection === 'failed') {
        logger('transport Recieve', connection);
      }
      if (connection === 'disconnected') {
        logger('transport Recieve', connection);
      }
      if (connection === 'closed') {
        logger('transport Recieve', connection);
      }
    });
    this.receiveTransport = transport;
    return transport;
  }

  async getLocalAudio() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: false,
        audio: true,
      });
      this.audioClientDevice = stream;
      logger('AUDIO STREAM', stream);
      if (!stream) throw new Error('audio cannot start');
      return stream.getTracks()[0];
    } catch (e) {
      throw new Error('ERROR: audio cannot start');
    }
  }

  async getLocalVideo(quality: Quality) {
    try {
      console.log(quality);
      const videoResolution = this.getCameraResolution(Quality.High);
      const stream = await navigator.mediaDevices.getUserMedia(videoResolution);
      this.videoClientDevice = stream;
      if (!stream) throw new Error('video cannot start');
      logger('VIDEO STREAM', stream);
      return stream.getVideoTracks()[0];
    } catch (e) {
      throw new Error('ERROR: video cannot start');
    }
  }

  async getScreenShare(quality: Quality) {
    try {
      console.log(quality);
      const screenResolution = this.getScreenResolution(Quality.High); // TODO remove
      const mediaDevices = navigator.mediaDevices as any;
      const stream = await mediaDevices.getDisplayMedia(screenResolution);
      this.screenClientDevice = stream;
      if (!stream) throw new Error('Screen cannot start');
      logger('SCREEN STREAM', stream);
      return stream.getVideoTracks()[0];
    } catch (e) {
      throw new Error(`ERROR: Screen cannot start ${e}`);
    }
  }

  getCameraResolution(quality: Quality) {
    let constraints;
    if (quality === Quality.Low) {
      constraints = {
        video: {
          width: 320,
          height: 240,
          frameRate: {ideal: 20, min: 5, max: 25},
        },
      };
    }
    if (quality === Quality.High) {
      constraints = {
        video: true,
      };
    }

    return constraints;
  }

  // @ts-ignore
  getScreenResolution(quality: Quality) {
    const windowHeight = window.screen.availHeight;
    const windowWidth = window.screen.availWidth;
    const res: number = windowWidth / windowHeight;
    if (quality === Quality.Low) {
      if (res.toFixed(1) === '1.8') {
        console.log('resolution of screen is 16/9');
        return {
          video: {
            width: {min: 1024, ideal: 800, max: 1920},
            height: {min: 776, ideal: 600, max: 1080},
          },
          audio: true,
        };
      }
      if (res.toFixed(1) === '1.3') {
        console.log('resolution of screen is 4/3');
        return {
          video: {
            width: {min: 1024, ideal: 1280, max: 1920},
            height: {min: 776, ideal: 720, max: 1080},
          },
          audio: true,
        };
      }

      console.log('resolution of screen is unknown');
      return {
        video: {
          width: {min: 1024, ideal: 1280, max: 1920},
          height: {min: 776, ideal: 720, max: 1080},
        },
        audio: true,
      };
    }
    if (quality === Quality.High) {
      console.log('high q');
      return {
        video: true,
        audio: true,
      };
    }
  }

  getAudioTrackSubject() {
    return this.audioTrackSubject;
  }

  getVideoTrackSubject() {
    return this.videoTrackSubject;
  }

  getScreenTrackSubject() {
    return this.screenTrackSubject;
  }

  getPlayStatus() {
    return this.playStatus;
  }

  getMediaForRenderNewSubject() {
    return this.mediaForRenderNewSubject;
  }

  getMediaForRenderNew() {
    return this.mediaForRenderNew;
  }

  async consume(roomId: string) {
    const transport = this.receiveTransport;
    if (!transport) throw new Error('Receive transport not exists');
    const producerOptions = await AvikastApi.getProducer(roomId);
    console.log('1consume');
    const consumerOptions = await AvikastApi.createConsumer(
      roomId,
      producerOptions.id,
      this.device!.rtpCapabilities,
      this.clientId,
    );
    const consumer: mediasoupTypes.Consumer = await transport.consume({
      id: consumerOptions.id,
      producerId: consumerOptions.producerId,
      rtpParameters: consumerOptions.rtpParameters as types.RtpParameters,
      kind: 'video',
    });
    return consumer;
  }

  async produceAudio(roomId: string) {
    if (this.clientProducers.audio) {
      await this.playResumeAudio(roomId);
      return;
    }
    this.playStatus.audio = true;
    const transport = this.sendTransport;
    if (!transport) throw new Error('Send transport not exists');
    const track = await this.getLocalAudio(); //
    if (!track) throw new Error('No audio track');
    const appData = {mediaKind: 'audio', mediaType: 'userMedia'};
    logger('produceAudio', track);
    this.clientProducers.audio = await transport.produce({
      track,
      appData,
    });
  }

  async produceCamera(roomId: string, quality: Quality) {
    if (this.clientProducers.camera) {
      await this.playResumeCamera(roomId);
      return;
    }
    // @ts-ignore
    if (this.clientProducers.camera) {
      await this.playResumeCamera(roomId);
      return;
    }
    this.playStatus.camera = true;

    const transport = this.sendTransport;
    if (!transport) throw new Error('Send transport not exists');
    const track = await this.getLocalVideo(quality);
    if (!track) throw new Error('No video track');
    const appData = {mediaKind: 'video', mediaType: 'userMedia'};
    logger('start produce video', track);
    this.clientProducers.camera = await transport.produce({
      track,
      appData,
    });
  }

  async produceScreen(roomId: string, quality: Quality) {
    // if (this.clientProducers.screen) {
    //   await this.playResumeScreen(roomId);
    //   return;
    // }
    this.playStatus.screen = true;
    logger('PRODUCE SCREEN logger');
    const transport = this.sendTransport;
    if (!transport) throw new Error('Send transport not exists');
    const track = await this.getScreenShare(quality);
    if (!track) throw new Error('No screen track');
    logger('start produce screen', track);
    const appData = {mediaKind: 'video', mediaType: 'screenShare'};
    this.clientProducers.screen = await transport.produce({
      track,
      appData,
    });
  }

  async playResumeAudio(roomId: string) {
    if (!this.clientProducers.audio)
      throw new Error('cannot pause because no audio producer');
    if (this.clientProducers.audio.paused) {
      logger('audio resume', this.clientProducers.audio.paused);
      this.playStatus.audio = true;

      this.clientProducers.audio.resume();
      await AvikastApi.playPauseMedia(PlayingType.Audio, true, roomId);
      return;
    }
    this.clientProducers.audio.pause();
    this.playStatus.audio = false;
    await AvikastApi.playPauseMedia(PlayingType.Audio, false, roomId);
  }

  async playResumeCamera(roomId: string) {
    if (!this.clientProducers.camera)
      throw new Error('cannot pause because no camera producer');
    if (this.clientProducers.camera.paused) {
      logger('camera resume', this.clientProducers.camera.paused);
      this.playStatus.camera = true;
      this.clientProducers.camera.resume();
      await AvikastApi.playPauseMedia(PlayingType.Video, true, roomId);
      return;
    }
    this.playStatus.camera = false;
    this.clientProducers.camera.pause();
    await AvikastApi.playPauseMedia(PlayingType.Video, false, roomId);
  }

  async playResumeScreen(roomId: string) {
    if (!this.clientProducers.screen)
      throw new Error('cannot pause because no screen producer');
    if (this.clientProducers.screen.paused) {
      logger('camera resume', this.clientProducers.screen.paused);
      this.playStatus.screen = true;
      this.clientProducers.screen.resume();
      await AvikastApi.playPauseMedia(PlayingType.Screen, true, roomId);
      return;
    }
    this.playStatus.screen = false;
    this.clientProducers.screen.pause();
    await AvikastApi.playPauseMedia(PlayingType.Screen, false, roomId);
  }

  // @ts-ignore
  async consumeMedia(
    roomId: string,
    kind: MediaKind,
    type: MediaType,
    userId: string,
    participantTrack: ParticipantTrack,
    userName: string,
    producerId: string,
    playingType: PlayingType,
  ): Promise<RenderMediaTrack> {
    if (!this.routerOptions) throw new Error('Router options transport not exists');
    console.log('2consume');
    const consumerOptions = await AvikastApi.createConsumer(
      roomId,
      producerId,
      this.routerOptions.rtpCapabilities,
      this.clientId,
    );
    if (!this.receiveTransport)
      throw new Error('receiveTransport options transport not exists');
    const consumer: mediasoupTypes.Consumer = await this.receiveTransport.consume({
      id: consumerOptions.id,
      producerId: consumerOptions.producerId,
      rtpParameters: consumerOptions.rtpParameters as types.RtpParameters,
      kind,
      appData: {userName, kind, type},
    });
    return {
      userName,
      userId,
      enabled: participantTrack.enabled,
      muted: participantTrack.muted,
      track: consumer.track as MediaStreamTrack,
      kind,
      type,
      producerId,
      playingType,
    };
  }

  async getParticipantTracks(room: Room) {
    if (!room) throw new Error('Room cannot be undefined');
    const mediasoupProducers = await AvikastApi.getProducers(room.id);
    // @ts-ignore
    const participantsforPlay = () => {
      const arr = [];
      for (const producer of mediasoupProducers) {
        for (const participant of room.participants) {
          // @ts-ignore
          if (participant.user.id === producer.appData.userId) {
            let options;
            let playingType;
            if (producer.kind === MediaKind.Audio) {
              options = participant.media.audio;
              playingType = PlayingType.Audio;
            }
            if (
              producer.kind === MediaKind.Video &&
              // @ts-ignore
              producer.appData.mediaType === MediaType.UserMedia
            ) {
              options = participant.media.video;
              playingType = PlayingType.Video;
            }
            if (
              producer.kind === MediaKind.Video &&
              // @ts-ignore
              producer.appData.mediaType === MediaType.ScreenShare
            ) {
              options = participant.media.screen;
              playingType = PlayingType.Screen;
            }
            const track = {
              roomId: room.id,
              kind: producer.kind,
              // @ts-ignore
              userId: participant.user.id,
              // @ts-ignore
              type: producer.appData.mediaType as MediaType,
              producerId: producer.id,
              participantTrack: options as ParticipantTrack,
              userName: participant.user.name,
              playingType,
            };

            arr.push(track);
          }
        }
      }
      return arr;
    };
    const tracks = participantsforPlay();
    const consumedTracks: RenderMediaTrack[] = [];
    for (const track of tracks) {
      const {
        roomId,
        kind,
        type,
        userId,
        userName,
        producerId,
        participantTrack,
        playingType,
      } = track;
      const consumedTrack = await this.consumeMedia(
        roomId,
        kind,
        type,
        userId,
        participantTrack,
        userName,
        producerId,
        playingType as PlayingType,
      );
      consumedTracks.push(consumedTrack as RenderMediaTrack);
    }
    this.mediaForRenderNew = consumedTracks;
    console.log(consumedTracks, 'CONSUMED TRACKS');
    this.mediaForRenderNewSubject.next(consumedTracks);
  }

  async pushParticipantTracks(room: Room) {
    await this.getParticipantTracks(room);
  }

  async startRecording(roomId: string, producerId?: string, audioProducerId?: string) {
    this.audioRecordProducerId = audioProducerId;
    this.videoRecordProducerId = producerId;
    return AvikastApi.startRecording(roomId, producerId, audioProducerId);
  }

  async stopRecording(roomId?: string) {
    return AvikastApi.stopRecording(roomId);
  }

  changeQuality(quality: Quality) {
    this.quality = quality;
  }

  async stopAll() {
    try {
      // @ts-ignore
      this.clientProducers.screen = undefined;
      this.clientProducers = {audio: undefined, camera: undefined, screen: undefined};
      this.sendTransport = undefined;
      this.receiveTransport = undefined;
      this.device = undefined;
      this.isInitializied = false;
      if (this.audioClientDevice !== undefined) {
        // @ts-ignore
        this.audioClientDevice.getTracks().forEach((track: unknown) => track.stop());
        this.audioClientDevice = undefined;
      }
      if (this.videoClientDevice !== undefined) {
        // @ts-ignore
        this.videoClientDevice.getTracks().forEach((track: unknown) => track.stop());
        // @ts-ignore
        // this.clientProducers.camera.close();
        this.videoClientDevice = undefined;
      }
      if (this.screenClientDevice !== undefined) {
        // @ts-ignore
        // this.clientProducers.screen.close();
        // @ts-ignore
        this.screenClientDevice.getTracks().forEach((track: unknown) => track.stop());
        this.screenClientDevice = undefined;
      }
    } catch (e) {
      throw new Error(e);
    }
  }
}
