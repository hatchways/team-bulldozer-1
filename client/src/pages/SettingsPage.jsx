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

const SettingsPage = ({ currentSidebarTab }) => {
  const classes = useStyles();
  const { user, setUser } = useContext(UserContext);
  const { terms, email } = user;
  const [fields, setFields] = useState({ terms, email });
  const [errors, setErrors] = useState({ terms, email });

  const handleChange = (field, value) => {
    setFields({
      ...fields,
      [field]: value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    AuthApi.setProfileInfo({ terms, email })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        setErrors((oldErrors) => ({ ...oldErrors, general: error }));
      });
  };

  return (
    <main className={classes.root}>
      <SettingsPanel index={0} value={currentSidebarTab} label="Company">
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
              required
              placeholder="Weekly report"
              value={fields.email}
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
          {errors.general ? (
            <Snackbar open={!!errors.general} autoHideDuration={2000}>
              <Alert severity="error">
                { errors.general }
              </Alert>
            </Snackbar>
          ) : null }
        </form>
      </SettingsPanel>
    </main>
  );
};

SettingsPage.propTypes = {
  currentSidebarTab: PropTypes.number,
};

SettingsPage.defaultProps = {
  currentSidebarTab: 0,
};

export default SettingsPage;
