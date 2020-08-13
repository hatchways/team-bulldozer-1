import React, { useState } from 'react';
import { Button, TextField, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import SignedOutPageHeader from '../components/SignedOutPageHeader';
import AuthApi from '../utils/api/AuthApi';

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

  const [fields, setFields] = useState({
    username: '', companyName: '', password: '', passwordRepeat: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (field, event) => {
    setErrors({});
    setFields({
      ...fields,
      [field]: event.target.value,
    });
  };

  const validate = () => {
    let isValid = true;

    if (fields.password !== fields.passwordRepeat) {
      setErrors({
        ...errors,
        passwordRepeat: 'Both passwords must match.',
      });
      isValid = false;
    }

    if (fields.password.length < 6) {
      setErrors({
        ...errors,
        password: 'Password must be 6 or more characters long.',
      });
      isValid = false;
    }

    return isValid;
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      AuthApi.register(fields.username, fields.companyName, fields.password)
        .then((response) => {
          console.log('res', response); // TODO - store me in context plz
        })
        .catch((error) => {
          const errorData = error.response.data;
          if (errorData.errors) {
            const errorsToDisplay = {};
            errorData.errors.forEach((errorMsg) => {
              errorsToDisplay[errorMsg.param] = errorMsg.msg;
            });
            setErrors({
              ...errors,
              ...errorsToDisplay,
            });
          } else if (errorData.response) {
            setErrors({
              ...errors,
              general: errorData.response,
            });
          } else {
            setErrors({
              ...errors,
              general: 'An unexpected error occured while creating your account.',
            });
          }
        });
    }
  };

  return (
    <main>
      <SignedOutPageHeader title="Let's Get Started!" subtitle="Create an account" />
      <form onSubmit={handleFormSubmit}>
        <TextField
          className={classes.input}
          id="email"
          type="email"
          required
          label="Your email"
          variant="outlined"
          value={fields.username}
          onChange={(event) => handleChange('username', event)}
          error={!!errors.username}
          helperText={errors.username}
        />
        <TextField
          className={classes.input}
          id="company"
          required
          label="Company Name"
          variant="outlined"
          value={fields.companyName}
          onChange={(event) => handleChange('companyName', event)}
          error={!!errors.companyName}
          helperText={errors.companyName}
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
        <TextField
          className={classes.input}
          id="passwordRepeat"
          type="password"
          required
          label="Repeat password"
          variant="outlined"
          value={fields.passwordRepeat}
          onChange={(event) => handleChange('passwordRepeat', event)}
          error={!!errors.passwordRepeat}
          helperText={errors.passwordRepeat}
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
