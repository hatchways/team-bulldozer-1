import React from 'react';
import PropTypes from 'prop-types';
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

import Header from '../components/Header';

const useStyles = makeStyles({
  root: {
    paddingTop: '100px',
  },
});

const AppLayout = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header isSignedIn />
      <Container maxWidth="">
        { children }
      </Container>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AppLayout;
