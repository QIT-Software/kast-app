import {IAvikastApi} from 'api/IAvikastApi';
import RegisterRequest from './entities/RegisterRequest';
import LoginRequest from './entities/LoginRequest';
import RestApi from 'api/rest/RestApi';
import ApiConfiguration from '@spryrocks/react-api/ApiConfiguration';
import AvikastGraphqlApi from 'api/graphql/AvikastGraphqlApi';
import {
  mapAvikastFilesFromGQL,
  mapMediaKindToGQL,
  mapMediaTypeToGQL,
  mapMessageFromGQL,
  mapMessagesFromGQL,
  mapMyAccountFromGQL,
  mapParticipantsFromGQL,
  mapRecordsFromGQL,
  mapResumeFromGQL,
  mapRoomFromGQL,
  mapRoomFromWithUndefinedGQL,
  mapUsersFromGQL,
  mapRoomsFromGQL,
  mapUserUpdateRequestToGQL,
  mapUserFromGQL,
  mapFileFromGQL,
} from 'api/Mappers';
import ForgotPasswordRequest from 'api/entities/ForgotPasswordRequest';
import ApiDelegate, {AuthInfo} from '@spryrocks/react-api/ApiDelegate';
import ApiBase from '@spryrocks/react-api/ApiBase';
import UpdateFirebaseTokenRequest from 'api/entities/UpdateFirebaseTokenRequest';
import IApiTokenHolder from '@spryrocks/react-api/IApiTokenHolder';
import UpdateUserRequest from 'state/ducks/userProfile/models';
import Room, {RoomType} from 'entities/Room';
import {Direction, MediaKind, MediaType, PlayingType, Quality} from 'entities/Mediasoup';
import {mapRoomTypeToGQL} from './Mappers';
import Message from '../entities/Message';
import {MuteAction, MuteMediaSource} from 'entities/Participant';
import User from 'entities/User';
import MyLogger from 'utils/MyLogger';
import Resume from 'entities/Resume';

export default class AvikastApi extends ApiBase implements IAvikastApi {
  private readonly restApi: RestApi;

  private readonly logger: MyLogger;

  private readonly graphqlApi: AvikastGraphqlApi;

  constructor(
    configuration: ApiConfiguration,
    delegate: ApiDelegate,
    tokenHolder: IApiTokenHolder,
  ) {
    super(configuration, delegate, tokenHolder);
    if (!configuration.graphql) throw new Error('GraphQL api config should be provided');
    this.graphqlApi = new AvikastGraphqlApi(
      this.baseUrl,
      this.wsBaseUrl,
      configuration.graphql,
      this.delegate,
    );
    if (!configuration.rest) throw new Error('Rest api config should be provided');
    this.restApi = new RestApi(this.baseUrl, configuration.rest, this.delegate);
    this.logger = new MyLogger();
  }

  protected async refreshToken(refreshToken: string): Promise<AuthInfo> {
    const session = await this.restApi.refresh({refreshToken});
    return {accessToken: session.jwt, refreshToken: session.refreshToken};
  }

  public async register(request: RegisterRequest) {
    return this.restApi.register(request);
  }

  public async login(request: LoginRequest) {
    return this.restApi.login(request);
  }

  public async myAccount() {
    const acc = await this.wrapApiCall(async () => {
      return mapMyAccountFromGQL(
        this.configuration,
        await this.graphqlApi.queryMyAccount(),
      );
    });
    return acc;
  }

  public async forgotPassword(request: ForgotPasswordRequest) {
    return this.restApi.forgotPassword(request);
  }

  public async updateUserPassword(oldPassword: string, password: string) {
    return this.wrapApiCall(async () =>
      this.restApi.changePassword({oldPassword, password}),
    );
  }

  public async updateFirebaseToken(request: UpdateFirebaseTokenRequest) {
    return this.wrapApiCall(async () => this.restApi.updateFirebaseToken(request));
  }

  public async updateUserProfile(updateRequest: UpdateUserRequest) {
    return this.wrapApiCall(async () =>
      mapMyAccountFromGQL(
        this.configuration,
        await this.graphqlApi.mutationUserProfile(
          mapUserUpdateRequestToGQL(updateRequest),
        ),
      ),
    );
  }

  public async updateUserImage(fileId: string) {
    return this.wrapApiCall(async () => this.graphqlApi.updateUserImage(fileId));
  }

  public async updateUserLogoImage(fileId: string) {
    return this.wrapApiCall(async () => this.graphqlApi.updateUserLogoImage(fileId));
  }

  public async updateUserBackgroundImage(fileId: string) {
    return this.wrapApiCall(async () =>
      this.graphqlApi.updateUserBackgroundImage(fileId),
    );
  }

  public async getBookmarks() {
    return this.wrapApiCall(async () => this.graphqlApi.getBookmarks());
  }

  public async getUserReferrers() {
    return this.wrapApiCall(async () => this.graphqlApi.getUserReferrers());
  }

  public async addBookmark(text: string, roomId: string) {
    return this.wrapApiCall(async () => this.graphqlApi.addBookmark(text, roomId));
  }

  public async getMessages(roomId: string) {
    return this.wrapApiCall(async () =>
      mapMessagesFromGQL(this.configuration, await this.graphqlApi.getMessages(roomId)),
    );
  }

  public async createMessage(
    roomId: string,
    messageBody: string,
    receiverId?: string,
  ): Promise<Message> {
    return this.wrapApiCall(async () =>
      mapMessageFromGQL(
        this.configuration,
        await this.graphqlApi.createMessage(roomId, messageBody, receiverId),
      ),
    );
  }

  public async createRoom(
    name: string,
    type: RoomType,
    passwordProtected: boolean,
    password: string | undefined,
  ): Promise<Room> {
    return this.wrapApiCall(async () =>
      mapRoomFromGQL(
        this.configuration,
        await this.graphqlApi.createRoom(
          name,
          mapRoomTypeToGQL(type),
          passwordProtected,
          password,
        ),
      ),
    );
  }

  async joinRoom(inviteLink: string, password: string | undefined): Promise<Room> {
    return this.wrapApiCall(async () =>
      mapRoomFromGQL(
        this.configuration,
        await this.graphqlApi.joinRoom(inviteLink, password),
      ),
    );
  }

  public async createTransport(roomId: string, direction: Direction, clientId: string) {
    this.logger.logger('api createTransport', roomId);
    return this.wrapApiCall(async () =>
      this.graphqlApi.createTransport(roomId, direction, clientId),
    );
  }

  public async connectTransport(
    roomId: string,
    dtlsParameters: object,
    direction: Direction,
    clientId: string,
    quality: Quality,
  ) {
    this.logger.logger('api connectTransport', roomId);
    return this.wrapApiCall(async () =>
      this.graphqlApi.connectTransport(
        roomId,
        dtlsParameters,
        direction,
        clientId,
        quality,
      ),
    );
  }

  public async createProducer(
    roomId: string,
    transportId: string,
    clientId: string,
    rtpParameters: object,
    mediaKind: MediaKind,
    mediaType: MediaType,
  ) {
    this.logger.logger('api createProducer', roomId);
    return this.wrapApiCall(async () =>
      this.graphqlApi.createProducer(
        roomId,
        transportId,
        clientId,
        rtpParameters,
        mapMediaKindToGQL(mediaKind),
        mapMediaTypeToGQL(mediaType),
      ),
    );
  }

  public async createConsumer(
    roomId: string,
    producerId: string,
    rtpCapabilities: object,
    clientId: string,
  ) {
    this.logger.logger('api createConsumer', roomId);
    return this.wrapApiCall(async () =>
      this.graphqlApi.createConsumer(producerId, rtpCapabilities, roomId, clientId),
    );
  }

  public async getRouter(roomId: string) {
    this.logger.logger('api getRouter', roomId);
    return this.wrapApiCall(async () => this.graphqlApi.getRouter(roomId));
  }

  async getRoomById(roomId: string) {
    this.logger.logger('api getRoomById', roomId);
    return this.wrapApiCall(async () =>
      mapRoomFromGQL(this.configuration, await this.graphqlApi.getRoomById(roomId)),
    );
  }

  async getUserById(userId: string) {
    return this.wrapApiCall(async () =>
      mapUserFromGQL(this.configuration, await this.graphqlApi.getUserById(userId)),
    );
  }

  async getRoom() {
    this.logger.logger('api getProducer', 'roomId');

    return this.wrapApiCall(async () =>
      mapRoomFromWithUndefinedGQL(this.configuration, await this.graphqlApi.getRoom()),
    );
  }

  async getUserRooms() {
    this.logger.logger('get rooms', 'roomId');
    return this.wrapApiCall(async () =>
      mapRoomsFromGQL(await this.graphqlApi.getUserRooms(), this.configuration),
    );
  }

  public async getProducer(roomId: string) {
    this.logger.logger('api getProducer', roomId);

    return this.wrapApiCall(async () => this.graphqlApi.getProducer(roomId));
  }

  public async getProducers(roomId: string) {
    this.logger.logger('api getProducers', roomId);
    const producers = await this.wrapApiCall(async () =>
      this.graphqlApi.getProducers(roomId),
    );
    return producers;
  }

  public async getParticipantsTracks(roomId: string) {
    const tracks = await this.wrapApiCall(async () =>
      this.graphqlApi.getParticipantsTracks(roomId),
    );
    return tracks;
  }

  public async getParticipants(roomId: string) {
    const participants = await this.wrapApiCall(async () =>
      mapParticipantsFromGQL(
        this.configuration,
        await this.graphqlApi.getParticipants(roomId),
      ),
    );
    return participants;
  }

  public async onNewMessage(roomId: string, userId: string) {
    return this.wrapApiCall(async () =>
      (await this.graphqlApi.onNewMessage(roomId, userId)).map((m) =>
        mapMessageFromGQL(this.configuration, m),
      ),
    );
  }

  public async getRecords() {
    const records = await this.wrapApiCall(async () => this.graphqlApi.getRecords());
    return mapRecordsFromGQL(this.configuration, records);
  }

  public async startRecording(
    roomId: string,
    producerId?: string,
    audioProducerId?: string,
  ) {
    this.logger.logger('api startRecording', roomId);
    return this.wrapApiCall(async () =>
      this.graphqlApi.startRecording(roomId, producerId, audioProducerId),
    );
  }

  public async stopRecording(roomId?: string) {
    return this.wrapApiCall(async () => this.graphqlApi.stopRecording(roomId));
  }

  deleteRecord(id: string) {
    return this.wrapApiCall(async () => this.graphqlApi.deleteRecord(id));
  }

  public async raiseHand(roomId: string, raiseHand: boolean) {
    this.logger.logger('api raiseHand', roomId);
    const response = await this.wrapApiCall(async () =>
      this.graphqlApi.raiseHand(roomId, raiseHand),
    );
    return response;
  }

  public async leaveRoom(roomId: string) {
    this.logger.logger('api leaveRoom', roomId);

    await this.wrapApiCall(async () => this.graphqlApi.leaveRoom(roomId));
  }

  public async closeRoom(roomId: string) {
    this.logger.logger('api closeRoom', roomId);
    const response = await this.wrapApiCall(async () =>
      this.graphqlApi.closeRoom(roomId),
    );
    return response;
  }

  public async uploadFile(name: string, file: File) {
    return this.wrapApiCall(async () =>
      this.restApi.postFile<string>('/files', file, name),
    );
  }

  public async saveResume(resume: Resume) {
    return this.wrapApiCall(async () => this.graphqlApi.saveResume(resume));
  }

  public async getResume() {
    const resume = mapResumeFromGQL(
      await this.wrapApiCall(async () => this.graphqlApi.getResume()),
    );
    return resume;
  }

  public async getResumeLink() {
    const link = await this.wrapApiCall(async () => this.graphqlApi.getResumeLink());
    return mapFileFromGQL(this.configuration, link);
  }

  public async uploadResume(fileId: string) {
    return this.wrapApiCall(async () => this.graphqlApi.uploadResume(fileId));
  }

  public async onRoomChanges(roomId: string) {
    return this.wrapApiCall(async () => this.graphqlApi.onRoomChanges(roomId));
  }

  public async getAvikastFiles(parent: string | undefined) {
    return this.wrapApiCall(async () =>
      mapAvikastFilesFromGQL(this.configuration, await this.graphqlApi.getFiles(parent)),
    );
  }

  public async mute(
    action: MuteAction,
    source: MuteMediaSource,
    userId: string,
    roomId: string,
    producerId: string,
  ) {
    this.logger.logger('api mute', roomId);
    return this.wrapApiCall(async () =>
      this.graphqlApi.mute(action, source, userId, roomId, producerId),
    );
  }

  public async muteAll(action: MuteAction, userId: string, roomId: string) {
    this.logger.logger('api muteAll', roomId);
    return this.wrapApiCall(async () => this.graphqlApi.muteAll(action, userId, roomId));
  }

  public async kick(userId: string, roomId: string) {
    this.logger.logger('api kick', roomId);
    return this.wrapApiCall(async () => this.graphqlApi.kick(userId, roomId));
  }

  addAvikastFile(name: string, fileId: string, parent: string | undefined) {
    return this.wrapApiCall(async () =>
      this.graphqlApi.addAvikastFile(name, fileId, parent),
    );
  }

  createAvikastDirectory(name: string, parent: string | undefined) {
    return this.wrapApiCall(async () =>
      this.graphqlApi.createAvikastDirectory(name, parent),
    );
  }

  deleteAvikastFile(id: string) {
    return this.wrapApiCall(async () => this.graphqlApi.deleteAvikastFile(id));
  }

  deleteAvikastDirectory(id: string) {
    return this.wrapApiCall(async () => this.graphqlApi.deleteAvikastDirectory(id));
  }

  playPauseMedia(media: PlayingType, status: boolean, roomId: string) {
    this.logger.logger('api playPauseMedia', roomId);
    return this.wrapApiCall(async () =>
      this.graphqlApi.playPauseMedia(media, status, roomId),
    );
  }

  getReferrersByUserId(id: string): Promise<User[]> {
    return this.wrapApiCall(async () =>
      mapUsersFromGQL(this.configuration, await this.graphqlApi.getReferrersByUserId(id)),
    );
  }
}
