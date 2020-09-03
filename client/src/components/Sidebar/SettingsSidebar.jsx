import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Tab, Tabs } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';

const SettingsTabs = withStyles((theme) => ({
  indicator: {
    left: 0,
    width: 4,
    backgroundColor: theme.palette.primary.main,
  },
}))((props) => <Tabs {...props} />);

const SettingsTab = withStyles((theme) => ({
  root: {
    margin: theme.spacing(1.5, 0),
    paddingLeft: theme.spacing(3),
    minHeight: 36,
    textTransform: 'none',
    fontSize: '.9rem',
    fontWeight: 700,
  },
  wrapper: {
    alignItems: 'flex-start',
  },
  textColorInherit: {
    '&.Mui-selected': {
      color: theme.palette.primary.main,
    },
  },
}))((props) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(8, 3),
    },
  },
  title: {
    marginBottom: theme.spacing(6),
    paddingLeft: theme.spacing(2),
    fontSize: '1.8rem',
  },
  icon: {
    fill: theme.palette.primary.main,
    width: '1.25em',
    height: '1.25em',
  },
}));

const SettingsSidebar = ({ currentSidebarTab, handleLogout, handleSidebarTabChange }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1 className={classes.title}>
        Settings
        <SettingsIcon className={classes.icon} />
      </h1>
      <SettingsTabs
        orientation="vertical"
        aria-label="Mentions Crawler Settings"
        value={currentSidebarTab}
      >
        <SettingsTab label="Company" onClick={() => handleSidebarTabChange(0)} />
        <SettingsTab label="Log Out" onClick={() => handleLogout()} />
      </SettingsTabs>
    </div>
  );
};

SettingsSidebar.propTypes = {
  currentSidebarTab: PropTypes.number,
  handleLogout: PropTypes.func,
  handleSidebarTabChange: PropTypes.func,
};

SettingsSidebar.defaultProps = {
  currentSidebarTab: 0,
  handleLogout: () => {},
  handleSidebarTabChange: () => {},
};

export default SettingsSidebar;
