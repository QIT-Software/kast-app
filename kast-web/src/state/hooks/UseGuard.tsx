import {useEffect, useState} from 'react';
import {AuthInfoKeeper} from 'auth';
import {useHistory, useLocation} from 'react-router-dom';
import Authentication from '@spryrocks/react-auth/Authentication';
import User from 'entities/User';
import {stringifyUrl} from 'query-string';
import {AvikastApi} from 'api';
import {
  useMediasoupActions,
  useParticipantsActions,
  useRouterActions,
} from 'state/hooks/UseActions';

interface UseGuardProps {
  requireAuthenticated?: boolean;
  requireRoomAuthenticated?: boolean;
  authRoute?: string;
  mainRoute?: string;
  roomActive?: boolean;
  listenAuthState?: boolean;
  requireRoomCheck?: boolean;
}

export function useGuard({
  requireAuthenticated,
  authRoute = '/auth',
  mainRoute = '/main',
  listenAuthState = false,
  requireRoomCheck,
}: UseGuardProps) {
  const history = useHistory();
  const [authentication, setAuthentication] = useState<Authentication<User> | undefined>(
    AuthInfoKeeper.getAuthentication(),
  );
  const location = useLocation();
  const routerActions = useRouterActions();
  const mediasoupActions = useMediasoupActions();
  const participantActions = useParticipantsActions();

  useEffect(() => {
    const listener = () => {
      if (listenAuthState) setAuthentication(AuthInfoKeeper.getAuthentication());
    };
    AuthInfoKeeper.addListener(listener);
    return () => {
      AuthInfoKeeper.removeListener(listener);
    };
  }, []);

  useEffect(() => {
    if (requireAuthenticated !== undefined) {
      if (requireAuthenticated) {
        if (!authentication) {
          history.push(
            stringifyUrl({
              url: authRoute,
              query: {returnUrl: `${location.pathname}${location.search}`},
            }),
          );
        }
      } else if (authentication) {
        history.push(mainRoute);
      }
    }
  }, [authentication]);

  useEffect(() => {
    if (requireRoomCheck !== undefined) {
      AvikastApi.getRoom().then((room) => {
        // @ts-ignore
        if (room !== undefined) {
          participantActions.setInRoom(false);
          if (room.closed === undefined) {
            participantActions.setInRoom(false);
            const participant = room!.participants.find((element) => {
              return element.user.id === authentication!.user.id;
            });
            if (participant === undefined) {
              participantActions.setInRoom(false);
              return;
            }
            if (participant !== undefined) {
              participantActions.setInRoom(true);
              if (participant.kicked) return;
              routerActions.navigateToRoom(
                room!.id,
                participant!.media.audio.enabled,
                participant!.media.video.enabled,
              );
              if (participant.media.audio.enabled)
                mediasoupActions.playPauseAudio(room.id);
              if (participant.media.video.enabled)
                mediasoupActions.playPauseCamera(room.id);
            }
          }
        }
      });
    }
  }, [requireRoomCheck]);

  // region Room active
  // todo: implement
  // endregion

  return {
    authenticated: !!authentication,
    session: authentication ? authentication.session : undefined,
    user: authentication ? authentication.user : undefined,
  };
}
