import React from 'react';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { BrowserRouter } from 'react-router-dom';

import theme from './themes/theme';

import { UserProvider } from './contexts/User';

import DashboardPage from './pages/DashboardPage';
import SettingsPage from './pages/SettingsPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import WrappedRoute from './components/WrappedRoute';
import CrawlerSidebar from './components/sidebars/CrawlerSidebar';
import SettingsSidebar from './components/sidebars/SettingsSidebar';

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <UserProvider>
        <BrowserRouter>
          <WrappedRoute path="/" component={SignUpPage} layoutProps={{ isLandingPage: true }} exact />
          <WrappedRoute path="/sign-in" component={SignInPage} />
          <WrappedRoute path="/dashboard" component={DashboardPage} layoutProps={{ sidebar: <CrawlerSidebar /> }} isPrivateRoute />
          <WrappedRoute path="/settings" component={SettingsPage} layoutProps={{ sidebar: <SettingsSidebar /> }} isPrivateRoute />
        </BrowserRouter>
      </UserProvider>
    </MuiThemeProvider>
  );
};

export default App;
