import {createStyles, makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      textAlign: 'center',
    },
    paperRoot: {
      marginTop: '10%',
      marginRight: '10%',
      color: '#C82FC6',
      background: 'transparent',
    },
    media: {
      height: 376,
      width: 396,
      marginTop: 50,
    },
    bookmarksWrapper: {
      marginLeft: 20,
      color: '#C82FC6',
    },
    formControl: {
      minWidth: 500,
      display: 'flex',
      flexDirection: 'row',
      marginBottom: 21,
    },
    selectInput: {
      width: 140,
      marginRight: 100,
    },
    selectSubInput: {
      minWidth: 210,
      color: '#C82FC6',
      height: 35,
    },
    simpleInput: {
      width: '100%',
      maxWidth: 300,
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      background: '#FFFFFF',
      border: '1px solid #E6C7E5',
    },
    input: {
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    bookmarksSection: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'start',
    },
    bookmarksGroup: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'start',
      marginTop: 40,
      marginLeft: 25,
    },
    bookmarksList: {
      display: 'flex',
      maxWidth: 1100,
      flexWrap: 'wrap',
    },
    bookmark: {
      width: 248,
      height: 106,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      padding: '11px 20px',
      marginRight: 20,
      marginBottom: 20,
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      background: '#FFFFFF',
      border: '1px solid #E3E3E3',
      borderRadius: 10,
    },
    bookmarkDateWrapper: {
      width: 215,
      display: 'flex',
      justifyContent: 'flex-end',
    },
    bookmarkDate: {
      color: '#C7C7C7',
      fontSize: 12,
      fontWeight: 500,
    },
    bookmarkTopic: {
      marginTop: 'auto',
      marginRight: 'auto',
    },
    bookmarkLength: {
      marginRight: 'auto',
      fontSize: 14,
      color: '#A6A6A6',
    },
  }),
);

export {useStyles};
