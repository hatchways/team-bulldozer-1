import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
    marginBottom: theme.spacing(6),
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  label: {
    flex: '0 0 25%',
    padding: theme.spacing(2, 1),
    paddingLeft: 0,
    fontWeight: 'bold',
  },
  field: {
    flexGrow: 1,
    padding: theme.spacing(0, 1),
  },
}));

const SettingsField = ({ children, label }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.label}>
        { label }
      </div>
      <div className={classes.field}>
        { children }
      </div>
    </div>
  );
};

SettingsField.propTypes = {
  children: PropTypes.any.isRequired,
  label: PropTypes.string.isRequired,
};

export default SettingsField;
