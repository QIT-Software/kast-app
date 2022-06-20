import React, {useEffect} from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import bookmarksLogo from './assets/BookmarksLogo.svg';
import {useStyles} from './Bookmarks.style';
import {RequireLoadable} from '../../../components';
import {useSelector} from 'state/hooks';
import {CardActionArea, Hidden, Button} from '@material-ui/core';
import {useBookmarksActions} from '../../../state/hooks/UseActions';
import {useTranslation} from 'react-i18next';

const Bookmarks = () => {
  const classes = useStyles();
  const state = useSelector((state) => state.bookmarks);
  const actions = useBookmarksActions();
  // const [sortBy, setSortBy] = useState('Relevant');
  // const [searchPattern, setSearchPattern] = useState('');
  // const handleChange = (event: ChangeEvent<{value: unknown}>) => {
  //   setSortBy(event.target.value as string);
  // };
  const {t} = useTranslation('bookmarks');

  useEffect(() => {
    actions.fetchBookmarks();
  }, []);

  // const prepare = (data: Bookmark[]) => {
  //   if (searchPattern === '') return data;
  //   return data.filter(
  //     (bookmark) =>
  //       bookmark.topic.toLowerCase().indexOf(searchPattern.toLowerCase()) > -1,
  //   );
  // };

  const BookmarkItem = ({
    id,
    date,
    topic,
    text,
  }: {
    id: string;
    date: string;
    topic: string;
    text: string;
  }) => {
    return (
      <CardActionArea className={classes.bookmark}>
        <Box className={classes.bookmarkDateWrapper}>
          <Typography className={classes.bookmarkDate}>{date}</Typography>
        </Box>
        <Typography variant="h5" component="h2" className={classes.bookmarkTopic}>
          {topic}
        </Typography>
        <Typography variant="h5" component="h5" className={classes.bookmarkTopic}>
          {text}
        </Typography>
        <Button
          onClick={() => {
            // eslint-disable-next-line no-console
            console.log('delete bookmark id', id);
          }}
        >
          delete
        </Button>
      </CardActionArea>
    );
  };
  return (
    <Box className={classes.root}>
      <Hidden only={['xs', 'sm']}>
        <Paper className={classes.paperRoot} elevation={0}>
          <Typography gutterBottom variant="h4" component="h2">
            {t('anEasyWay')}
            <br />
            {t('toKeepYourMind')}
            <br />
            {t('handy')}
          </Typography>

          <CardMedia
            className={classes.media}
            image={bookmarksLogo}
            title="Contemplative Reptile"
          />
        </Paper>
      </Hidden>
      <RequireLoadable data={state}>
        {(bookmarks) => {
          return (
            <Box className={classes.bookmarksWrapper}>
              <Box className={classes.bookmarksSection}>
                <Typography gutterBottom variant="h4" component="h1">
                  {t('bookmarks')}
                </Typography>
                <Box className={classes.bookmarksGroup}>
                  <Typography gutterBottom variant="h5" component="h4">
                    {t('myBookmarks')}
                  </Typography>
                  <Box className={classes.bookmarksList}>
                    {bookmarks.data.map((bookmark) => (
                      <BookmarkItem
                        key={bookmark.id}
                        id={bookmark.id}
                        date={bookmark.date}
                        topic={bookmark.topic}
                        text={bookmark.text}
                      />
                    ))}
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

export default Bookmarks;
