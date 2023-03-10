import LoadingFallback from '../common/LoadingFallback';
import React, {lazy, Suspense} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {LinkedInPopUp} from 'react-linkedin-login-oauth2';

import {useGlobalState} from '../../store';

const CreateCompanyPage = lazy(() => import('../auth/CreateCompanyPage'));
const SignUpPage = lazy(() => import('../auth/SignUpPage'));
const SignInPage = lazy(() => import('../auth/SignInPage'));
const ForgotPasswordPage = lazy(() => import('../auth/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('../auth/ResetPasswordPage'));

const PublicRoute = (props: any) => {
  const {component: Component, ...rest} = props;
  const {state} = useGlobalState();
  const isAuthenticated = state.currentUser.email ? true : false;

  return (
    <Route
      {...rest}
      render={(props: any) =>
        !isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/app',
              state: {from: props.location},
            }}
          />
        )
      }
    />
  );
};

export default function Router(props: {path: string}) {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Switch>
        <Route exact path="/signup/:companyName" component={SignUpPage} />
        <PublicRoute exact path="/signin" component={SignInPage} />
        <Route exact path="/forgot" component={ForgotPasswordPage} />
        <Route
          exact
          path="/reset_password/:token"
          component={ResetPasswordPage}
        />
        <Route exact path="/linked" component={LinkedInPopUp} />
        <Route exact path="/" component={CreateCompanyPage} />
      </Switch>
    </Suspense>
  );
}
