import {createStyles, makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'space-around',
      textAlign: 'center',
      padding: 30,
    },
    paperRoot: {
      marginTop: '10%',
      color: '#C82FC6',
      background: 'transparent',
    },
    media: {
      height: 300,
      width: 400,
      marginTop: 50,
    },
    bookmarksWrapper: {
      marginLeft: 20,
      color: '#C82FC6',
    },
    formControl: {
      width: '100%',
      marginBottom: 21,
    },
    selectInput: {
      display: 'flex',
      alignItems: 'center',
    },
    selectSubInput: {
      minWidth: 100,
      color: '#C82FC6',
      height: 35,
      marginLeft: 15,
    },
    simpleInput: {
      width: '100%',
      maxWidth: 300,
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      background: '#FFFFFF',
    },
    input: {
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    recordsSection: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'start',
    },
    recordsGroup: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'start',
      marginLeft: 25,
    },
    recordsList: {
      display: 'flex',
      maxWidth: 1100,
      flexWrap: 'wrap',
    },
    record: {
      display: 'flex',
      alignItems: 'center',
      flexBasis: '100%',
      padding: '11px 20px',
    },
    recordDateWrapper: {
      width: 215,
      display: 'flex',
      justifyContent: 'flex-end',
    },
    recordDate: {
      flexBasis: '30%',
      flexShrink: 1,
      minWidth: 250,
    },
    recordName: {
      flexBasis: '25%',
      flexShrink: 1,
    },
    recordDuratation: {
      flexBasis: '10%',
      flexShrink: 1,
      marginRight: 50,
      minWidth: 100,
    },
    recordLength: {
      marginRight: 'auto',
      fontSize: 14,
      color: '#A6A6A6',
    },
    recordIcon: {
      minWidth: 30,
      minHeight: 26,
      marginRight: 30,
    },
    recordRemove: {
      minWidth: 16,
      minHeight: 16,
      marginLeft: 65,
    },
    recordDownloadIcon: {
      minWidth: 25,
      minHeight: 25,
      marginRight: 15,
    },
    recordTitle: {
      display: 'flex',
      alignItems: 'center',
      flexBasis: '100%',
      width: '100%',
      padding: '11px 20px',
    },
    recordNameTitle: {
      flexBasis: '25%',
      marginLeft: 85,
      flexShrink: 1,
    },
    recordDateTitle: {
      flexBasis: '30%',
      flexShrink: 1,
      minWidth: 250,
    },
    recordDuratationTitle: {
      flexBasis: '12%',
      marginRight: 340,
    },
    recordButton: {
      textTransform: 'none',
      minWidth: 150,
    },
  }),
);

export {useStyles};
