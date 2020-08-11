import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SignedOutPageHeader from '../components/SignedOutPageHeader';

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
    setFields({
      ...fields,
      [field]: event.target.value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(fields); // TODO - handle it like there's no tomorrow
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
      </form>
    </main>
  );
};

export default SignUpPage;
