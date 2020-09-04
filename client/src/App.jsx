import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import {
  CssBaseline, LinearProgress, MuiThemeProvider, Snackbar,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import theme from './themes/theme';

import AuthApi from './utils/api/AuthApi';

import { SearchProvider } from './contexts/Search';
import { UserProvider } from './contexts/User';

import DashboardPage from './pages/DashboardPage';
import SettingsPage from './pages/SettingsPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import WrappedRoute from './components/WrappedRoute';
import CrawlerSidebar from './components/Sidebar/CrawlerSidebar';
import SettingsSidebar from './components/Sidebar/SettingsSidebar';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [user, setUser] = useState();
  const [error, setError] = useState();

  if (!user) {
    AuthApi.getProfileInfo()
      .then((response) => {
        setUser(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        if (!err.response || err.response.status !== 401) {
          setError('An unexpected error occurred while contacting the API.');
        }
      });
  }

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <UserProvider value={{ user, setUser }}>
        <SearchProvider value={{ search, setSearch }}>
        {isLoading
          ? <LinearProgress />
          : (
            <>
              <BrowserRouter>
                <WrappedRoute path="/" component={SignUpPage} layoutProps={{ isLandingPage: true }} exact />
                <WrappedRoute path="/sign-in" component={SignInPage} />
                <WrappedRoute path="/dashboard" component={DashboardPage} layoutProps={{ sidebar: <CrawlerSidebar /> }} isPrivateRoute />
                <WrappedRoute path="/settings" component={SettingsPage} layoutProps={{ sidebar: <SettingsSidebar /> }} isPrivateRoute />
              </BrowserRouter>
              {error ? (
                <Snackbar open={!!error}>
                  <Alert severity="error">
                    { error }
                  </Alert>
                </Snackbar>
              ) : null }
            </>
          )}
        </SearchProvider>
      </UserProvider>
    </MuiThemeProvider>
  );
};

export default App;
