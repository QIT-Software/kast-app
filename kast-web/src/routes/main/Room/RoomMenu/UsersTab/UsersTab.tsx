import React from 'react';
import {useStyles} from './UsersTab.styles';
import {Box, IconButton, Typography, MenuItem, Menu} from '@material-ui/core';
import cameraon from '../../assets/devise/cameraon.svg';
import cameraoff from '../../assets/devise/cameraoff.svg';
import audioon from '../../assets/devise/audioon.svg';
import audiooff from '../../assets/devise/audiooff.svg';
import screenShare from '../../assets/devise/screen-share.svg';
import screenShareOff from '../../assets/devise/screen-share-off.svg';
import raiseHand from 'routes/main/Room/assets/others/raise-hand.svg';
import {useSelector} from 'state/hooks';
import dots from 'routes/main/Room/assets/others/dots.svg';
import {useParticipantsActions} from 'state/hooks/UseActions';
import {MuteAction} from 'entities/Participant';

const UsersTab: React.FC<{roomId: string; sessionUserId: string}> = ({
  roomId,
  sessionUserId,
}) => {
  const classes = useStyles();
  const state = useSelector((state) => state.participants);
  const participantsActions = useParticipantsActions();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      className={classes.userContainer}
      borderColor="primary"
      border={1}
      borderRadius={15}
    >
      {state.participants.map((element) => (
        <Box className={classes.userItem}>
          <Box className={classes.listPointer} />
          <Typography
            style={state.isRoomOwner ? {color: 'red'} : {}}
            variant="h5"
            component="h2"
            className={classes.userName}
          >
            {element.user.name}
          </Typography>
          <div style={{flexWrap: 'nowrap', display: 'flex'}}>
            <IconButton className={classes.deviceIcon}>
              {element.raiseHand ? (
                <img src={raiseHand} alt="raise hand" className={classes.deviceIcon} />
              ) : (
                <div style={{display: 'none'}} />
              )}
            </IconButton>
            <IconButton className={classes.deviceIcon}>
              {element.media.audio.enabled ? (
                <img src={audioon} alt="audio" />
              ) : (
                <img src={audiooff} alt="audio" />
              )}
            </IconButton>
            <IconButton className={classes.deviceIcon}>
              {element.media.video.enabled ? (
                <img src={cameraon} alt="camera" />
              ) : (
                <img src={cameraoff} alt="camera" />
              )}
            </IconButton>
            <IconButton className={classes.deviceIcon}>
              {element.media.screen.enabled ? (
                <img src={screenShare} alt="screen" />
              ) : (
                <img src={screenShareOff} alt="screen" />
              )}
            </IconButton>
            {state.isRoomOwner && sessionUserId !== element.user.id && (
              <IconButton
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                <img src={dots} alt="" className={classes.menuIcon} />
              </IconButton>
            )}
          </div>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              onClick={() => {
                handleClose();
                participantsActions.muteAll(MuteAction.Mute, element.user.id, roomId);
              }}
            >
              <span>mute</span>
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                participantsActions.kick(element.user.id, roomId);
              }}
            >
              <span>kick</span>
            </MenuItem>
          </Menu>
        </Box>
      ))}
    </Box>
  );
};

export default UsersTab;
