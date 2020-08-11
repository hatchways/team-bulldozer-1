import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

import Header from '../components/Header';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: '150px',
  },
  container: {
    backgroundColor: 'white',
    boxShadow: '0px 0px 20px 0px rgba(215,219,237,0.3)',
    padding: theme.spacing(8),
    textAlign: 'center',
  },
}));

const SignedOutLayout = ({ children, isLandingPage }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header isLandingPage={isLandingPage} />
      <Container className={classes.container} maxWidth="sm">
        { children }
      </Container>
    </div>
  );
};

SignedOutLayout.propTypes = {
  children: PropTypes.element.isRequired,
  isLandingPage: PropTypes.bool,
};

SignedOutLayout.defaultProps = {
  isLandingPage: false,
};

export default SignedOutLayout;
