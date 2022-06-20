import React, {useEffect, useRef, useState} from 'react';
import {useStyles} from 'routes/main/Room/Room.styles';
import {Box, IconButton} from '@material-ui/core';
import {useParticipantsActions} from 'state/hooks/UseActions';
import {MuteAction, MuteMediaSource} from 'entities/Participant';
import {MediaType} from 'entities/Mediasoup';

import muteAudio from 'routes/main/Room/assets/devise/mute-audio.svg';
import muteVideo from 'routes/main/Room/assets/devise/mute-video.png';
import {RoomType} from 'entities/Room';

interface VideoProps {
  srcObject: MediaStream | undefined;
  type: 'grid' | 'single';
  trackOptions: {
    muted: boolean;
    source: MediaType;
    ownUserId: string;
    ownerUserId: string;
    renderUserId: string;
    renderUserName: string;
    roomId: string;
    producerId: string;
    audioProducerId: string | undefined;
    roomType: RoomType;
  };
}

export const Video: React.FC<VideoProps> = ({srcObject, type, trackOptions}) => {
  const classes = useStyles();
  const refVideo = useRef<HTMLVideoElement>(null);
  const participantAction = useParticipantsActions();
  const renderStatement = trackOptions.ownUserId === trackOptions.ownerUserId;
  const [focusMuteButtons, setFocusMuteButtons] = useState<boolean>(false);

  useEffect(() => {
    if (!refVideo.current || !srcObject) return;
    refVideo.current.srcObject = srcObject;
  }, [srcObject]);
  return (
    <Box className={classes.largeScreenMedia}>
      {trackOptions && (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <video
          className={
            type === 'grid' ? classes.videoContainerSmall : classes.videoContainerLarge
          }
          ref={refVideo}
          playsInline
          autoPlay
        />
      )}
      {trackOptions.renderUserId !== trackOptions.ownUserId &&
        !trackOptions.muted &&
        renderStatement &&
        trackOptions.roomType === RoomType.Meeting && (
          <div
            className={classes.muteButtons}
            onMouseEnter={() => {
              setFocusMuteButtons(true);
            }}
            onMouseLeave={() => {
              setFocusMuteButtons(false);
            }}
            style={
              focusMuteButtons
                ? {backgroundColor: 'black', opacity: 0.5}
                : {backgroundColor: 'black', opacity: 0.2}
            }
          >
            <IconButton
              onClick={() => {
                participantAction.mute(
                  trackOptions.muted ? MuteAction.UnMute : MuteAction.Mute,
                  trackOptions.source === MediaType.UserMedia
                    ? MuteMediaSource.Video
                    : MuteMediaSource.Screen,
                  trackOptions.renderUserId,
                  trackOptions.roomId,
                  trackOptions.producerId,
                );
              }}
            >
              <img src={muteVideo} alt="mute video" />
            </IconButton>
            <IconButton
              onClick={() => {
                if (trackOptions.audioProducerId) {
                  participantAction.mute(
                    trackOptions.muted ? MuteAction.UnMute : MuteAction.Mute,
                    MuteMediaSource.Audio,
                    trackOptions.renderUserId,
                    trackOptions.roomId,
                    trackOptions.audioProducerId,
                  );
                }
              }}
            >
              <img src={muteAudio} alt="mute audio" />
            </IconButton>
          </div>
        )}
    </Box>
  );
};

export default Video;
