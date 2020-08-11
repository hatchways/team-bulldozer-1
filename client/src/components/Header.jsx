import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import logo from '../assets/img/logo.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 100,
  },
  ctaButton: {
    color: 'white',
    borderColor: 'white',
  },
  ctaText: {
    paddingRight: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  ctaWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    width: '172px',
  },
  toolbar: {
    justifyContent: 'space-between',
    minHeight: '100px',
  },
}));

const Header = ({ isLandingPage, isSignedIn }) => {
  const classes = useStyles();

  return (
    <header>
      <AppBar elevation={0}>
        <Toolbar className={classes.toolbar}>
          <Link to="/"><img className={classes.logo} src={logo} alt="Mentions Crawler Logo" /></Link>
          {isSignedIn
            ? <div />
            : (
              <div className={classes.ctaWrapper}>
                <Typography className={classes.ctaText}>
                  {isLandingPage ? 'Already have an account?' : 'Don\'t have an account?' }
                </Typography>
                <Button
                  component={Link}
                  to={isLandingPage ? '/sign-in' : '/'}
                  className={classes.ctaButton}
                  variant="outlined"
                >
                  {isLandingPage ? 'Sign in' : 'Sign up' }
                </Button>
              </div>
            )}
        </Toolbar>
      </AppBar>
    </header>
  );
};

Header.propTypes = {
  isLandingPage: PropTypes.bool,
  isSignedIn: PropTypes.bool,
};

Header.defaultProps= {
  isLandingPage: false,
  isSignedIn: false,
};

export default Header;
