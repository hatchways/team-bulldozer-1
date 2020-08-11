import { createMuiTheme } from '@material-ui/core';

export default createMuiTheme({
  palette: {
    background: { default: '#FAFBFF' },
    primary: { main: '#6583F2' },
  },
  shape: {
    borderRadius: 100,
  },
  typography: {
    fontFamily: 'Montserrat',
    fontSize: 13,
    h1: {
      fontSize: 30,
      fontWeight: 'bold',
    },
    subtitle1: {
      fontSize: 16,
      color: '#6583F2',
      opacity: 0.5,
    },
  },
});
