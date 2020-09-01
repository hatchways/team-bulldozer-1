import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Tab, Tabs } from '@material-ui/core';

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
    padding: theme.spacing(8, 3),
  },
  title: {
    marginBottom: theme.spacing(6),
    paddingLeft: theme.spacing(2),
  },
}));

const SettingsSidebar = () => {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState(1);

  return (
    <div className={classes.root}>
      <h1 className={classes.title}>Settings</h1>
      <SettingsTabs
        orientation="vertical"
        aria-label="Vertical tabs example"
        value={1}
      >
        <SettingsTab label="Company" />
        <SettingsTab label="Security" />
        <SettingsTab label="Log Out" />
      </SettingsTabs>
    </div>
  );
};

export default SettingsSidebar;
