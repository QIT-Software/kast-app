import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    roomRoot: {
      height: '96%',
      textAlign: 'center',
      background: '#FDFCFE',
      borderRadius: 20,
      borderStyle: 'solid',
      borderColor: '#CC3CCA',
      borderWidth: '1px',
      padding: 20,
      justifyContent: 'flex-end',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      [theme.breakpoints.down('sm')]: {
        height: '65vh',
      },
    },
    camerasContainer: {
      padding: 20,
      flex: 1,
    },
    container: {
      display: 'flex',
      margin: 'auto',
      justifyContent: 'center',
      alignItems: 'center',
    },

    testStyle: {
      width: '100%',
      height: '100%',
    },
    controlPanel: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginTop: 25,
      marginBottom: 10,
      width: '100%',
      // paddingLeft: 150,
      // paddingRight: 150,
      [theme.breakpoints.down('sm')]: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        height: 160,
      },
    },
    viewModelContainer: {
      display: 'flex',
      [theme.breakpoints.down('sm')]: {},
    },
    viewModelButton: {
      width: 30,
      height: 20,
      marginRight: 20,
      padding: 5,
    },
    devicesContainer: {
      display: 'flex',
    },
    deviceButtonWraper: {
      height: '100%',
      marginLeft: 40,
      minWidth: 40,
      borderRadius: 3,
      [theme.breakpoints.down('sm')]: {
        marginLeft: 10,
      },
      '&:hover': {
        // backgroundColor: '#E1E1E1',
      },
      '&:active': {
        // backgroundColor: '#C835C9',
      },
    },
    deviceGridButtonWraper: {
      marginLeft: 40,
      height: '100%',
      minWidth: 40,
      borderRadius: 3,
      [theme.breakpoints.down('sm')]: {
        // display: 'none',
      },
      '&:hover': {
        // backgroundColor: '#E1E1E1',
      },
      '&:active': {
        // backgroundColor: '#C835C9',
      },
    },
    deviceButton: {
      width: 40,
      height: 60,
      display: 'block',
      padding: 0,
    },
    deviceSpinner: {
      width: 25,
      height: 25,
      margin: 'auto',
    },
    deviceButtonTitle: {
      fontSize: 12,
      display: 'block',
    },
    socialManageContainer: {
      display: 'flex',
      [theme.breakpoints.down('sm')]: {
        order: 1,
      },
    },
    //
    gridList: {
      // width: 500,
      // height: 450,
    },
    primaryElement: {
      flexBasis: '40%',
      height: 400,
      backgroundColor: 'pink',
      borderColor: 'pink',
      borderWidth: 1,
      borderStyle: 'solid',
      alignSelf: 'center',
    },
    gridElement: {
      flexBasis: '30%',
      [theme.breakpoints.down('sm')]: {
        flexBasis: '45%',
      },
    },
    gridContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      margin: 'auto',
      flexDirection: 'row',
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      [theme.breakpoints.down('sm')]: {
        justifyContent: 'space-between',
      },
      // height: 300,
    },
    focusViewContainer: {},
    focusViewList: {
      height: '20%',
      flex: 1,
    },
    focusViewMain: {
      height: '80%',
      borderColor: 'black',
      borderWidth: 1,
      borderStyle: 'solid',
    },
    selectSubInput: {
      minWidth: 100,
      color: '#C82FC6',
      height: 35,
      marginLeft: 15,
    },
    largeScreenContainer: {
      flex: 1,
    },
    largeScreenMedia: {
      // width: 350,
      // height: 300,
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
    },
    formControl: {
      width: '100%',
      marginBottom: 10,
      marginTop: 10,
    },
    selectInput: {
      display: 'flex',
      alignItems: 'center',
      margin: 'auto',
    },
    videoContainerSmall: {
      flexBasis: '22%',
      height: 200,
      borderColor: 'black',
      borderWidth: 1,
      borderStyle: 'solid',
    },
    wrapper: {
      margin: theme.spacing(1),
      position: 'relative',
    },
    streamDurationContainer: {
      display: 'flex',
      alignItems: 'center',
      width: 160,
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    streamDurationTitle: {
      fontSize: 16,
      color: '#999',
      marginRight: 6,
    },
    streamDurationValue: {
      fontSize: 16,
      color: '#C82FC6',
    },
    deviceIconContainer: {
      width: 25,
      height: 25,
    },
    deviceIcon: {
      width: 25,
      height: 25,
      marginLeft: 15,
      objectFit: 'cover',
    },
    qualityBtn: {
      marginRight: 10,
      transition: 'all 1s',
    },
    media: {
      width: '100%',
      height: '100%',
    },
    logoContainer: {
      width: 120,
      height: 40,
    },
    userMedia: {
      marginTop: 10,
      width: '100%',
      height: '100%',
      // opacity: 0.5,
      boxShadow: '0px 0px 10px rgba(97, 0, 255, 0.22)',
      borderRadius: 10,
      position: 'relative',
    },
    userBg: {
      top: 0,
      left: 0,
      width: 'inherit',
      height: 'inherit',
      position: 'absolute',
      backgroundSize: 'auto',
      opacity: 0.5,
    },
    userMediaInPopUp: {
      marginRight: 24,
      width: 80,
      height: 60,
      boxShadow: '0px 0px 10px rgba(97, 0, 255, 0.22)',
    },
    userMediaContainer: {
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'row',
      marginTop: 10,
      marginBottom: 20,
      marginLeft: 25,
      alignItems: 'center',
    },
    photoInputBtn: {
      textTransform: 'capitalize',
    },
    topContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingLeft: 30,
      paddingRight: 30,
    },
  }),
);

export {useStyles};
