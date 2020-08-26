import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Button,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';
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
    width: 172,
    marginRight: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      width: 90,
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.common.white,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    top: 0,
    right: 0,
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInputRoot: {
    color: 'inherit',
  },
  searchInputInput: {
    padding: theme.spacing(2, 0, 2, 3),
    paddingRight: `calc(1em + ${theme.spacing(4)}px)`,
    width: '100%',
    color: theme.palette.common.black,
    [theme.breakpoints.up('md')]: {
      width: '40ch',
    },
  },
  settings: {
    color: theme.palette.common.white,
    opacity: 0.35,
    '&:hover': {
      opacity: 1,
    },
  },
  toolbar: {
    justifyContent: 'space-between',
    minHeight: 100,
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
            ? (
              <>
                <div className={classes.search}>
                  <InputBase
                    placeholder="Search in your mentions"
                    classes={{
                      root: classes.searchInputRoot,
                      input: classes.searchInputInput,
                    }}
                  />
                  <div className={classes.searchIcon}>
                    <SearchIcon color="primary" />
                  </div>
                </div>
                <IconButton
                  component={Link}
                  to="/settings"
                  className={classes.settings}
                >
                  <SettingsIcon className={classes.settingsIcon} />
                </IconButton>
              </>
            )
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

Header.defaultProps = {
  isLandingPage: false,
  isSignedIn: false,
};

export default Header;
