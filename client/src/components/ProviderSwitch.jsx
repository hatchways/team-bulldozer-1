import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Switch } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: theme.spacing(3, 0),
  },
  label: {
    padding: theme.spacing(0, 2),
    flexGrow: 1,
    fontWeight: 700,
  },
  switch: {
    marginLeft: 'auto',
  },
}));

const ProviderSwitch = ({ checked, onChange, provider }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img className={classes.image} src={provider.logo} alt={`Logo for ${provider.logo}`} />
      <div className={classes.label}>{ provider.label }</div>
      <Switch className={classes.switch} color="primary" checked={checked} onChange={onChange} />
    </div>
  );
};

ProviderSwitch.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  provider: PropTypes.object.isRequired,
};

ProviderSwitch.defaultProps = {
  onChange: () => {},
};

export default ProviderSwitch;
