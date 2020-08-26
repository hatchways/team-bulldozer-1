import React from 'react';
import PropTypes from 'prop-types';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Header from '../components/Header';

const useStyles = makeStyles((theme) => {
  const sidebarBorder = '2px solid #E9EDFA';
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

  return (
    <div className={classes.root}>
      <Header isSignedIn />
      <div className={classes.wrapper}>
        <div className={classes.sidebar}>
          { sidebar }
        </div>
        <Container className={classes.content}>
          { children }
        </Container>
      </div>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.element.isRequired,
  sidebar: PropTypes.element.isRequired,
};

export default AppLayout;
