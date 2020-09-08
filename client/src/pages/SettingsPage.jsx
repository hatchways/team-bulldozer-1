import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import { UserContext } from '../contexts/User';

import SettingsField from '../components/Settings/SettingsField';
import SettingsPanel from '../components/Settings/SettingsPanel';
import SettingsListField from '../components/Settings/SettingsListField';
import SettingsTextField from '../components/Settings/SettingsTextField';
import AuthApi from '../utils/api/AuthApi';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(8),
    },
  },
}));

const SettingsPage = ({ currentSidebarTabIndex }) => {
  const classes = useStyles();

  const { user, setUser } = useContext(UserContext);
  const { terms, email } = user;

  const [fields, setFields] = useState({ terms, email });
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFields({
      ...fields,
      [field]: value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    AuthApi.setProfileInfo({ terms: fields.terms, email: fields.email })
      .then((response) => {
        setUser(response.data);
        setErrors({ success: 'Successfully edited your profile.' });
      })
      .catch(() => {
        setErrors((oldErrors) => ({ ...oldErrors, general: 'An error occurred while trying to edit your profile.' }));
      });
  };

  const statusToDisplay = errors.general || errors.success;
  const handleStatusClose = () => {
    setErrors({});
  };

  return (
    <main className={classes.root}>
      <SettingsPanel index={0} value={currentSidebarTabIndex} label="Company">
        <form onSubmit={handleFormSubmit}>
          <SettingsField label="Your company">
            <SettingsListField
              value={fields.terms}
              placeholder="Company name"
              onItemsChange={(items) => handleChange('terms', items)}
            />
          </SettingsField>
          <SettingsField label="Weekly report">
            <SettingsTextField
              id="email"
              type="email"
              required
              placeholder="Weekly report"
              value={fields.email}
              onChange={(value) => handleChange('email', value)}
            />
          </SettingsField>
          <Button
            className={classes.button}
            color="primary"
            variant="contained"
            type="submit"
          >
            Submit
          </Button>
          {statusToDisplay ? (
            <Snackbar open={!!statusToDisplay} onClose={handleStatusClose} autoHideDuration={2000}>
              <Alert severity={errors.success ? 'success' : 'error'}>
                { statusToDisplay }
              </Alert>
            </Snackbar>
          ) : null }
        </form>
      </SettingsPanel>
    </main>
  );
};

SettingsPage.propTypes = {
  currentSidebarTabIndex: PropTypes.number,
};

SettingsPage.defaultProps = {
  currentSidebarTabIndex: 0,
};

export default SettingsPage;
