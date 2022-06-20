import React from 'react';
import MainLayout from './MainLayout/MainLayout';
import {useGuard} from 'state/hooks/UseGuard';
import {Route} from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';
import UserProfile from './UserProfile/UserProfile';
import User from './User/User';
import UserReferrals from './UserProfile/UserReferrals/UserReferrals';
import Bookmarks from './Bookmarks/Bookmarks';
import {ThemeProvider} from '@material-ui/core/styles';
import {muiTheme} from './Main.style';
import Room from './Room/Room';
import Directory from './Files/Directory';
import Records from './Records/Records';
import RoomError from 'routes/main/Room/RoomError';

const Main: React.FC = () => {
  useGuard({requireAuthenticated: true});
  return (
    <ThemeProvider theme={muiTheme}>
      <MainLayout>
        <Route path="/main" component={Dashboard} />
        <Route path="/bookmarks" component={Bookmarks} />
        <Route path="/userprofile" component={UserProfile} />
        <Route path="/user/:userId" component={User} />
        <Route path="/userreferrals/:id" component={UserReferrals} />
        <Route path="/files" component={Directory} />
        <Route path="/room/:roomId" component={Room} />
        <Route path="/error" component={RoomError} />
        <Route path="/records" component={Records} />
      </MainLayout>
    </ThemeProvider>
  );
};

export default Main;
