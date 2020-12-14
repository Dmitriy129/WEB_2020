import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ba68c8',
    },
    secondary: {
      main: '#1b5e20',
    },
    background: {
      default: '#fff',
    },
  },
});

export default theme;
