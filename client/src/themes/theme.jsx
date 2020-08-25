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
        borderWidth: 2,
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
    MuiSwitch: {
      root: {
        width: 68,
        height: 48,
      },
      track: {
        backgroundColor: '#BDC7D4',
        borderRadius: 100,
        opacity: 1,
      },
      thumb: {
        width: 16,
        height: 16,
        backgroundColor: 'white',
      },
      switchBase: {
        padding: '16px 16px',
        '&.Mui-checked + .MuiSwitch-track': {
          opacity: 1,
        },
      },

    },
  },
});
