import React, {useState} from 'react';
import {useStyles} from './Room.styles';
import {useParams} from 'react-router-dom';
import Box from '@material-ui/core/Box';
import RoomMenu from './RoomMenu/RoomMenu';
import RoomStream from './RoomStream/RoomStraem';
import backArrow from 'routes/main/Room/assets/others/back_arrow.svg';
import {IconButton, Button} from '@material-ui/core';
import {useSelector} from 'state/hooks';
import {useMediasoupActions, useRoomActions} from 'state/hooks/UseActions';
import {useGuard} from 'state/hooks/UseGuard';
import RoomsList from 'components/RoomsList/RoomsList';
import UsersTab from 'routes/main/Room/RoomMenu/UsersTab/UsersTab';

const Room: React.FC = () => {
  const classes = useStyles();
  const {roomId} = useParams<{
    roomId: string;
  }>();
  const state = useSelector((state) => state.participants);
  const mediasoupState = useSelector((state) => state.mediasoup);
  const mediasoupActions = useMediasoupActions();
  const roomActions = useRoomActions();
  const {user} = useGuard({requireAuthenticated: true, roomActive: true});
  const [tabState, setTabState] = useState('meeting');

  return (
    <Box style={{display: 'flex'}}>
      <RoomsList />
      <Box className={classes.roomRoot}>
        <div className={classes.backButtonWraper}>
          <IconButton
            color="primary"
            aria-label="invite"
            onClick={() => {
              if (state.isRoomOwner) {
                roomActions.closeRoom(roomId);
                if (mediasoupState.isRecording) {
                  mediasoupActions.stopRecording(roomId);
                }
              } else {
                roomActions.leaveRoom(roomId);
              }
              mediasoupActions.stopStreaming();
            }}
            className={classes.backButton}
          >
            <img src={backArrow} alt="backArrow" className={classes.backButtonIcon} />
            <span>Leave room</span>
          </IconButton>
          <Box style={{margin: 'auto'}}>
            <Button
              onClick={() => setTabState('meeting')}
              className={classes.tabButtonIcon}
              style={
                tabState === 'meeting'
                  ? {textDecoration: 'underline'}
                  : {textDecoration: 'none'}
              }
            >
              Meeting
            </Button>
            <Button
              onClick={() => setTabState('chats')}
              className={classes.tabButtonIcon}
              style={
                tabState === 'chats'
                  ? {textDecoration: 'underline'}
                  : {textDecoration: 'none'}
              }
            >
              Chats
            </Button>
            <Button
              onClick={() => setTabState('users')}
              className={classes.tabButtonIcon}
              style={
                tabState === 'users'
                  ? {textDecoration: 'underline'}
                  : {textDecoration: 'none'}
              }
            >
              Users
            </Button>
          </Box>
        </div>
        {user && (
          <Box
            style={
              tabState !== 'meeting'
                ? {display: 'none'}
                : {display: 'block', height: '90.5%'}
            }
          >
            <RoomStream roomId={roomId} userId={user.id} userName={user.name} />
          </Box>
        )}
        {user && (
          <Box
            style={
              tabState !== 'chats' ? {display: 'none'} : {display: 'block', height: '93%'}
            }
          >
            <RoomMenu />
          </Box>
        )}
        {user && (
          <Box
            style={
              tabState !== 'users'
                ? {display: 'none'}
                : {display: 'block', height: '90.5%'}
            }
          >
            <UsersTab roomId={roomId} sessionUserId={user.id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Room;
