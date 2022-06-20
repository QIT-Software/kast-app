import ISubscriptionsService from './ISubscriptionsService';
import {Observable} from 'apollo-boost';
import {AvikastApi as Api} from 'api';
import {getDispatch} from 'state';
import {chatActions} from 'state/ducks/chat';
import {actions as mediasoupActions} from 'state/ducks/mediasoup';

import {alertActions} from 'state/ducks/alert';
import Message from 'entities/Message';
import {participantsActions} from 'state/ducks/participants';
import Room from 'entities/Room';

export default class SubscriptionsService implements ISubscriptionsService {
  // eslint-disable-next-line class-methods-use-this
  async subscribeToMessage(roomId: string, userId: string) {
    const dispatch = getDispatch();
    try {
      const watchNewMessagesObservable: Observable<Message> = await Api.onNewMessage(
        roomId,
        userId,
      );
      watchNewMessagesObservable.subscribe(
        (m) => {
          dispatch(chatActions.messageAdded(m));
        },
        (e) => dispatch(alertActions.showError(e)),
        () => {},
      );
    } catch (e) {
      dispatch(alertActions.showError(e));
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async subscribeToRoom(roomId: string, userId: string) {
    const dispatch = getDispatch();
    try {
      // @ts-ignore
      const watchRoomObservable: Observable<Room> = await Api.onRoomChanges(roomId);
      watchRoomObservable.subscribe(
        () => {
          const room = Api.getRoomById(roomId).then((room) => {
            dispatch(mediasoupActions.pushParticipantTracks({room}));
            dispatch(
              participantsActions.fetchParticipants({
                room,
                userId,
              }),
            );
          });
          // eslint-disable-next-line no-console
          console.log(room);
        },
        (e) => dispatch(alertActions.showError(e)),
        () => {},
      );
    } catch (e) {
      dispatch(alertActions.showError(e));
    }
  }
}
