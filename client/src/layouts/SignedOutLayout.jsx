import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Snackbar } from '@material-ui/core';

import AuthApi from '../utils/api/AuthApi';
import { UserContext } from '../contexts/User';

import Header from '../components/Header';
import { Alert } from '@material-ui/lab'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 150,
    paddingBottom: 50,
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
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      AuthApi.getProfileInfo()
        .then((response) => {
          setUser(response.data);
        })
        .catch((err) => {
          if (!err.response || err.response.status !== 401) {
            setError('An unexpected error occurred while contacting the API.');
          }
        });
    }
  }, [user, setUser]);

  const handleErrorClose = () => { setError(''); };

  return user
    ? <Redirect to="/dashboard" />
    : (
      <div className={classes.root}>
        <Header isLandingPage={isLandingPage} />
        <Container className={classes.container} maxWidth="sm">
          { children }
        </Container>
        {!!error ? (
          <Snackbar open={!!error} onClose={handleErrorClose} autoHideDuration={2000}>
            <Alert severity="error">
              { error }
            </Alert>
          </Snackbar>
        ) : null }
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
