import GraphqlApiBase from '@spryrocks/react-api/graphql/ApiBase';
import {
  addAvikastFileMutation,
  closeRoomMutation,
  createAvikastDirectoryMutation,
  deleteAvikastDirectoryMutation,
  deleteAvikastFileMutation,
  getBookmarksQuery,
  getFilesQuery,
  getMessagesQuery,
  getRecordsQuery,
  getRoomQuery,
  getRoomQueryById,
  getRouterQuery,
  joinRoomMutation,
  leaveRoomMutation,
  messageSubscription,
  mutationAddBookmark,
  mutationConnectTransport,
  mutationCreateConsumer,
  mutationCreateMessage,
  mutationCreateProducer,
  mutationCreateRoom,
  mutationCreateTransport,
  mutationUserProfile,
  muteMutation,
  myAccountQuery,
  participantsQuery,
  participantsTracksQuery,
  queryGetProducer,
  queryGetProducers,
  raiseHandMutation,
  startRecordingQuery,
  stopRecordingQuery,
  kickMutation,
  roomChanges,
  muteAllMutation,
  playPauseMediaMutation,
  deleteRecordMutation,
  mutationUpdateUserImage,
  getReferrersByUserIdQuery,
  getUserReferrersQuery,
  getUserRoomsQuery,
  saveResumeMutation,
  getResumeQuery,
  mutationUpdateUserLogoImage,
  mutationUpdateUserBackgroundImage,
  getUserByIdQuery,
  getImagesQuery,
  getResumeLinkQuery,
  mutationUploadResume,
} from './AvikastGraphqlQueryBuilder';
import {Direction, PlayingType, Quality} from 'entities/Mediasoup';
import {
  GQLMediaKind,
  GQLMediaType,
  GQLRoomType,
  GQLUserUpdateRequest,
} from 'api/graphql/types';
import {MuteAction, MuteMediaSource} from 'entities/Participant';
import Resume from 'entities/Resume';

export default class AvikastGraphqlApi extends GraphqlApiBase {
  public async queryMyAccount() {
    const acc = await this.query(myAccountQuery());
    return acc;
  }

  public mutationUserProfile(updateRequest: GQLUserUpdateRequest) {
    return this.mutation(mutationUserProfile({updateRequest}));
  }

  public updateUserImage(fileId: string) {
    return this.mutation(mutationUpdateUserImage({fileId}));
  }

  public updateUserLogoImage(fileId: string) {
    return this.mutation(mutationUpdateUserLogoImage({fileId}));
  }

  public updateUserBackgroundImage(fileId: string) {
    return this.mutation(mutationUpdateUserBackgroundImage({fileId}));
  }

  public async createRoom(
    name: string,
    type: GQLRoomType,
    passwordProtected: boolean,
    password: string | undefined,
  ) {
    return this.mutation(
      mutationCreateRoom({
        name,
        type,
        passwordProtected,
        password,
      }),
    );
  }

  public async createMessage(roomId: string, messageBody: string, receiverId?: string) {
    return this.mutation(
      mutationCreateMessage({
        roomId,
        messageBody,
        receiverId,
      }),
    );
  }

  public async onNewMessage(roomId: string, userId: string) {
    return this.subscribe(messageSubscription({roomId, userId}));
  }

  public async joinRoom(inviteLink: string, password: string | undefined) {
    return this.mutation(joinRoomMutation({inviteLink, password}));
  }

  public async createTransport(roomId: string, direction: Direction, clientId: string) {
    return this.mutation(mutationCreateTransport({roomId, direction, clientId}));
  }

  public async connectTransport(
    roomId: string,
    dtlsParameters: object,
    direction: Direction,
    clientId: string,
    quality: Quality,
  ) {
    return this.mutation(
      mutationConnectTransport({
        roomId,
        dtlsParameters,
        direction,
        clientId,
        quality,
      }),
    );
  }

  public async getBookmarks() {
    return this.query(getBookmarksQuery());
  }

  public async getUserReferrers() {
    return this.query(getUserReferrersQuery());
  }

  public async addBookmark(text: string, roomId: string) {
    return this.mutation(mutationAddBookmark({text, roomId}));
  }

  public async createProducer(
    roomId: string,
    transportId: string,
    clientId: string,
    rtpParameters: object,
    mediaKind: GQLMediaKind,
    mediaType: GQLMediaType,
  ) {
    return this.mutation(
      mutationCreateProducer({
        roomId,
        transportId,
        clientId,
        rtpParameters,
        mediaKind,
        mediaType,
      }),
    );
  }

  public async createConsumer(
    producerId: string,
    rtpCapabilities: object,
    roomId: string,
    clientId: string,
  ) {
    return this.mutation(
      mutationCreateConsumer({
        producerId,
        rtpCapabilities,
        roomId,
        clientId,
      }),
    );
  }

  public async getRouter(roomId: string) {
    return this.query(getRouterQuery({roomId}));
  }

  public async getMessages(roomId: string) {
    return this.query(getMessagesQuery({roomId}));
  }

  public async getRoom() {
    return this.query(getRoomQuery());
  }

  public async getUserRooms() {
    return this.query(getUserRoomsQuery());
  }

  public async getRoomById(roomId: string) {
    return this.query(getRoomQueryById({roomId}));
  }

  public async getUserById(userId: string) {
    return this.query(getUserByIdQuery({userId}));
  }

  public async getProducer(roomId: string) {
    return this.query(queryGetProducer({roomId}));
  }

  public async getProducers(roomId: string) {
    return this.query(queryGetProducers({roomId}));
  }

  public async getParticipants(roomId: string) {
    return this.query(participantsQuery({roomId}));
  }

  public async getParticipantsTracks(roomId: string) {
    return this.query(participantsTracksQuery({roomId}));
  }

  public async getRecords() {
    return this.query(getRecordsQuery());
  }

  public async startRecording(
    roomId: string,
    producerId?: string,
    audioProducerId?: string,
  ) {
    return this.query(startRecordingQuery({roomId, producerId, audioProducerId}));
  }

  public async stopRecording(roomId?: string) {
    return this.query(stopRecordingQuery({roomId}));
  }

  public async deleteRecord(id: string) {
    await this.mutation(deleteRecordMutation({id}));
  }

  public async raiseHand(roomId: string, raiseHand: boolean) {
    return this.query(raiseHandMutation({roomId, raiseHand}));
  }

  public async leaveRoom(roomId: string) {
    return this.query(leaveRoomMutation({roomId}));
  }

  public async closeRoom(roomId: string) {
    return this.query(closeRoomMutation({roomId}));
  }

  public async onRoomChanges(roomId: string) {
    return this.subscribe(roomChanges({roomId}));
  }

  public async mute(
    action: MuteAction,
    source: MuteMediaSource,
    userId: string,
    roomId: string,
    producerId: string,
  ) {
    return this.mutation(muteMutation({action, source, userId, roomId, producerId}));
  }

  public async muteAll(action: MuteAction, userId: string, roomId: string) {
    return this.mutation(muteAllMutation({action, userId, roomId}));
  }

  public async kick(userId: string, roomId: string) {
    return this.mutation(kickMutation({userId, roomId}));
  }

  public async getFiles(parent: string | undefined) {
    return this.query(getFilesQuery({parent}));
  }

  public async getImages() {
    return this.query(getImagesQuery());
  }

  public async addAvikastFile(name: string, fileId: string, parent: string | undefined) {
    return this.mutation(addAvikastFileMutation({name, fileId, parent}));
  }

  public async createAvikastDirectory(name: string, parent: string | undefined) {
    return this.mutation(createAvikastDirectoryMutation({name, parent}));
  }

  public async deleteAvikastFile(id: string) {
    await this.mutation(deleteAvikastFileMutation({id}));
  }

  public async deleteAvikastDirectory(id: string) {
    await this.mutation(deleteAvikastDirectoryMutation({id}));
  }

  public async playPauseMedia(media: PlayingType, status: boolean, roomId: string) {
    await this.mutation(playPauseMediaMutation({media, status, roomId}));
  }

  public async getReferrersByUserId(userId: string) {
    return this.query(getReferrersByUserIdQuery({userId}));
  }

  public async saveResume(resume: Resume) {
    await this.mutation(saveResumeMutation({resume}));
  }

  public async getResume() {
    const res = await this.query(getResumeQuery());
    return res;
  }

  public async getResumeLink() {
    const link = await this.query(getResumeLinkQuery());
    return link;
  }

  public uploadResume(fileId: string) {
    return this.mutation(mutationUploadResume({fileId}));
  }
}
