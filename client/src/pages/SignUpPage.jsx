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

  const [fields, setFields] = useState({
    email: '', company: '', password: '', passwordRepeat: '',
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
      console.log(fields); // TODO - handle it like no one's watching
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
          value={fields.email}
          onChange={(event) => handleChange('email', event)}
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          className={classes.input}
          id="company"
          required
          label="Company Name"
          variant="outlined"
          value={fields.company}
          onChange={(event) => handleChange('company', event)}
          error={!!errors.company}
          helperText={errors.company}
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
      </form>
    </main>
  );
};

export default SignUpPage;
