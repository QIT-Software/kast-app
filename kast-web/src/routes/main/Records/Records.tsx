import React, {useEffect} from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import recordsLogo from './assets/records_logo.svg';
import recordIcon from './assets/record_icon.svg';
import recordRemove from './assets/remove_record.svg';
import downloadIcon from './assets/download.svg';
import {useStyles} from 'routes/main/Records/Records.style';
import {RequireLoadable} from '../../../components';
import {useSelector} from 'state/hooks';
import {Hidden, Button} from '@material-ui/core';
import {useRecordsActions} from '../../../state/hooks/UseActions';
import formatDate from 'date-fns/format';
import {useTranslation} from 'react-i18next';

const Records = () => {
  const classes = useStyles();
  const state = useSelector((state) => state.records);
  const actions = useRecordsActions();
  // const [sortBy, setSortBy] = useState('Relevant');
  // const handleChange = (event: ChangeEvent<{value: unknown}>) => {
  //   setSortBy(event.target.value as string);
  // };
  const {t} = useTranslation('records');

  useEffect(() => {
    actions.fetchRecords();
  }, []);
  const RecordItem = ({
    id,
    name,
    date,
    recordUrl,
  }: {
    id: string;
    name: string;
    date: Date;
    recordUrl: string;
  }) => {
    return (
      <Box className={classes.record}>
        <CardMedia image={recordIcon} className={classes.recordIcon} />
        <Typography
          variant="h5"
          component="h1"
          align="left"
          className={classes.recordName}
        >
          {name}
        </Typography>
        <Typography
          variant="h5"
          component="h2"
          align="center"
          className={classes.recordDate}
        >
          {formatDate(new Date(date), 'dd.MM.yyyy')}
        </Typography>
        <CardMedia image={downloadIcon} className={classes.recordDownloadIcon} />
        <a className={classes.recordButton} target="blank" href={recordUrl}>
          <Typography variant="h5">{t('download')}</Typography>
        </a>
        <Button onClick={() => actions.removeRecord(id)}>
          <CardMedia image={recordRemove} className={classes.recordRemove} />
        </Button>
      </Box>
    );
  };
  return (
    <Box className={classes.root}>
      <Hidden only={['xs', 'sm', 'md']}>
        <Paper className={classes.paperRoot} elevation={0}>
          <Typography gutterBottom variant="h4" component="h2" align="center">
            {t('dontMissDetails')} <br /> {t('reviewIt')}
          </Typography>
          <CardMedia
            className={classes.media}
            image={recordsLogo}
            title={t('Contemplative Reptile')}
          />
        </Paper>
      </Hidden>
      <RequireLoadable data={state}>
        {(records) => {
          return (
            <Box className={classes.bookmarksWrapper}>
              {/* <FormControl className={classes.formControl} variant="outlined"> */}
              {/*  <Box className={classes.selectInput}> */}
              {/*    <Typography variant="subtitle2" color="textSecondary"> */}
              {/*      {t('sortBy')} */}
              {/*    </Typography> */}
              {/*    <Select */}
              {/*      className={classes.selectSubInput} */}
              {/*      labelId="demo-simple-select-label" */}
              {/*      id="demo-simple-select" */}
              {/*      value={sortBy} */}
              {/*      onChange={handleChange} */}
              {/*    > */}
              {/*      <MenuItem value="Relevant">{t('time')}</MenuItem> */}
              {/*      <MenuItem value="Theme">{t('time')}</MenuItem> */}
              {/*    </Select> */}
              {/*  </Box> */}
              {/* </FormControl> */}

              <Box className={classes.recordsSection}>
                <Typography gutterBottom variant="h4" component="h1">
                  {t('records')}
                </Typography>
                <Box
                  className={classes.recordTitle}
                  borderBottom={1}
                  borderColor="primary"
                >
                  <Typography
                    variant="h5"
                    component="h2"
                    align="left"
                    className={classes.recordNameTitle}
                  >
                    {t('name')}
                  </Typography>
                  <Typography
                    variant="h5"
                    component="h2"
                    align="center"
                    className={classes.recordDateTitle}
                  >
                    {t('date')}
                  </Typography>
                  <Typography
                    variant="h5"
                    component="h2"
                    className={classes.recordDuratationTitle}
                  >
                    {t('time')}
                  </Typography>
                </Box>

                <Box className={classes.recordsGroup}>
                  <Box className={classes.recordsList}>
                    {records.data.map((record) => {
                      return (
                        <RecordItem
                          key={record.id}
                          id={record.id}
                          name={record.name}
                          date={record.date}
                          recordUrl={record.fileUrl}
                        />
                      );
                    })}
                  </Box>
                </Box>
              </Box>
            </Box>
          );
        }}
      </RequireLoadable>
    </Box>
  );
};

export default Records;
