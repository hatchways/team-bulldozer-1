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

const CrawlerSwitch = ({ checked, crawler, onChange }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img className={classes.image} src={crawler.logo} alt={`Logo for ${crawler.logo}`} />
      <div className={classes.label}>{ crawler.label }</div>
      <Switch className={classes.switch} color="primary" checked={checked} onChange={onChange} />
    </div>
  );
};

CrawlerSwitch.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  crawler: PropTypes.object.isRequired,
};

CrawlerSwitch.defaultProps = {
  onChange: () => {},
};

export default CrawlerSwitch;
