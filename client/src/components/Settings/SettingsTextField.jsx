import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

const SettingsTextField = withStyles((theme) => ({
  root: {
    background: 'white',
    borderRadius: theme.shape.borderRadius,
  },
}),)((props) => <TextField variant="outlined" {...props} />);

export default SettingsTextField;
