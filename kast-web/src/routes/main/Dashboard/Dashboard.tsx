import React, {useEffect} from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Box from '@material-ui/core/Box';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import joinToRoomIcon from './assets/joinToRoomIcon.svg';
import createMeetingIcon from './assets/createMeetingIcon.svg';
import createWebinarIcon from './assets/createWebinarIcon.svg';
import {useStyles} from './Dashboard.styles';
import {Route, useHistory} from 'react-router-dom';
import CreateRoomDialog from 'routes/main/Dashboard/CreateRoom/CreateRoomDialog';
import {useTranslation} from 'react-i18next';
import {RoomType} from 'entities/Room';
import JoinRoomDialog from 'routes/main/Dashboard/JoinRoom/JoinRoomDialog';
import {useUserRoomsActions} from 'state/hooks/UseActions';
import RoomsList from 'components/RoomsList/RoomsList';

const Dashboard: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const {t} = useTranslation('dashboard');
  const userRoomsActions = useUserRoomsActions();

  useEffect(() => {
    userRoomsActions.getUserRooms();
  }, []);

  const DashboardButton = ({
    icon,
    cardTitle,
    onClick,
  }: {
    icon: string;
    cardTitle: string;
    onClick?: () => void;
  }) => {
    return (
      <Card className={classes.card} elevation={2} onClick={onClick}>
        <CardActionArea className={classes.card}>
          <CardMedia className={classes.icon} image={icon} />
          <Typography className={classes.cardTitle} variant="h5" component="h2">
            {cardTitle}
          </Typography>
        </CardActionArea>
      </Card>
    );
  };

  return (
    <>
      <Box className={classes.root}>
        <RoomsList />
        <Box className={classes.cards}>
          <DashboardButton
            icon={joinToRoomIcon}
            cardTitle="JOIN TO ROOM"
            onClick={() => history.push('/main/joinRoom')}
          />
          <DashboardButton
            icon={createMeetingIcon}
            cardTitle="CREATE MEETING"
            onClick={() => history.push('/main/createMeeting')}
          />
          <DashboardButton
            icon={createWebinarIcon}
            cardTitle="CREATE WEBINAR"
            onClick={() => history.push('/main/createWebinar')}
          />
        </Box>
      </Box>
      <Route path="/main/createMeeting">
        <CreateRoomDialog
          open
          title={t('createRoomDialog.title.meeting')}
          onClose={() => history.goBack()}
          roomType={RoomType.Meeting}
        />
      </Route>
      <Route path="/main/createWebinar">
        <CreateRoomDialog
          open
          title={t('createRoomDialog.title.webinar')}
          onClose={() => history.goBack()}
          roomType={RoomType.Webinar}
        />
      </Route>
      <Route path="/main/joinRoom">
        <JoinRoomDialog open onClose={() => history.goBack()} />
      </Route>
    </>
  );
};

export default Dashboard;
