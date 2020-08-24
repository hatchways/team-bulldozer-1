import React, { useState } from 'react';
import { Button, Snackbar, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import SignedOutPageHeader from '../components/SignedOutPageHeader';
import AuthApi from '../utils/api/AuthApi';
import { Alert } from '@material-ui/lab'

const useStyles = makeStyles((theme) => ({
  input: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(3),
  },
}));

const SignUpPage = () => {
  const classes = useStyles();

  const [fields, setFields] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (field, event) => {
    setErrors({});
    setFields({
      ...fields,
      [field]: event.target.value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    AuthApi.login(fields.email, fields.password)
      .then((response) => {
        console.log('logged in', response);
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          setErrors({
            ...errors,
            general: 'Invalid username or password.',
          });
        } else {
          setErrors({
            ...errors,
            general: 'An unexpected server error occured. Please try again later.',
          });
        }
      });
  };

  return (
    <main>
      <SignedOutPageHeader title="Welcome Back!" subtitle="Login to your account" />
      <form onSubmit={handleFormSubmit}>
        <TextField
          className={classes.input}
          id="email"
          type="email"
          required
          label="Your email"
          variant="outlined"
          value={fields.email}
          onChange={(event) => handleChange('email', event)}
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          className={classes.input}
          id="password"
          type="password"
          required
          label="Password"
          variant="outlined"
          value={fields.password}
          onChange={(event) => handleChange('password', event)}
          error={!!errors.password}
          helperText={errors.password}
        />
        <Button
          className={classes.button}
          color="primary"
          variant="contained"
          type="submit"
        >
          Submit
        </Button>
        {!!errors.general ? (
          <Snackbar open={!!errors.general} autoHideDuration={2000}>
            <Alert severity="error">
              { errors.general }
            </Alert>
          </Snackbar>
        ) : null }
      </form>
    </main>
  );
};

export default SignUpPage;
