import {createMuiTheme, makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import {StyleRules} from '@material-ui/core/styles/withStyles';
import {ComponentNameToClassKey} from '@material-ui/core/styles/overrides';
// import DMSans from './fonts/dm-sans-v4-latin-500.woff2';

// const dmSans = {
//   fontFamily: 'DMSans',
//   fontStyle: 'normal',
//   fontWeight: 500,
//   src: `
//     local('DMSans'),
//     local('DMSans-Regular'),
//     url(${DMSans}) format('woff2')
//   `,
//   unicodeRange:
//     'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
// };

// region MuiSwitch
const MuiSwitch: Partial<StyleRules<ComponentNameToClassKey['MuiSwitch']>> = {
  root: {
    width: 64,
    height: 44,
    padding: 12,
  },
  switchBase: {
    padding: 14,
    '&$checked': {
      transform: `translateX(20px)`,
    },
  },
  thumb: {
    width: 16,
    height: 16,
    borderRadius: 2.5,
    backgroundColor: '#fff',
  },
  colorSecondary: {
    '&$checked + $track': {
      backgroundColor: '#C82FC6',
      opacity: '1 !important',
    },
  },
  track: {
    // backgroundColor: '#C82FC6',
    opacity: '0.6 !important',
    borderRadius: 2.5,
  },
};
// endregion

export const muiTheme = createMuiTheme({
  typography: {
    fontFamily: 'dmSans, sans-serif',
  },
  palette: {
    primary: {
      main: '#C82FC6',
    },
    secondary: {
      main: '#727272',
    },
    text: {
      primary: '#3F3F3F',
    },
  },
  props: {
    MuiButton: {
      disableElevation: true,
    },
  },
  overrides: {
    MuiOutlinedInput: {
      root: {
        '&$focused $notchedOutline': {
          borderWidth: 1,
        },
      },
      notchedOutline: {
        borderWidth: 1,
      },
    },
    MuiFormGroup: {
      root: {
        marginBottom: 20,
      },
    },
    MuiSwitch,
    MuiButton: {
      root: {
        color: '#C82FC6',
      },
      outlined: {
        borderColor: '#C82FC6',
      },
      contained: {
        background:
          'linear-gradient(99.14deg, #882BFF 4.5%, rgba(255, 0, 122, 0.76) 99.14%);',
        borderRadius: 4,
        color: '#FFFFFF',
        '&$disabled': {
          color: '#FFFFFFA0',
        },
      },
    },
  },
});

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    burger: {
      width: 40,
      height: 40,
      [theme.breakpoints.down('sm')]: {
        display: 'flex',
        flexWrap: 'wrap',
      },
    },
  }),
);
