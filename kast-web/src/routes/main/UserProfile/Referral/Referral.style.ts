import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    rootMain: {
      display: 'flex',
      textAlign: 'center',
      // justifyContent: 'center',
      background: '#FDFCFE',
    },
    paperRoot: {
      width: '100%',
      maxWidth: 443,
      height: 326,
      marginTop: '8%',
      marginLeft: '2%',
      marginRight: '2%',
      color: '#C82FC6',
      background: 'transparent',
    },
    media: {
      width: '100%',
      height: '100%',
      maxWidth: 522,
      maxHeight: 261,
      marginTop: 25,
    },
    treeContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginLeft: 100,
    },
    levelContainer: {
      display: 'flex',
      flexDirection: 'row',
      marginTop: 20,
    },
    levelTitle: {
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: 18,
      marginRight: 70,
      marginLeft: 18,
      [theme.breakpoints.down(1320)]: {
        marginRight: 20,
        marginLeft: 14,
      },
    },
    levelInner: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    Red: {
      color: 'rgba(191, 16, 16, 0.82)',
    },
    Green: {
      color: '#618B3D',
    },
    Blue: {
      color: '#5265B9',
    },
    circleRed: {
      backgroundColor: 'rgba(191, 16, 16, 0.82)',
    },
    circleGreen: {
      backgroundColor: '#618B3D',
    },
    circleBlue: {
      backgroundColor: '#5265B9',
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
      width: 80,
      height: 80,
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
    // label: {
    //   alignSelf: 'start',
    //   marginLeft: 12,
    //   marginBottom: 10,
    // },
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
    },
    root: {
      color: theme.palette.text.secondary,
      marginTop: 40,
      marginLeft: -20,
      '&:hover > $content': {
        backgroundColor: theme.palette.action.hover,
      },
      '&:focus > $content, &$selected > $content': {
        backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
        color: 'var(--tree-view-color)',
      },
      '&:focus > $content $label, &:hover > $content $label, &$selected > $content $label': {
        backgroundColor: 'transparent',
      },
    },
    content: {
      color: theme.palette.text.secondary,
      borderTopRightRadius: theme.spacing(2),
      borderBottomRightRadius: theme.spacing(2),
      paddingRight: theme.spacing(1),
      fontWeight: theme.typography.fontWeightMedium,
      '$expanded > &': {
        fontWeight: theme.typography.fontWeightRegular,
      },
    },
    group: {
      marginLeft: 0,
      '& $content': {
        paddingLeft: theme.spacing(2),
      },
    },
    expanded: {},
    selected: {},
    infoContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
    label: {
      fontWeight: 'inherit',
      color: 'inherit',
    },
    labelRoot: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0.5, 0),
    },
    labelIcon: {
      marginRight: theme.spacing(1),
    },
    infoMain: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
    },
    labelText: {
      marginRight: 8,
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: 18,
      color: '#C82FC6',
    },
    labelInfo: {
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: 18,
      color: '#979797',
    },
    secondLevel: {
      marginLeft: 50,
      '&::before': {
        display: 'block',
        width: 100,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
      },
    },
    mediaBefore: {
      width: '100%',
      height: '100%',
      maxWidth: 51,
      maxHeight: 92,
      position: 'absolute',
      marginLeft: 45,
      marginTop: -70,
      zIndex: 0,
      '&::first-child': {
        height: '60%',
        maxHeight: 52,
      },
    },
    mediaBefore2: {
      width: '100%',
      height: '100%',
      maxWidth: 2,
      maxHeight: 92,
      position: 'absolute',
      marginLeft: -22,
      marginTop: -40,
      zIndex: 0,
    },
    firstLevel: {
      width: 300,
    },
    marginTop: {
      height: 40,
      [theme.breakpoints.down(450)]: {
        display: 'none',
      },
    },
    marginTop3: {
      height: 40,
      borderLeftStyle: 'solid',
      borderLeftColor: '#CC3CCA',
      borderLeftWidth: '2px',
    },
    labelNoInfo: {
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: 18,
      color: '#979797',
      marginBottom: 30,
    },
    moreInfoContainer: {
      width: 20,
      height: 20,
      position: 'absolute',
      right: 10,
      top: 25,
    },
    moreInfo: {
      width: '100%',
      height: '100%',
    },
  }),
);

export {useStyles};
