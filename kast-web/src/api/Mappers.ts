import ApiRegisterRequest from 'api/entities/RegisterRequest';
import LoginRequest from '@spryrocks/react-auth/LoginRequest';
import ApiLoginRequest from 'api/entities/LoginRequest';
import {Account} from 'entities/Account';
import User from 'entities/User';
import ApiConfiguration, {
  getApiConnectionOptions,
} from '@spryrocks/react-api/ApiConfiguration';
import RegisterRequest from 'auth/RegisterRequest';
import {
  GQLAccount,
  GQLAvikastFile,
  GQLAvikastFileType,
  GQLMediaKind,
  GQLMediaType,
  GQLMessage,
  GQLParticipant,
  GQLParticipantMedia,
  GQLParticipantRole,
  GQLParticipantTrackOptions,
  GQLRecord,
  GQLResumeInput,
  GQLRoom,
  GQLRoomType,
  GQLUser,
  GQLUserUpdateRequest,
} from './graphql/types';
import Room, {RoomType} from 'entities/Room';
import Participant, {
  ParticipantMedia,
  ParticipantRole,
  ParticipantTrack,
} from 'entities/Participant';
import Message from '../entities/Message';
import {MediaKind, MediaType} from 'entities/Mediasoup';
import formatDate from 'date-fns/format';
import Record from 'entities/Record';
import UpdateUserRequest from 'state/ducks/userProfile/models';
import {AvikastDirectory, AvikastFile} from 'entities/AvikastFiles';
import Resume from 'entities/Resume';

export const mapImageFromGQL = (
  configuration: ApiConfiguration,
  imageId: string,
): string => {
  if (!configuration.rest) throw new Error('Rest config should be provided');
  const {baseUrl} = getApiConnectionOptions(configuration);
  return `${baseUrl}${configuration.rest.path}/files/${imageId}`;
};

export const mapUserDateFromGQL = (date: string | null): Date | null => {
  if (!date) {
    const dateNew = new Date(date!);
    return dateNew;
  }
  return null;
};

export const mapDateFromGQL = (date: string): Date => {
  const dateNew = new Date(date!);
  return dateNew;
};

export const mapDateToGQL = (date: Date): string => {
  return date.toString();
};

export const mapRegisterRequestToApi = (
  registerRequest: RegisterRequest,
): ApiRegisterRequest => ({
  name: registerRequest.name,
  email: registerRequest.email,
  password: registerRequest.password,
  referralCode: registerRequest.referralCode,
});

export const mapLoginRequestToApi = (loginRequest: LoginRequest): ApiLoginRequest => ({
  email: loginRequest.email,
  password: loginRequest.password,
});

export const mapUserFromGQL = (configuration: ApiConfiguration, user: GQLUser): User => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    country: user.country,
    city: user.city,
    // @ts-ignore
    position: user.position,
    // @ts-ignore
    telephone: user.telephone,
    dateOfBirth: user.dateOfBirth ? mapUserDateFromGQL(user.dateOfBirth) : null,
    avatarUrl: mapImageFromGQL(configuration, user.avatarUrl),
    tags: user.tags,
    skills: user.skills,
    // @ts-ignore
    mission: user.mission,
    // @ts-ignore
    vision: user.vision,
    // @ts-ignore
    interests: user.interests,
    referralCode: user.referralCode,
    referrer: user.referrer ? mapUserFromGQL(configuration, user.referrer) : undefined,
    logoUrl: user.logoUrl ? mapImageFromGQL(configuration, user.logoUrl) : undefined,
    backgroundUrl: user.backgroundUrl
      ? mapImageFromGQL(configuration, user.backgroundUrl)
      : undefined,
    resumeUrl: user.resumeUrl
      ? mapImageFromGQL(configuration, user.resumeUrl)
      : undefined,
  };
};

export const mapUsersFromGQL = (
  configuration: ApiConfiguration,
  users: GQLUser[],
): User[] => users.map((user) => mapUserFromGQL(configuration, user));

export const mapUserUpdateRequestToGQL = (
  updateRequest: UpdateUserRequest,
): GQLUserUpdateRequest => {
  return {
    name: updateRequest.name,
    dateOfBirth: updateRequest.dateOfBirth
      ? mapDateToGQL(updateRequest.dateOfBirth)
      : undefined,
    country: updateRequest.country,
    city: updateRequest.city,
    // @ts-ignore
    position: updateRequest.position,
    telephone: updateRequest.telephone,
    tags: updateRequest.tags,
    skills: updateRequest.skills,
    mission: updateRequest.mission,
    vision: updateRequest.vision,
    interests: updateRequest.interests,
    referralCode: updateRequest.referralCode,
  };
};

export const mapMyAccountFromGQL = (
  configuration: ApiConfiguration,
  account: GQLAccount,
): Account => ({
  user: mapUserFromGQL(configuration, account.user),
});

export const mapRoomTypeFromGQL = (roomType: GQLRoomType): RoomType => {
  switch (roomType) {
    case GQLRoomType.Meeting:
      return RoomType.Meeting;
    case GQLRoomType.Webinar:
      return RoomType.Webinar;
  }
};

export const mapRoomTypeToGQL = (roomType: RoomType): GQLRoomType => {
  switch (roomType) {
    case RoomType.Meeting:
      return GQLRoomType.Meeting;
    case RoomType.Webinar:
      return GQLRoomType.Webinar;
  }
};

export const mapParticipantRoleFromGQL = (role: GQLParticipantRole): ParticipantRole => {
  switch (role) {
    case GQLParticipantRole.Owner:
      return ParticipantRole.Owner;
    case GQLParticipantRole.Participant:
      return ParticipantRole.User;
  }
};

export const mapParticipantTrackOptionsFromGQL = (
  trackOptions: GQLParticipantTrackOptions,
): ParticipantTrack =>
  <ParticipantTrack>{
    enabled: trackOptions.enabled,
    userId: trackOptions.userId,
    muted: trackOptions.muted,
    producerOptions: trackOptions.producerOptions,
    mediaKind: trackOptions.mediaKind,
    mediaType: trackOptions.mediaType,
  };

export const mapParticipantMediaFromGQL = (
  participantMedia: GQLParticipantMedia,
): ParticipantMedia => ({
  userName: participantMedia.userName,
  audio: mapParticipantTrackOptionsFromGQL(participantMedia.audio),
  video: mapParticipantTrackOptionsFromGQL(participantMedia.video),
  screen: mapParticipantTrackOptionsFromGQL(participantMedia.screen),
});

export const mapParticipantFromGQL = (
  configuration: ApiConfiguration,
  participant: GQLParticipant,
): Participant => ({
  id: participant.id,
  user: mapUserFromGQL(configuration, participant.user),
  role: mapParticipantRoleFromGQL(participant.role),
  media: mapParticipantMediaFromGQL(participant.media),
  raiseHand: participant.raiseHand ? participant.raiseHand : undefined,
  kicked: participant.kicked,
  muted: participant.muted,
});

export const mapParticipantsFromGQL = (
  configuration: ApiConfiguration,
  participants: GQLParticipant[],
): Participant[] =>
  participants.map((participant) => mapParticipantFromGQL(configuration, participant));

export const mapMessageFromGQL = (
  configuration: ApiConfiguration,
  message: GQLMessage,
): Message => ({
  id: message.id,
  sender: mapUserFromGQL(configuration, message.sender),
  roomId: message.roomId,
  body: message.body,
  date: formatDate(new Date(message.date), 'hh:mm'),
  receiverId: message.receiverId,
});

export const mapMessagesFromGQL = (
  configuration: ApiConfiguration,
  messages: GQLMessage[],
): Message[] => messages.map((messages) => mapMessageFromGQL(configuration, messages));

export const mapMediaKindToGQL = (mediaKind: MediaKind): GQLMediaKind => {
  switch (mediaKind) {
    case MediaKind.Audio:
      return GQLMediaKind.Audio;
    case MediaKind.Video:
      return GQLMediaKind.Video;
  }
};

export const mapMediaTypeToGQL = (mediaType: MediaType): GQLMediaType => {
  switch (mediaType) {
    case MediaType.UserMedia:
      return GQLMediaType.UserMedia;
    case MediaType.ScreenShare:
      return GQLMediaType.ScreenShare;
  }
};

export const mapFileFromGQL = (
  configuration: ApiConfiguration,
  fileId: string,
): string => {
  if (!configuration.rest) throw new Error('Rest config should be provided');
  const {baseUrl} = getApiConnectionOptions(configuration);
  return `${baseUrl}${configuration.rest.path}/files/${fileId}`;
};

export const mapRecordFromGQL = (
  configuration: ApiConfiguration,
  record: GQLRecord,
): Record => ({
  id: record.id,
  name: record.name,
  date: mapDateFromGQL(record.date),
  fileUrl: mapFileFromGQL(configuration, record.fileId),
});

export const mapRecordsFromGQL = (
  configuration: ApiConfiguration,
  records: GQLRecord[],
): Record[] => records.map((record) => mapRecordFromGQL(configuration, record));

export const mapRoomFromGQL = (configuration: ApiConfiguration, room: GQLRoom): Room => ({
  id: room.id,
  closed: room.closed ? mapDateFromGQL(room.closed) : undefined,
  name: room.name,
  inviteLink: room.inviteLink,
  type: mapRoomTypeFromGQL(room.type),
  user: mapUserFromGQL(configuration, room.user),
  participants: mapParticipantsFromGQL(configuration, room.participants),
});

export const mapAvikastFileFromGQL = (
  configuration: ApiConfiguration,
  file: GQLAvikastFile,
): AvikastFile => {
  if (!file.fileId) throw new Error('fileId is undefined');
  return {
    id: file.id,
    name: file.name,
    fileUrl: mapFileFromGQL(configuration, file.fileId),
  };
};

export const mapAvikastDirectoryFromGQL = (
  configuration: ApiConfiguration,
  file: GQLAvikastFile,
): AvikastDirectory => ({
  id: file.id,
  name: file.name,
});

export const mapAvikastFilesFromGQL = (
  configuration: ApiConfiguration,
  files: GQLAvikastFile[],
): {directories: AvikastDirectory[]; files: AvikastFile[]} => ({
  directories: files
    .filter((file) => file.type === GQLAvikastFileType.Directory)
    .map((file) => mapAvikastDirectoryFromGQL(configuration, file)),
  files: files
    .filter((file) => file.type === GQLAvikastFileType.File)
    .map((file) => mapAvikastFileFromGQL(configuration, file)),
});

export const mapRoomFromWithUndefinedGQL = (
  configuration: ApiConfiguration,
  room: GQLRoom,
): Room | undefined => {
  if (room) {
    return {
      id: room.id,
      closed: room.closed ? mapDateFromGQL(room.closed) : undefined,
      name: room.name,
      inviteLink: room.inviteLink,
      type: mapRoomTypeFromGQL(room.type),
      user: mapUserFromGQL(configuration, room.user),
      participants: mapParticipantsFromGQL(configuration, room.participants),
    };
  }
  return undefined;
};

export const mapRoomsFromGQL = (
  rooms: GQLRoom[],
  configuration: ApiConfiguration,
): Room[] | undefined => {
  return rooms.map((room) => mapRoomFromGQL(configuration, room));
};

// @ts-ignore
export const mapResumeFromGQL = (resume: GQLResumeInput): Resume => {
  if (resume) {
    return {
      summary: resume.summary,
      experience: resume.experience,
      education: resume.experience,
      awards: resume.experience,
    };
  }
};
