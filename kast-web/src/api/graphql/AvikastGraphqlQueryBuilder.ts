import {
  createQuery,
  createMutationWithVariables,
  createQueryWithVariables,
  createSubscriptionWithVariables,
} from '@spryrocks/react-api/graphql/Query';
import {gql} from 'apollo-boost';
import {
  GQLUser,
  GQLAccount,
  GQLBookmark,
  GQLUserUpdateRequest,
  GQLMutationCreateRoomArgs,
  GQLMutationCreateTransportArgs,
  GQLMutationConnectTransportArgs,
  GQLMutationCreateConsumerArgs,
  GQLRouterOptions,
  GQLMutationCreateProducerArgs,
  GQLProducerOptions,
  GQLQueryGetRouterArgs,
  GQLMutationJoinRoomArgs,
  GQLRoom,
  GQLQueryRoomByIdArgs,
  GQLQueryGetProducerArgs,
  GQLQueryParticipantsArgs,
  GQLParticipant,
  GQLTransportOptions,
  GQLConsumerOptions,
  GQLQueryGetProducersArgs,
  GQLMessage,
  GQLMutationCreateMessageArgs,
  GQLParticipantMedia,
  GQLQueryMessagesByRoomArgs,
  GQLSubscriptionMessageAddedArgs,
  GQLRecord,
  GQLMutationRaiseHandArgs,
  GQLQueryStartRecordingArgs,
  GQLQueryStopRecordingArgs,
  GQLMutationLeaveRoomArgs,
  GQLMutationCloseRoomArgs,
  GQLMutationMuteArgs,
  GQLMutationAddBookmarkArgs,
  GQLMutationKickArgs,
  GQLSubscriptionRoomSubArgs,
  GQLAvikastFile,
  GQLMutationAddAvikastFileArgs,
  GQLMutationCreateAvikastDirectoryArgs,
  GQLQueryAvikastFilesArgs,
  GQLMutationDeleteAvikastFileArgs,
  GQLMutationMuteAllArgs,
  GQLMutationPlayPauseMediaArgs,
  GQLMutationDeleteRecordArgs,
  GQLMutationSaveResumeArgs,
  GQLQueryReferrersByUserIdArgs,
  GQLQueryUserByIdArgs,
  GQLResumeOutput,
} from './types';

const ParticipantTrackOptionsFragment = () => gql`
  fragment ParticipantTrackOptions on ParticipantTrackOptions {
    enabled
    muted
    clientId
    userId
    producerOptions
    mediaKind
    mediaType
  }
`;

const ParticipantMediaFragment = () => gql`
  ${ParticipantTrackOptionsFragment()}
  fragment ParticipantMedia on ParticipantMedia {
    userName

    audio {
      ...ParticipantTrackOptions
    }
    video {
      ...ParticipantTrackOptions
    }
    screen {
      ...ParticipantTrackOptions
    }
  }
`;

const ParticipantFragment = () => gql`
  ${ParticipantMediaFragment()}
  fragment Participant on Participant {
    id
    role
    user {
      ...User
    }
    media {
      ...ParticipantMedia
    }
    raiseHand
  }
`;

const UserFragment = () => gql`
  fragment User on User {
    id
    name
    email
    dateOfBirth
    country
    city
    position
    telephone
    tags
    skills
    mission
    vision
    interests
    referralCode
    avatarUrl
    referrer {
      id
      avatarUrl
    }
    logoUrl
    backgroundUrl
    resumeUrl
  }
`;

const messageUserFragment = () => gql`
  fragment User on User {
    id
    name
  }
`;

const RoomFragment = () => gql`
  fragment Room on Room {
    id
    name
    inviteLink
    type
    user {
      id
      logoUrl
      backgroundUrl
    }
    participants {
      ...Participant
    }
  }
`;

const AvikastFileFragment = () => gql`
  fragment AvikastFile on AvikastFile {
    id
    name
    user {
      ...User
    }
    type
    fileId
  }
`;

export const myAccountQuery = createQuery<{myAccount: GQLAccount}, GQLAccount>(
  gql`
    ${UserFragment()}
    query myAccount {
      myAccount {
        user {
          ...User
        }
      }
    }
  `,
  ({myAccount}) => myAccount,
);

export const mutationUserProfile = createMutationWithVariables<
  {
    updateRequest: GQLUserUpdateRequest;
  },
  {updateMyAccount: Account},
  Account
>(
  gql`
    ${UserFragment()}
    mutation updateMyAccount($updateRequest: UserUpdateRequest!) {
      updateMyAccount(user: $updateRequest) {
        user {
          ...User
        }
      }
    }
  `,
  ({updateMyAccount}) => updateMyAccount,
);

export const mutationUpdateUserImage = createMutationWithVariables<
  {fileId: string},
  {updateUserImage: boolean},
  boolean
>(
  gql`
    mutation updateUserImage($fileId: String!) {
      updateUserImage(fileId: $fileId)
    }
  `,
  ({updateUserImage}) => updateUserImage,
);

export const mutationUpdateUserLogoImage = createMutationWithVariables<
  {fileId: string},
  {updateUserLogoImage: boolean},
  boolean
>(
  gql`
    mutation updateUserLogoImage($fileId: String!) {
      updateUserLogoImage(fileId: $fileId)
    }
  `,
  ({updateUserLogoImage}) => updateUserLogoImage,
);

export const mutationUpdateUserBackgroundImage = createMutationWithVariables<
  {fileId: string},
  {updateUserBackgroundImage: boolean},
  boolean
>(
  gql`
    mutation updateUserBackgroundImage($fileId: String!) {
      updateUserBackgroundImage(fileId: $fileId)
    }
  `,
  ({updateUserBackgroundImage}) => updateUserBackgroundImage,
);

export const mutationCreateMessage = createMutationWithVariables<
  GQLMutationCreateMessageArgs,
  {createMessage: GQLMessage},
  GQLMessage
>(
  gql`
    ${messageUserFragment()}
    mutation createMessage($roomId: String!, $messageBody: String!, $receiverId: String) {
      createMessage(roomId: $roomId, messageBody: $messageBody, receiverId: $receiverId) {
        id
        sender {
          ...User
        }
        roomId
        body
        date
        receiverId
      }
    }
  `,
  ({createMessage}) => createMessage,
);

export const mutationCreateRoom = createMutationWithVariables<
  GQLMutationCreateRoomArgs,
  {createRoom: GQLRoom},
  GQLRoom
>(
  gql`
    ${UserFragment()}
    ${ParticipantMediaFragment()}
    ${ParticipantTrackOptionsFragment()}
    ${ParticipantFragment()}
    ${RoomFragment()}
    mutation createRoom(
      $name: String!
      $type: RoomType!
      $passwordProtected: Boolean!
      $password: String
    ) {
      createRoom(
        name: $name
        type: $type
        passwordProtected: $passwordProtected
        password: $password
      ) {
        ...Room
      }
    }
  `,
  ({createRoom}) => createRoom,
);

export const joinRoomMutation = createMutationWithVariables<
  GQLMutationJoinRoomArgs,
  {joinRoom: GQLRoom | undefined},
  GQLRoom | undefined
>(
  gql`
    ${RoomFragment()}
    ${UserFragment()}
    ${ParticipantMediaFragment()}
    ${ParticipantTrackOptionsFragment()}
    ${ParticipantFragment()}
    mutation($inviteLink: String!, $password: String) {
      joinRoom(inviteLink: $inviteLink, password: $password) {
        ...Room
      }
    }
  `,
  ({joinRoom}) => joinRoom,
);

export const mutationCreateTransport = createMutationWithVariables<
  GQLMutationCreateTransportArgs,
  {createTransport: GQLTransportOptions},
  GQLTransportOptions
>(
  gql`
    mutation createTransport($roomId: String!, $direction: String!, $clientId: String!) {
      createTransport(roomId: $roomId, direction: $direction, clientId: $clientId) {
        id
        dtlsParameters
        iceCandidates
        iceParameters
      }
    }
  `,
  ({createTransport}) => createTransport,
);

export const mutationConnectTransport = createMutationWithVariables<
  GQLMutationConnectTransportArgs,
  {connectTransport: Boolean},
  Boolean
>(
  gql`
    mutation connectTransport(
      $dtlsParameters: JSON!
      $roomId: String!
      $direction: String!
      $clientId: String!
      $quality: String!
    ) {
      connectTransport(
        roomId: $roomId
        dtlsParameters: $dtlsParameters
        direction: $direction
        clientId: $clientId
        quality: $quality
      )
    }
  `,
  ({connectTransport}) => connectTransport,
);

export const mutationCreateProducer = createMutationWithVariables<
  GQLMutationCreateProducerArgs,
  {createProducer: GQLProducerOptions},
  GQLProducerOptions
>(
  gql`
    mutation createProducer(
      $roomId: String!
      $transportId: String!
      $clientId: String!
      $rtpParameters: JSON!
      $mediaKind: MediaKind!
      $mediaType: MediaType!
    ) {
      createProducer(
        roomId: $roomId
        transportId: $transportId
        clientId: $clientId
        rtpParameters: $rtpParameters
        mediaKind: $mediaKind
        mediaType: $mediaType
      ) {
        id
        kind
        rtpParameters
        appData
      }
    }
  `,
  ({createProducer}) => createProducer,
);

export const mutationCreateConsumer = createMutationWithVariables<
  GQLMutationCreateConsumerArgs,
  {createConsumer: GQLConsumerOptions},
  GQLConsumerOptions
>(
  gql`
    mutation createConsumer(
      $producerId: String!
      $rtpCapabilities: JSON!
      $roomId: String!
      $clientId: String!
    ) {
      createConsumer(
        producerId: $producerId
        roomId: $roomId
        rtpCapabilities: $rtpCapabilities
        clientId: $clientId
      ) {
        id
        producerId
        rtpParameters
        appData
      }
    }
  `,
  ({createConsumer}) => createConsumer,
);

export const getRouterQuery = createQueryWithVariables<
  GQLQueryGetRouterArgs,
  {getRouter: GQLRouterOptions},
  GQLRouterOptions
>(
  gql`
    query getRouter($roomId: String!) {
      getRouter(roomId: $roomId) {
        rtpCapabilities
      }
    }
  `,
  ({getRouter}) => getRouter,
);

export const messageSubscription = createSubscriptionWithVariables<
  GQLSubscriptionMessageAddedArgs,
  {messageAdded: GQLMessage},
  GQLMessage
>(
  gql`
    ${messageUserFragment()}
    subscription messageAdded($roomId: String!, $userId: String!) {
      messageAdded(roomId: $roomId, userId: $userId) {
        id
        sender {
          ...User
        }
        roomId
        body
        date
        receiverId
      }
    }
  `,
  ({messageAdded}) => messageAdded,
);

export const getMessagesQuery = createQueryWithVariables<
  GQLQueryMessagesByRoomArgs,
  {messagesByRoom: GQLMessage[]},
  GQLMessage[]
>(
  gql`
    ${messageUserFragment()}
    query messagesByRoom($roomId: String!) {
      messagesByRoom(roomId: $roomId) {
        id
        sender {
          ...User
        }
        roomId
        body
        date
        receiverId
      }
    }
  `,
  ({messagesByRoom}) => messagesByRoom,
);

export const getBookmarksQuery = createQuery<{bookmarks: GQLBookmark[]}, GQLBookmark[]>(
  gql`
    query bookmarks {
      bookmarks {
        date
        id
        text
        topic
        user {
          id
          name
          email
          dateOfBirth
          country
          city
          tags
          skills
          referralCode
        }
      }
    }
  `,
  ({bookmarks}) => bookmarks,
);

export const getUserReferrersQuery = createQuery<{users: GQLUser[]}, GQLUser[]>(
  gql`
    ${UserFragment()}
    query users {
      users {
        ...User
      }
    }
  `,
  ({users}) => users,
);

export const mutationAddBookmark = createMutationWithVariables<
  GQLMutationAddBookmarkArgs,
  {addBookmark: boolean},
  boolean
>(
  gql`
    mutation addBookmark($text: String!, $roomId: String!) {
      addBookmark(text: $text, roomId: $roomId)
    }
  `,
  ({addBookmark}) => addBookmark,
);

export const queryGetProducer = createQueryWithVariables<
  GQLQueryGetProducerArgs,
  {getProducer: GQLProducerOptions},
  GQLProducerOptions
>(
  gql`
    query($roomId: String!) {
      getProducer(roomId: $roomId) {
        id
        kind
        rtpParameters
      }
    }
  `,
  ({getProducer}) => getProducer,
);

export const getRoomQuery = createQuery<{room: GQLRoom | undefined}, GQLRoom | undefined>(
  gql`
    ${ParticipantMediaFragment()}
    query room {
      room {
        id
        closed
        name
        inviteLink
        type
        user {
          id
        }
        participants {
          id
          role
          user {
            id
            name
          }
          media {
            ...ParticipantMedia
          }
          raiseHand
          kicked
          muted
        }
      }
    }
  `,
  ({room}) => room,
);

export const getUserRoomsQuery = createQuery<
  {userRooms: GQLRoom[] | undefined},
  GQLRoom[] | undefined
>(
  gql`
    ${RoomFragment()}
    ${UserFragment()}
    ${ParticipantMediaFragment()}
    ${ParticipantTrackOptionsFragment()}
    ${ParticipantFragment()}
    query userRooms {
      userRooms {
        ...Room
      }
    }
  `,
  ({userRooms}) => userRooms,
);

export const getRoomQueryById = createQueryWithVariables<
  GQLQueryRoomByIdArgs,
  {roomById: GQLRoom},
  GQLRoom
>(
  gql`
    ${ParticipantMediaFragment()}
    query($roomId: String!) {
      roomById(roomId: $roomId) {
        id
        closed
        name
        inviteLink
        type
        user {
          id
          logoUrl
          backgroundUrl
        }
        participants {
          id
          role
          user {
            id
            name
          }
          media {
            ...ParticipantMedia
          }
          raiseHand
          kicked
          muted
        }
      }
    }
  `,
  ({roomById}) => roomById,
);

export const getUserByIdQuery = createQueryWithVariables<
  GQLQueryUserByIdArgs,
  {userById: GQLUser},
  GQLUser
>(
  gql`
    ${UserFragment()}
    query($userId: String!) {
      userById(userId: $userId) {
        ...User
      }
    }
  `,
  ({userById}) => userById,
);

export const participantsQuery = createQueryWithVariables<
  GQLQueryParticipantsArgs,
  {participants: GQLParticipant[]},
  GQLParticipant[]
>(
  gql`
    ${UserFragment()}
    ${ParticipantFragment()}
    query($roomId: String!) {
      participants(roomId: $roomId) {
        ...Participant
      }
    }
  `,
  ({participants}) => participants,
);

export const participantsTracksQuery = createQueryWithVariables<
  GQLQueryParticipantsArgs,
  {participantsTracks: GQLParticipantMedia[]},
  GQLParticipantMedia[]
>(
  gql`
    ${ParticipantMediaFragment()}
    query($roomId: String!) {
      participantsTracks(roomId: $roomId) {
        ...ParticipantMedia
      }
    }
  `,
  ({participantsTracks}) => participantsTracks,
);

export const queryGetProducers = createQueryWithVariables<
  GQLQueryGetProducersArgs,
  {getProducers: GQLProducerOptions[]},
  GQLProducerOptions[]
>(
  gql`
    query($roomId: String!) {
      getProducers(roomId: $roomId) {
        id
        kind
        rtpParameters
        appData
      }
    }
  `,
  ({getProducers}) => getProducers,
);

export const getRecordsQuery = createQuery<{records: GQLRecord[]}, GQLRecord[]>(
  gql`
    query records {
      records {
        id
        name
        date
        fileId
      }
    }
  `,
  ({records}) => records,
);

export const startRecordingQuery = createQueryWithVariables<
  GQLQueryStartRecordingArgs,
  {startRecording: boolean},
  boolean
>(
  gql`
    query($roomId: String!, $producerId: String, $audioProducerId: String) {
      startRecording(
        roomId: $roomId
        producerId: $producerId

        audioProducerId: $audioProducerId
      )
    }
  `,
  ({startRecording}) => startRecording,
);

export const stopRecordingQuery = createQueryWithVariables<
  GQLQueryStopRecordingArgs,
  {stopRecording: boolean},
  boolean
>(
  gql`
    query($roomId: String) {
      stopRecording(roomId: $roomId)
    }
  `,
  ({stopRecording}) => stopRecording,
);

export const deleteRecordMutation = createMutationWithVariables<
  GQLMutationDeleteRecordArgs,
  {},
  void
>(
  gql`
    mutation deleteRecord($id: String!) {
      deleteRecord(id: $id)
    }
  `,
  () => undefined,
);

export const raiseHandMutation = createMutationWithVariables<
  GQLMutationRaiseHandArgs,
  {raiseHand: boolean},
  Boolean
>(
  gql`
    mutation($roomId: String!, $raiseHand: Boolean!) {
      raiseHand(roomId: $roomId, raiseHand: $raiseHand)
    }
  `,
  ({raiseHand}) => raiseHand,
);

export const leaveRoomMutation = createMutationWithVariables<
  GQLMutationLeaveRoomArgs,
  {},
  void
>(
  gql`
    mutation($roomId: String!) {
      leaveRoom(roomId: $roomId)
    }
  `,
  () => undefined,
);

export const closeRoomMutation = createMutationWithVariables<
  GQLMutationCloseRoomArgs,
  {closeRoom: boolean},
  Boolean
>(
  gql`
    mutation($roomId: String!) {
      closeRoom(roomId: $roomId)
    }
  `,
  ({closeRoom}) => closeRoom,
);

export const roomChanges = createSubscriptionWithVariables<
  GQLSubscriptionRoomSubArgs,
  {roomChanges: GQLRoom},
  GQLRoom
>(
  gql`
    ${RoomFragment()}
    ${UserFragment()}
    ${ParticipantMediaFragment()}
    ${ParticipantTrackOptionsFragment()}
    ${ParticipantFragment()}
    subscription roomSub($roomId: String!) {
      roomSub(roomId: $roomId) {
        ...Room
      }
    }
  `,
  ({roomChanges}) => roomChanges,
);

export const muteMutation = createMutationWithVariables<
  GQLMutationMuteArgs,
  {mute: boolean},
  Boolean
>(
  gql`
    mutation(
      $action: String!
      $source: String!
      $userId: String!
      $roomId: String!
      $producerId: String!
    ) {
      mute(
        action: $action
        source: $source
        userId: $userId
        roomId: $roomId
        producerId: $producerId
      )
    }
  `,
  ({mute}) => mute,
);

export const muteAllMutation = createMutationWithVariables<
  GQLMutationMuteAllArgs,
  {muteAll: boolean},
  Boolean
>(
  gql`
    mutation($action: String!, $userId: String!, $roomId: String!) {
      muteAll(action: $action, userId: $userId, roomId: $roomId)
    }
  `,
  ({muteAll}) => muteAll,
);

export const kickMutation = createMutationWithVariables<
  GQLMutationKickArgs,
  {kick: boolean},
  Boolean
>(
  gql`
    mutation($userId: String!, $roomId: String!) {
      kick(userId: $userId, roomId: $roomId)
    }
  `,
  ({kick}) => kick,
);

export const getFilesQuery = createQueryWithVariables<
  GQLQueryAvikastFilesArgs,
  {avikastFiles: GQLAvikastFile[]},
  GQLAvikastFile[]
>(
  gql`
    ${UserFragment()}
    ${AvikastFileFragment()}
    query avikastFiles($parent: String) {
      avikastFiles(parent: $parent) {
        ...AvikastFile
      }
    }
  `,
  ({avikastFiles}) => avikastFiles,
);

export const getImagesQuery = createQuery<
  {getImages: GQLAvikastFile[]},
  GQLAvikastFile[]
>(
  gql`
    ${UserFragment()}
    ${AvikastFileFragment()}
    query getImages {
      getImages {
        ...AvikastFile
      }
    }
  `,
  ({getImages}) => getImages,
);

export const addAvikastFileMutation = createMutationWithVariables<
  GQLMutationAddAvikastFileArgs,
  {addAvikastFiles: GQLAvikastFile},
  GQLAvikastFile
>(
  gql`
    ${UserFragment()}
    ${AvikastFileFragment()}
    mutation addAvikastFile($name: String!, $fileId: String!, $parent: String) {
      addAvikastFile(name: $name, fileId: $fileId, parent: $parent) {
        ...AvikastFile
      }
    }
  `,
  ({addAvikastFiles}) => addAvikastFiles,
);

export const createAvikastDirectoryMutation = createMutationWithVariables<
  GQLMutationCreateAvikastDirectoryArgs,
  {createAvikastDirectory: GQLAvikastFile},
  GQLAvikastFile
>(
  gql`
    ${UserFragment()}
    ${AvikastFileFragment()}
    mutation createAvikastDirectory($name: String!, $parent: String) {
      createAvikastDirectory(name: $name, parent: $parent) {
        ...AvikastFile
      }
    }
  `,
  ({createAvikastDirectory}) => createAvikastDirectory,
);

export const deleteAvikastFileMutation = createMutationWithVariables<
  GQLMutationDeleteAvikastFileArgs,
  {},
  void
>(
  gql`
    mutation deleteAvikastFile($id: String!) {
      deleteAvikastFile(id: $id)
    }
  `,
  () => undefined,
);

export const deleteAvikastDirectoryMutation = createMutationWithVariables<
  GQLMutationDeleteAvikastFileArgs,
  {},
  void
>(
  gql`
    mutation deleteAvikastDirectory($id: String!) {
      deleteAvikastDirectory(id: $id)
    }
  `,
  () => undefined,
);

export const playPauseMediaMutation = createMutationWithVariables<
  GQLMutationPlayPauseMediaArgs,
  {},
  void
>(
  gql`
    mutation playPauseMedia($media: String!, $status: Boolean!, $roomId: String!) {
      playPauseMedia(media: $media, status: $status, roomId: $roomId)
    }
  `,
  () => undefined,
);

export const getReferrersByUserIdQuery = createQueryWithVariables<
  GQLQueryReferrersByUserIdArgs,
  {referrersByUserId: GQLUser[]},
  GQLUser[]
>(
  gql`
    ${UserFragment()}
    query referrersByUserId($userId: String!) {
      referrersByUserId(userId: $userId) {
        ...User
      }
    }
  `,
  ({referrersByUserId}) => referrersByUserId,
);

export const saveResumeMutation = createMutationWithVariables<
  GQLMutationSaveResumeArgs,
  {},
  void
>(
  gql`
    mutation saveResume($resume: ResumeInput!) {
      saveResume(resume: $resume)
    }
  `,
  () => undefined,
);

export const getResumeQuery = createQuery<{getResume: GQLResumeOutput}, GQLResumeOutput>(
  gql`
    query getResume {
      getResume {
        summary
        experience
        education
        awards
      }
    }
  `,
  ({getResume}) => getResume,
);

export const getResumeLinkQuery = createQuery<{getResumeLink: String}, String>(
  gql`
    query getResumeLink {
      getResumeLink
    }
  `,
  ({getResumeLink}) => getResumeLink,
);

export const mutationUploadResume = createMutationWithVariables<
  {fileId: string},
  {uploadResume: boolean},
  boolean
>(
  gql`
    mutation uploadResume($fileId: String!) {
      uploadResume(fileId: $fileId)
    }
  `,
  ({uploadResume}) => uploadResume,
);
