import {useDispatch} from 'react-redux';
import {actions as authActions} from '../ducks/auth';
import RegisterRequest from 'auth/RegisterRequest';
import {actions as bookmarksActions} from 'state/ducks/bookmarks';
import LoginRequest from 'api/entities/LoginRequest';
import ForgotPasswordRequest from 'api/entities/ForgotPasswordRequest';
import {snackBarActions} from 'state/ducks/snackBar';
import {useHistory} from 'react-router-dom';
import {userProfileActions} from 'state/ducks/userProfile';
import UpdateUserRequest from '../ducks/userProfile/models';
import {dashboardActions} from 'state/ducks/dashboard';
import Room, {CreateRoom, JoinRoom, RoomType} from 'entities/Room';
import {alertActions} from '../ducks/alert';
import {roomActions} from 'state/ducks/room';
import {actions as mediasoupActions} from 'state/ducks/mediasoup';
import {actions as chatActions} from 'state/ducks/chat';
import {recordsActions} from 'state/ducks/records';
import {actions as referrersActions} from 'state/ducks/referals';
import {participantsActions} from 'state/ducks/participants';
import {actions as filesActions} from 'state/ducks/files';
import Participant, {MuteAction, MuteMediaSource} from 'entities/Participant';
import {routerActions} from 'state/ducks/router';
import {Quality} from 'entities/Mediasoup';
import {userRoomsActions} from 'state/ducks/userRooms';
import {userActions} from 'state/ducks/user';
import Resume from 'entities/Resume';
import {resumeActions} from 'state/ducks/resume';

export function useAuthActions() {
  const dispatch = useDispatch();
  const history = useHistory();

  return {
    registerUser: (registerRequest: RegisterRequest, returnUrl: string | undefined) => {
      dispatch(authActions.registerUser({request: registerRequest, history, returnUrl}));
    },
    login: (loginRequest: LoginRequest, returnUrl: string | undefined) => {
      return dispatch(authActions.login({request: loginRequest, history, returnUrl}));
    },
    logout: () => dispatch(authActions.logout({history})),
    recoverPassword: (email: ForgotPasswordRequest) => {
      dispatch(authActions.recoverPassword({request: email, history}));
    },
  };
}

export function useSnackBarActions() {
  const dispatch = useDispatch();
  return {
    closeSnackBar: () => dispatch(snackBarActions.clearSnackbar()),
  };
}

export function useResumeActions() {
  const dispatch = useDispatch();
  const history = useHistory();

  return {
    saveResume: (resume: Resume) => dispatch(resumeActions.saveUserResume(resume)),
    fetchResume: () => dispatch(resumeActions.fetchUserResume()),
    fetchResumeLink: () => dispatch(resumeActions.fetchUserResumeLink()),
    uploadPdf: (name: string, file: File) =>
      dispatch(resumeActions.uploadPdf({name, file, history})),
  };
}

export function useUserProfileActions() {
  const dispatch = useDispatch();
  return {
    fetchUserProfile: () => dispatch(userProfileActions.fetchUserProfile()),
    save: (request: UpdateUserRequest) => dispatch(userProfileActions.save(request)),
    uploadUserImage: (name: string, file: File) =>
      dispatch(userProfileActions.uploadUserImage({name, file})),
    uploadUserLogoImage: (name: string, file: File) =>
      dispatch(userProfileActions.uploadUserLogoImage({name, file})),
    uploadUserBackgroundImage: (name: string, file: File) =>
      dispatch(userProfileActions.uploadUserBackgroundImage({name, file})),
  };
}

export function useDashboardActions() {
  const dispatch = useDispatch();
  const history = useHistory();
  return {
    createRoom: (room: CreateRoom) =>
      dispatch(dashboardActions.createRoom({room, history})),
    joinRoom: (room: JoinRoom) => dispatch(dashboardActions.joinRoom({room, history})),
  };
}

export function useRoomActions() {
  const dispatch = useDispatch();
  const history = useHistory();
  return {
    initialize: (roomId: string) => dispatch(roomActions.initializeWebinar({roomId})),
    receive: (roomId: string) => dispatch(roomActions.receiveStream({roomId})),
    getRoomTracks: (roomId: string) => dispatch(roomActions.getRoomTracks({roomId})),
    fetchRoom: (roomId: string) => dispatch(roomActions.fetchRoom({roomId})),
    leaveRoom: (roomId: string) => dispatch(roomActions.leaveRoom({roomId, history})),
    closeRoom: (roomId: string) => dispatch(roomActions.closeRoom({roomId, history})),
  };
}

export function useParticipantsActions() {
  const dispatch = useDispatch();
  const history = useHistory();

  return {
    fetchParticipants: (room: Room, userId: string) =>
      dispatch(participantsActions.fetchParticipants({room, userId})),
    raiseHand: (roomId: string, raiseHand: boolean) =>
      dispatch(participantsActions.raiseHand({roomId, raiseHand})),
    setRoomOwner: (isRoomOwner: boolean) =>
      dispatch(participantsActions.setRoomOwner({isRoomOwner})),
    mute: (
      action: MuteAction,
      source: MuteMediaSource,
      userId: string,
      roomId: string,
      producerId: string,
    ) => dispatch(participantsActions.mute({action, source, userId, roomId, producerId})),
    muteAll: (action: MuteAction, userId: string, roomId: string) =>
      dispatch(participantsActions.muteAll({action, userId, roomId})),
    kick: (userId: string, roomId: string) =>
      dispatch(participantsActions.kick({userId, roomId})),
    checkMyParticipant: (myParticipant: Participant) =>
      dispatch(participantsActions.checkMyParticipant({myParticipant, history})),
    // checkIsMuted: (userId: string, roomId: string) =>
    //   dispatch(participantsActions.checkIsMuted({userId, roomId})),
    setInRoom: (inRoom: boolean) => dispatch(participantsActions.setInRoom({inRoom})),
  };
}

export function useAlertActions() {
  const dispatch = useDispatch();
  return {
    showError: (e: any) => dispatch(alertActions.showError(e)),
  };
}

export function useBookmarksActions() {
  const dispatch = useDispatch();
  const history = useHistory();
  return {
    fetchBookmarks: () => dispatch(bookmarksActions.fetchBookmarks({history})),
    addBookmark: (text: string, roomId: string) =>
      dispatch(bookmarksActions.addBookmark({text, roomId})),
  };
}

export function useMediasoupActions() {
  const dispatch = useDispatch();
  return {
    startStreaming: (roomId: string, enableMicrophone: boolean, enableCamera: boolean) =>
      dispatch(
        mediasoupActions.startStreaming({
          roomId,
          enableMicrophone,
          enableCamera,
        }),
      ),
    stopStreaming: () => dispatch(mediasoupActions.stopStreaming()),
    initialize: (
      roomId: string,
      roomType: RoomType,
      sessionUserId: string,
      roomUserId: string,
      audio: boolean,
      video: boolean,
      screen: boolean,
    ) =>
      dispatch(
        mediasoupActions.initialize({
          roomId,
          roomType,
          sessionUserId,
          roomUserId,
          audio,
          video,
          screen,
        }),
      ),
    updateWebinar: (roomId: string) =>
      dispatch(mediasoupActions.updateWebinarTracks({roomId})),

    playPauseAudio: (roomId: string) =>
      dispatch(mediasoupActions.playPauseAudio({roomId})),
    playPauseCamera: (roomId: string) =>
      dispatch(mediasoupActions.playPauseCamera({roomId})),
    playPauseScreen: (roomId: string, quality: Quality) =>
      dispatch(mediasoupActions.playPauseScreen({roomId, quality})),

    setLargeScreen: () => dispatch(mediasoupActions.setLargeScreen()),
    setScreenGridWithCameras: () => dispatch(mediasoupActions.setScreenGridWithCameras()),
    setScreenGridWithScreenShare: () =>
      dispatch(mediasoupActions.setScreenGridWithScreenShare()),

    startRecording: (roomId: string, producerId?: string, audioProducerId?: string) =>
      dispatch(mediasoupActions.startRecording({producerId, roomId, audioProducerId})),
    stopRecording: (roomId: string) => dispatch(mediasoupActions.stopRecording({roomId})),
    changeQuality: (
      roomId: string,
      quality: Quality,
      cameraPlay: boolean,
      screenPlay: boolean,
    ) =>
      dispatch(mediasoupActions.changeQuality({roomId, quality, cameraPlay, screenPlay})),
  };
}

export function useChatActions() {
  const dispatch = useDispatch();
  return {
    fetchMessages: (roomId: string) => dispatch(chatActions.fetchMessages({roomId})),
    createMessage: (message: {roomId: string; messageBody: string}) =>
      dispatch(chatActions.createMessage(message)),
  };
}

export function useRecordsActions() {
  const dispatch = useDispatch();
  const history = useHistory();
  return {
    fetchRecords: () => dispatch(recordsActions.fetchRecords({history})),
    removeRecord: (recordId: string) => dispatch(recordsActions.removeRecord({recordId})),
  };
}

export function useReferrersActions() {
  const dispatch = useDispatch();
  return {
    fetchReferrers: () => dispatch(referrersActions.fetchUserReferrers()),
  };
}

export function useFilesActions() {
  const dispatch = useDispatch();
  return {
    uploadFile: (name: string, file: File, parent: string | undefined) =>
      dispatch(filesActions.uploadFile({name, file, parent})),
    createDirectory: (name: string, parent: string | undefined) =>
      dispatch(filesActions.createDirectory({name, parent})),
    fetchFiles: (parent: string | undefined) =>
      dispatch(filesActions.fetchFiles({parent})),
    deleteDirectory: (id: string, parent: string | undefined) =>
      dispatch(filesActions.deleteDirectory({id, parent})),
    deleteFile: (id: string, parent: string | undefined) =>
      dispatch(filesActions.deleteFile({id, parent})),
  };
}

export function useRouterActions() {
  const dispatch = useDispatch();
  const history = useHistory();
  return {
    navigateToRoom: (roomId: string, enableMicrophone: boolean, enableCamera: boolean) =>
      dispatch(
        routerActions.navigateToRoom({
          roomId,
          enableMicrophone,
          enableCamera,
          history,
        }),
      ),
    navigateToReferrers: (id: string) =>
      dispatch(routerActions.navigateToReferrers({history, id})),
    navigateToUser: (userId: string) =>
      dispatch(routerActions.navigateToUser({history, userId})),
  };
}

export function useUserRoomsActions() {
  const dispatch = useDispatch();
  return {
    getUserRooms: () => dispatch(userRoomsActions.getUserRooms()),
  };
}

export function useUserActions() {
  const dispatch = useDispatch();
  const history = useHistory();

  return {
    fetchUser: (userId: string) => {
      dispatch(userActions.fetchUser({userId, history}));
    },
  };
}
