import React, {Suspense, useEffect} from 'react';
import {Switch, Route, BrowserRouter, Redirect} from 'react-router-dom';
import Auth, {AuthPath} from './auth/Auth';
import Config from 'app/Config';
import {useAuthActions} from 'state/hooks/UseActions';
import Main from './main/Main';
import {useSelector} from 'state/hooks';

const Logout = () => {
  const actions = useAuthActions();
  useEffect(() => {
    actions.logout();
  }, []);
  return <></>;
};

const Routes: React.FC = () => {
  const state = useSelector((state) => state.participants);
  const roomPath = () => {
    if (state.inRoom) {
      return '';
    }
    return '/main';
  };
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter basename={Config.getPublicUrl()}>
        <Switch>
          <Route exact path="/">
            <Redirect to="/auth" />
          </Route>
          <Route exact path={AuthPath} component={Auth} />
          <Route exact path="/logout">
            <Logout />
          </Route>
          <Route
            path={[
              roomPath(),
              '/bookmarks',
              '/userprofile',
              '/user',
              '/userreferrals',
              '/room',
              '/files',
              '/records',
            ]}
            component={Main}
          />
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
};

export default Routes;
