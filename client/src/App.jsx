import React from 'react';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { BrowserRouter } from 'react-router-dom';

import theme from './themes/theme';

import DashboardPage from './pages/DashboardPage';
import WrappedRoute from './components/WrappedRoute';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';

const App = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <WrappedRoute path="/" component={SignUpPage} layoutProps={{ isLandingPage: true }} exact />
      <WrappedRoute path="/sign-in" component={SignInPage} />
      <WrappedRoute path="/dashboard" component={DashboardPage} isPrivateRoute />
    </BrowserRouter>
  </MuiThemeProvider>
);

export default App;
