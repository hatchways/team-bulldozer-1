import { createMuiTheme } from '@material-ui/core';

const primaryColor = '#6583F2';
const buttonPadding = '.85rem 2.5rem';

export default createMuiTheme({
  palette: {
    background: { default: '#FAFBFF' },
    primary: { main: primaryColor },
  },
  shape: {
    borderRadius: 100,
  },
  typography: {
    fontFamily: 'Montserrat',
    fontSize: 13,
    h1: {
      fontSize: 30,
      fontWeight: 700,
    },
    subtitle1: {
      fontSize: 16,
      color: primaryColor,
      opacity: 0.5,
    },
  },
  overrides: {
    MuiButton: {
      root: {
        padding: buttonPadding,
        fontWeight: 'bold',
      },
      outlined: {
        padding: buttonPadding,
        borderWidth: '2px',
      },
    },
    MuiOutlinedInput: {
      notchedOutline: {
        borderColor: '#E7E7E7',
      },
    },
    MuiTextField: {
      root: {
        width: '100%',
      },
    },
  },
});
