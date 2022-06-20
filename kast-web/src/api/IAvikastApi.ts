import RegisterRequest from './entities/RegisterRequest';
import LoginRequest from './entities/LoginRequest';
import {Account} from 'entities/Account';
import User from 'entities/User';
import ForgotPasswordRequest from 'api/entities/ForgotPasswordRequest';
import UpdateFirebaseTokenRequest from 'api/entities/UpdateFirebaseTokenRequest';
import UpdateUserRequest from 'state/ducks/userProfile/models';
import Bookmark from '../entities/Bookmark';
import Room, {RoomType} from 'entities/Room';
import {
  ConsumerOptions,
  Direction,
  MediaKind,
  MediaType,
  PlayingType,
  ProducerOptions,
  Quality,
  RouterOptions,
  TransportOptions,
} from 'entities/Mediasoup';
import Participant, {
  MuteAction,
  MuteMediaSource,
  ParticipantMedia,
} from 'entities/Participant';
import Message from 'entities/Message';
import {Observable} from 'apollo-boost';
import Record from 'entities/Record';
import AuthResponse from './entities/AuthResponse';
import {AvikastFile, AvikastDirectory} from 'entities/AvikastFiles';
import Resume from 'entities/Resume';

export interface IAvikastApi {
  register(request: RegisterRequest): Promise<AuthResponse>;
  login(request: LoginRequest): Promise<AuthResponse>;
  myAccount(): Promise<Account>;
  forgotPassword(request: ForgotPasswordRequest): Promise<void>;
  updateFirebaseToken(request: UpdateFirebaseTokenRequest): Promise<void>;
  updateUserProfile(updateRequest: UpdateUserRequest): Promise<Account>;
  createRoom(
    name: string,
    type: RoomType,
    passwordProtected: boolean,
    password: string | undefined,
    audio: boolean,
    video: boolean,
  ): Promise<Room>;
  getBookmarks(): Promise<Bookmark[]>;
  getUserReferrers(): Promise<User[]>;
  addBookmark(text: string, roomId: string): Promise<boolean>;
  joinRoom(
    inviteLink: string,
    password: string | undefined,
    audio: boolean,
    video: boolean,
  ): Promise<Room>;
  createTransport(
    roomId: string,
    direction: Direction,
    clientId: string,
  ): Promise<TransportOptions>;
  connectTransport(
    roomId: string,
    dtlsParameters: object,
    direction: Direction,
    clientId: string,
    quality: Quality,
  ): Promise<void>;
  createProducer(
    roomId: string,
    transportId: string,
    clientId: string,
    rtpParameters: object,
    mediaKind: MediaKind,
    mediaType: MediaType,
  ): Promise<ProducerOptions>;
  createConsumer(
    roomId: string,
    producerId: string,
    rtpCapabilities: object,
    clientId: string,
  ): Promise<ConsumerOptions>;

  createMessage(
    roomId: string,
    messageBody: string,
    receiverId?: string,
  ): Promise<Message>;
  getRouter(roomId: string): Promise<RouterOptions>;

  getRoom(): Promise<Room | undefined>;
  getUserRooms(): Promise<Room[] | undefined>;
  getRoomById(roomId: string): Promise<Room>;
  getUserById(userId: string): Promise<User>;
  getProducer(roomId: string): Promise<ProducerOptions>;
  getProducers(roomId: string): Promise<ProducerOptions[]>;

  getParticipants(roomId: string): Promise<Participant[]>;
  getParticipantsTracks(roomId: string): Promise<ParticipantMedia[]>;

  getMessages(roomId: string): Promise<Message[]>;
  onNewMessage(roomId: string, userId: string): Promise<Observable<Message>>;

  getRecords(): Promise<Record[]>;

  raiseHand(roomId: string, raiseHand: boolean): Promise<boolean>;

  startRecording(
    roomId: string,
    producerId?: string,
    audioProducerId?: string,
  ): Promise<boolean>;
  stopRecording(roomId?: string): Promise<boolean>;
  deleteRecord(id: string): Promise<void>;

  closeRoom(roomId: string): Promise<boolean>;
  leaveRoom(roomId: string): Promise<void>;

  saveResume(resume: Resume): Promise<void>;
  getResume(): Promise<Resume>;
  getResumeLink(): Promise<string>;

  updateUserImage(fileId: string): Promise<string>;
  updateUserLogoImage(fileId: string): Promise<string>;
  updateUserBackgroundImage(fileId: string): Promise<string>;
  uploadFile(fileName: string, file: File): Promise<string>;
  uploadResume(fileId: string): Promise<string>;
  onRoomChanges(roomId: string): Promise<Observable<Room>>;

  mute(
    action: MuteAction,
    source: MuteMediaSource,
    userId: string,
    roomId: string,
    producerId: string,
  ): Promise<void>;
  muteAll(action: MuteAction, userId: string, roomId: string): Promise<boolean>;
  kick(userId: string, roomId: string): Promise<boolean>;

  getAvikastFiles(
    parent: string | undefined,
  ): Promise<{directories: AvikastDirectory[]; files: AvikastFile[]}>;

  addAvikastFile(
    name: string,
    fileId: string,
    parent: string | undefined,
  ): Promise<AvikastFile>;
  createAvikastDirectory(name: string, parent: string | undefined): Promise<AvikastFile>;
  deleteAvikastFile(id: string): Promise<void>;
  deleteAvikastDirectory(id: string): Promise<void>;

  playPauseMedia(media: PlayingType, status: boolean, roomId: string): Promise<void>;

  getReferrersByUserId(id: string): Promise<User[]>;
}
