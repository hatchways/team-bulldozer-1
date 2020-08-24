import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

import AuthApi from '../utils/api/AuthApi';
import { UserContext } from '../contexts/User';

import Header from '../components/Header';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: '150px',
    paddingBottom: '50px',
  },
  container: {
    backgroundColor: 'white',
    boxShadow: '0px 0px 20px 0px rgba(215,219,237,0.3)',
    padding: theme.spacing(8),
    textAlign: 'center',
  },
  input: {
    marginBottom: theme.spacing(2),
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(3),
  },
}));

const SignedOutLayout = ({ children, isLandingPage }) => {
  const classes = useStyles();
  const { user, setUser } = useContext(UserContext);

  if (!user) {
    AuthApi.getProfileInfo()
      .then((response) => {
        setUser(response.data);
      });
  }

  return user
    ? <Redirect to="/dashboard" />
    : (
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
