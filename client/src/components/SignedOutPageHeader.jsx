import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(6),
  },
}));

const SignedOutPageHeader = ({ title, subtitle }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h1" gutterBottom>{title}</Typography>
      {subtitle && <Typography variant="subtitle1" gutterBottom>{subtitle}</Typography>}
    </div>
  );
};

SignedOutPageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};

SignedOutPageHeader.defaultProps = {
  subtitle: null,
};

export default SignedOutPageHeader;
