import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import AuthApi from '../utils/api/AuthApi';
import { UserContext } from '../contexts/User';

import Header from '../components/Header';

const useStyles = makeStyles((theme) => {
  const sidebarBorder = `2px solid ${theme.palette.gray.light}`;
  return {
    root: {
      paddingTop: 100,
    },
    sidebar: {
      background: theme.palette.common.white,
      borderBottom: sidebarBorder,
      padding: theme.spacing(0, 4),
      [theme.breakpoints.up('md')]: {
        position: 'fixed',
        top: 100,
        bottom: 0,
        left: 0,
        width: 375,
        borderBottom: 0,
        borderRight: sidebarBorder,
      },
    },
    content: {
      maxWidth: 1100,
      padding: theme.spacing(3),
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(4),
        paddingLeft: 375,
      },
    },
  };
});

const AppLayout = ({ children, sidebar }) => {
  const classes = useStyles();

  const { setUser } = useContext(UserContext);
  const [redirectTo, setRedirectTo] = useState();
  const [currentSidebarTabIndex, setCurrentSidebarTabIndex] = useState(0);

  const handleSearchSubmit = () => {
    setRedirectTo('/dashboard');
  };

  const handleSidebarTabChange = (newCurrentTab) => {
    setCurrentSidebarTabIndex(newCurrentTab);
  };

  const handleLogout = () => {
    AuthApi.logout()
      .then(() => {
        setUser(null);
      });
  };

  return (
    <div className={classes.root}>
      <Header onSearchSubmit={handleSearchSubmit} isSignedIn />
      <div className={classes.wrapper}>
        <div className={classes.sidebar}>
          { React.cloneElement(sidebar, {
            currentSidebarTabIndex,
            handleSidebarTabChange,
            handleLogout,
          }) }
        </div>
        <Container className={classes.content}>
          { React.cloneElement(children, { currentSidebarTabIndex }) }
        </Container>
      </div>
      {!!redirectTo && <Redirect to={redirectTo} /> }
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.element.isRequired,
  sidebar: PropTypes.element.isRequired,
};

export default AppLayout;
