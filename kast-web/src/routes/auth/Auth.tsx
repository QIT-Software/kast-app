import React from 'react';
import {useHistory, Switch, Route, Redirect} from 'react-router-dom';
import SignIn from './signIn/SignIn';
import SignUp from './signUp/SignUp';
import ForgotPassword from './forgotPassword/ForgotPassword';
import {parse, stringify} from 'query-string';

const Auth: React.FC = () => {
  const history = useHistory();
  const {returnUrl} = parse(history.location.search);

  return (
    <>
      <Switch>
        <Route path="/auth">
          <Redirect to={`/signin?${stringify({returnUrl})}`} />
        </Route>
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/forgotpassword" component={ForgotPassword} />
      </Switch>
    </>
  );
};

export const AuthPath = ['/auth', '/signin', '/signup', '/forgotpassword'];

export default Auth;
