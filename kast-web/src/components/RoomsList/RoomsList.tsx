import React, {useEffect} from 'react';
import {useStyles} from './RoomList.styles';
import Room, {RoomType, UserRole} from 'entities/Room';
import createMeetingIcon from 'routes/main/Dashboard/assets/createMeetingIcon.svg';
import createWebinarIcon from 'routes/main/Dashboard/assets/createWebinarIcon.svg';
import {useSelector} from 'state/hooks';
import {useDashboardActions, useUserRoomsActions} from 'state/hooks/UseActions';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import {Typography} from '@material-ui/core';

const RoomsList: React.FC = () => {
  const classes = useStyles();
  const userRoomsState = useSelector((state) => state.userRooms);
  const userRoomsActions = useUserRoomsActions();
  const dashboardActions = useDashboardActions();

  useEffect(() => {
    userRoomsActions.getUserRooms();
  }, []);

  const showStreamIcon = (roomType: RoomType) => {
    switch (roomType) {
      case RoomType.Meeting:
        return createMeetingIcon;
      case RoomType.Webinar:
        return createWebinarIcon;
    }
  };

  if (!userRoomsState.userRooms?.length) {
    return <span />;
  }

  return (
    <Paper className={classes.paperRoot} elevation={0}>
      {userRoomsState.userRooms &&
        userRoomsState.userRooms.map((el: Room) => {
          const streamIcon = showStreamIcon(el.type);

          return (
            <Box
              className={classes.streamListRoot}
              onClick={() => {
                dashboardActions.joinRoom({
                  inviteLink: el.inviteLink,
                  password: undefined,
                  enableMicrophone: false,
                  enableCamera: false,
                  userRole: UserRole.Participant,
                });
              }}
            >
              <Box className={classes.test}>
                <Box className={classes.streamListImg}>
                  <img src={streamIcon} alt="" className={classes.streamTypeIcon} />
                </Box>
                <Box className={classes.streamListName}>
                  <Typography className={classes.cardTitle} variant="h5" component="h2">
                    {el.name}
                  </Typography>
                </Box>
              </Box>
            </Box>
          );
        })}
    </Paper>
  );
};

export default RoomsList;
