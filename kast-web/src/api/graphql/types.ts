export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: string;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: object;
};

export type GQLAccount = {
  __typename?: 'Account';
  user: GQLUser;
  preferences: GQLPreferences;
};

export type GQLAvikastFile = {
  __typename?: 'AvikastFile';
  id: Scalars['ID'];
  name: Scalars['String'];
  user: GQLUser;
  type: GQLAvikastFileType;
  fileId?: Maybe<Scalars['String']>;
};

export enum GQLAvikastFileType {
  File = 'File',
  Directory = 'Directory'
}

export type GQLBookmark = {
  __typename?: 'Bookmark';
  id: Scalars['ID'];
  date: Scalars['DateTime'];
  topic: Scalars['String'];
  text: Scalars['String'];
  user: GQLUser;
};

export type GQLConsumerOptions = {
  __typename?: 'ConsumerOptions';
  id: Scalars['String'];
  producerId: Scalars['String'];
  rtpParameters: Scalars['JSON'];
  appData: Scalars['JSON'];
};



export enum GQLMediaKind {
  Audio = 'audio',
  Video = 'video'
}

export enum GQLMediaType {
  UserMedia = 'userMedia',
  ScreenShare = 'screenShare'
}

export type GQLMessage = {
  __typename?: 'Message';
  id: Scalars['ID'];
  sender: GQLUser;
  roomId: Scalars['String'];
  body: Scalars['String'];
  date: Scalars['DateTime'];
  receiverId: Scalars['String'];
};

export type GQLMutation = {
  __typename?: 'Mutation';
  updateMyAccount: GQLAccount;
  updateUserImage: Scalars['Boolean'];
  updateUserLogoImage: Scalars['Boolean'];
  updateUserBackgroundImage: Scalars['Boolean'];
  banUsersTemporary: Scalars['Boolean'];
  banUsersPermanently: Scalars['Boolean'];
  restoreUsers: Scalars['Boolean'];
  deleteUsers: Scalars['Boolean'];
  createRoom: GQLRoom;
  deleteRooms: Scalars['Boolean'];
  joinRoom: GQLRoom;
  raiseHand: Scalars['Boolean'];
  leaveRoom: Scalars['Boolean'];
  closeRoom: Scalars['Boolean'];
  mute: Scalars['Boolean'];
  muteAll: Scalars['Boolean'];
  kick: Scalars['Boolean'];
  createTransport: GQLTransportOptions;
  connectTransport: Scalars['Boolean'];
  createProducer: GQLProducerOptions;
  createConsumer: GQLConsumerOptions;
  playPauseMedia: Scalars['Boolean'];
  addBookmark: Array<Scalars['Boolean']>;
  createMessage: GQLMessage;
  deleteRecord: Scalars['Boolean'];
  addAvikastFile: GQLAvikastFile;
  createAvikastDirectory: GQLAvikastFile;
  deleteAvikastFile: Scalars['Boolean'];
  deleteAvikastDirectory: Scalars['Boolean'];
  saveResume: Scalars['Boolean'];
};


export type GQLMutationUpdateMyAccountArgs = {
  user: GQLUserUpdateRequest;
};


export type GQLMutationUpdateUserImageArgs = {
  fileId: Scalars['String'];
};


export type GQLMutationUpdateUserLogoImageArgs = {
  fileId: Scalars['String'];
};


export type GQLMutationUpdateUserBackgroundImageArgs = {
  fileId: Scalars['String'];
};


export type GQLMutationBanUsersTemporaryArgs = {
  untilDate: Scalars['String'];
  userIds: Array<Scalars['String']>;
};


export type GQLMutationBanUsersPermanentlyArgs = {
  userIds: Array<Scalars['String']>;
};


export type GQLMutationRestoreUsersArgs = {
  userIds: Array<Scalars['String']>;
};


export type GQLMutationDeleteUsersArgs = {
  userIds: Array<Scalars['String']>;
};


export type GQLMutationCreateRoomArgs = {
  password?: Maybe<Scalars['String']>;
  passwordProtected: Scalars['Boolean'];
  type: GQLRoomType;
  name: Scalars['String'];
};


export type GQLMutationDeleteRoomsArgs = {
  roomIds: Array<Scalars['String']>;
};


export type GQLMutationJoinRoomArgs = {
  password?: Maybe<Scalars['String']>;
  inviteLink: Scalars['String'];
};


export type GQLMutationRaiseHandArgs = {
  raiseHand: Scalars['Boolean'];
  roomId: Scalars['String'];
};


export type GQLMutationLeaveRoomArgs = {
  roomId: Scalars['String'];
};


export type GQLMutationCloseRoomArgs = {
  roomId: Scalars['String'];
};


export type GQLMutationMuteArgs = {
  producerId: Scalars['String'];
  roomId: Scalars['String'];
  userId: Scalars['String'];
  source: Scalars['String'];
  action: Scalars['String'];
};


export type GQLMutationMuteAllArgs = {
  roomId: Scalars['String'];
  userId: Scalars['String'];
  action: Scalars['String'];
};


export type GQLMutationKickArgs = {
  roomId: Scalars['String'];
  userId: Scalars['String'];
};


export type GQLMutationCreateTransportArgs = {
  clientId: Scalars['String'];
  direction: Scalars['String'];
  roomId: Scalars['String'];
};


export type GQLMutationConnectTransportArgs = {
  quality: Scalars['String'];
  clientId: Scalars['String'];
  direction: Scalars['String'];
  dtlsParameters: Scalars['JSON'];
  roomId: Scalars['String'];
};


export type GQLMutationCreateProducerArgs = {
  mediaType: GQLMediaType;
  mediaKind: GQLMediaKind;
  rtpParameters: Scalars['JSON'];
  clientId: Scalars['String'];
  roomId: Scalars['String'];
  transportId: Scalars['String'];
};


export type GQLMutationCreateConsumerArgs = {
  clientId: Scalars['String'];
  rtpCapabilities: Scalars['JSON'];
  roomId: Scalars['String'];
  producerId: Scalars['String'];
};


export type GQLMutationPlayPauseMediaArgs = {
  roomId: Scalars['String'];
  status: Scalars['Boolean'];
  media: Scalars['String'];
};


export type GQLMutationAddBookmarkArgs = {
  roomId: Scalars['String'];
  text: Scalars['String'];
};


export type GQLMutationCreateMessageArgs = {
  receiverId?: Maybe<Scalars['String']>;
  messageBody: Scalars['String'];
  roomId: Scalars['String'];
};


export type GQLMutationDeleteRecordArgs = {
  id: Scalars['String'];
};


export type GQLMutationAddAvikastFileArgs = {
  parent?: Maybe<Scalars['String']>;
  fileId: Scalars['String'];
  name: Scalars['String'];
};


export type GQLMutationCreateAvikastDirectoryArgs = {
  parent?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};


export type GQLMutationDeleteAvikastFileArgs = {
  id: Scalars['String'];
};


export type GQLMutationDeleteAvikastDirectoryArgs = {
  id: Scalars['String'];
};


export type GQLMutationSaveResumeArgs = {
  resume: GQLResumeInput;
};

export type GQLParticipant = {
  __typename?: 'Participant';
  id: Scalars['ID'];
  user: GQLUser;
  role: GQLParticipantRole;
  media: GQLParticipantMedia;
  raiseHand?: Maybe<Scalars['Boolean']>;
  kicked: Scalars['Boolean'];
  muted: Scalars['Boolean'];
};

export type GQLParticipantMedia = {
  __typename?: 'ParticipantMedia';
  userName: Scalars['String'];
  audio: GQLParticipantTrackOptions;
  video: GQLParticipantTrackOptions;
  screen: GQLParticipantTrackOptions;
};

export enum GQLParticipantRole {
  Owner = 'Owner',
  Participant = 'Participant'
}

export type GQLParticipantTrackOptions = {
  __typename?: 'ParticipantTrackOptions';
  enabled: Scalars['Boolean'];
  muted: Scalars['Boolean'];
  clientId?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
  producerOptions?: Maybe<Scalars['JSON']>;
  mediaKind?: Maybe<Scalars['String']>;
  mediaType?: Maybe<Scalars['String']>;
};

export type GQLPreferences = {
  __typename?: 'Preferences';
  allowNotifications: Scalars['Boolean'];
};

export type GQLProducerOptions = {
  __typename?: 'ProducerOptions';
  id: Scalars['String'];
  kind: Scalars['String'];
  rtpParameters: Scalars['JSON'];
  appData: Scalars['JSON'];
};

export type GQLQuery = {
  __typename?: 'Query';
  myAccount: GQLAccount;
  users: Array<GQLUser>;
  referrersByUserId: Array<GQLUser>;
  userById: GQLUser;
  rooms: Array<GQLRoom>;
  roomById: GQLRoom;
  room?: Maybe<GQLRoom>;
  userRooms?: Maybe<Array<GQLRoom>>;
  participants: Array<GQLParticipant>;
  participantsTracks: Array<GQLParticipantMedia>;
  webinarOwner: GQLParticipant;
  inviteLinkByRoomById: Scalars['String'];
  getRouter: GQLRouterOptions;
  getProducer: GQLProducerOptions;
  getProducers: Array<GQLProducerOptions>;
  startRecording: Scalars['Boolean'];
  stopRecording: Scalars['Boolean'];
  bookmarks: Array<GQLBookmark>;
  messagesByRoom: Array<GQLMessage>;
  messageById: GQLMessage;
  records: Array<GQLRecord>;
  avikastFiles: Array<GQLAvikastFile>;
  getImages: Array<GQLAvikastFile>;
  getResume?: Maybe<GQLResumeOutput>;
  getResumeLink?: Maybe<Scalars['String']>;
};


export type GQLQueryReferrersByUserIdArgs = {
  userId: Scalars['String'];
};


export type GQLQueryUserByIdArgs = {
  userId: Scalars['String'];
};


export type GQLQueryRoomByIdArgs = {
  roomId: Scalars['String'];
};


export type GQLQueryParticipantsArgs = {
  roomId: Scalars['String'];
};


export type GQLQueryParticipantsTracksArgs = {
  roomId: Scalars['String'];
};


export type GQLQueryWebinarOwnerArgs = {
  roomId: Scalars['String'];
};


export type GQLQueryInviteLinkByRoomByIdArgs = {
  roomId: Scalars['String'];
};


export type GQLQueryGetRouterArgs = {
  roomId: Scalars['String'];
};


export type GQLQueryGetProducerArgs = {
  roomId: Scalars['String'];
};


export type GQLQueryGetProducersArgs = {
  roomId: Scalars['String'];
};


export type GQLQueryStartRecordingArgs = {
  audioProducerId?: Maybe<Scalars['String']>;
  producerId?: Maybe<Scalars['String']>;
  roomId: Scalars['String'];
};


export type GQLQueryStopRecordingArgs = {
  audioProducerId?: Maybe<Scalars['String']>;
  producerId?: Maybe<Scalars['String']>;
  roomId?: Maybe<Scalars['String']>;
};


export type GQLQueryMessagesByRoomArgs = {
  roomId: Scalars['String'];
};


export type GQLQueryMessageByIdArgs = {
  messageId: Scalars['String'];
};


export type GQLQueryAvikastFilesArgs = {
  parent?: Maybe<Scalars['String']>;
};

export type GQLRecord = {
  __typename?: 'Record';
  id: Scalars['String'];
  name: Scalars['String'];
  date: Scalars['DateTime'];
  fileId: Scalars['String'];
};

export type GQLResumeInput = {
  summary: Scalars['String'];
  experience: Scalars['String'];
  education: Scalars['String'];
  awards: Scalars['String'];
};

export type GQLResumeOutput = {
  __typename?: 'ResumeOutput';
  summary: Scalars['String'];
  experience: Scalars['String'];
  education: Scalars['String'];
  awards: Scalars['String'];
};

export type GQLRoom = {
  __typename?: 'Room';
  id: Scalars['ID'];
  closed?: Maybe<Scalars['DateTime']>;
  name: Scalars['String'];
  inviteLink: Scalars['String'];
  type: GQLRoomType;
  user: GQLUser;
  participants: Array<GQLParticipant>;
};

export enum GQLRoomType {
  Meeting = 'Meeting',
  Webinar = 'Webinar'
}

export type GQLRouterOptions = {
  __typename?: 'RouterOptions';
  rtpCapabilities: Scalars['JSON'];
};

export type GQLSubscription = {
  __typename?: 'Subscription';
  roomSub: GQLRoom;
  messageAdded: GQLMessage;
};


export type GQLSubscriptionRoomSubArgs = {
  roomId: Scalars['String'];
};


export type GQLSubscriptionMessageAddedArgs = {
  userId: Scalars['String'];
  roomId: Scalars['String'];
};

export type GQLTransportOptions = {
  __typename?: 'TransportOptions';
  id: Scalars['String'];
  iceCandidates: Scalars['JSON'];
  iceParameters: Scalars['JSON'];
  dtlsParameters: Scalars['JSON'];
};

export type GQLUser = {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
  email: Scalars['String'];
  country: Scalars['String'];
  city: Scalars['String'];
  position: Scalars['String'];
  telephone: Scalars['String'];
  dateOfBirth?: Maybe<Scalars['String']>;
  avatarUrl: Scalars['String'];
  tags: Array<Scalars['String']>;
  skills: Array<Scalars['String']>;
  mission: Array<Scalars['String']>;
  vision: Array<Scalars['String']>;
  interests: Array<Scalars['String']>;
  referralCode: Scalars['String'];
  banUntilDate?: Maybe<Scalars['DateTime']>;
  banForever?: Maybe<Scalars['Boolean']>;
  referrer?: Maybe<GQLUser>;
  logoUrl?: Maybe<Scalars['String']>;
  backgroundUrl?: Maybe<Scalars['String']>;
  resumeUrl?: Maybe<Scalars['String']>;
};

export type GQLUserUpdateRequest = {
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['String']>;
  telephone?: Maybe<Scalars['String']>;
  dateOfBirth?: Maybe<Scalars['DateTime']>;
  tags?: Maybe<Array<Scalars['String']>>;
  skills?: Maybe<Array<Scalars['String']>>;
  mission?: Maybe<Array<Scalars['String']>>;
  vision?: Maybe<Array<Scalars['String']>>;
  interests?: Maybe<Array<Scalars['String']>>;
  referralCode?: Maybe<Scalars['String']>;
};
