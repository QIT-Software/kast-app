import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'space-around',
      textAlign: 'center',
      background: '#FDFCFE',
    },
    paperRoot: {
      width: '100%',
      maxWidth: 443,
      height: 326,
      marginTop: '10%',
      color: '#C82FC6',
      background: 'transparent',
    },
    media: {
      width: '100%',
      height: '100%',
      maxWidth: 400,
      maxHeight: 300,
      marginTop: 70,
    },
    form: {
      color: '#C82FC6',
      marginLeft: 20,
      marginRight: 20,
      width: '100%',
      maxWidth: 900,
    },
    avatarWrapper: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: 54,
    },
    avatarIcon: {
      marginRight: 24,
      width: 107,
      height: 107,
      boxShadow: '0px 0px 10px rgba(97, 0, 255, 0.22)',
    },
    userName: {
      textDecoration: 'underline',
      textAlign: 'left',
    },
    inputsWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      [theme.breakpoints.down(950)]: {
        flexWrap: 'wrap',
      },
    },
    inputsSubwrapper: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      maxWidth: 400,
      color: '#727272',
    },
    inputsSubwrapper1: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      maxWidth: 400,
      color: '#727272',

      [theme.breakpoints.down(950)]: {
        order: -1,
      },
    },
    inputsLocatedWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    locatedWrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'start',
      width: '100%',
      maxWidth: 180,
    },
    photoInput: {
      display: 'none',
    },
    photoInputBtn: {
      textTransform: 'capitalize',
    },
    input: {
      marginBottom: 20,
      marginLeft: 20,
      background: '#F5F6F8',
      border: '1px solid e3e3e3',
      borderRadius: 4,
      color: '#727272',
    },
    inputArea: {
      // minHeight: 178,
      marginBottom: 20,
      marginLeft: 20,
      background: '#F5F6F8',
      borderRadius: 4,
      color: '#727272',
    },
    label: {
      alignSelf: 'start',
      marginLeft: 12,
      marginBottom: 10,
    },
    button: {
      background:
        'linear-gradient(112.61deg, #882BFF 0.3%, rgba(255, 0, 122, 0.76) 100%)',
      borderRadius: 5,
      height: 50,
      marginTop: 30,
      marginLeft: 20,
    },
    referralsLinkContainer: {
      cursor: 'pointer',
    },
    referralsLink: {
      textDecoration: 'underline',
      color: '#C82FC6',
      marginTop: 50,
      [theme.breakpoints.down(450)]: {
        marginTop: 20,
        marginBottom: 20,
      },
    },
    userMedia: {
      marginRight: 24,
      width: 80,
      height: 60,
      boxShadow: '0px 0px 10px rgba(97, 0, 255, 0.22)',
    },
    userMediaContainer: {
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'row',
      marginTop: 30,
      marginLeft: 25,
    },
  }),
);

export {useStyles};
