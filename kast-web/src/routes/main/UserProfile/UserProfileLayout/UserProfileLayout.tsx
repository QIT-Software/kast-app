import React from 'react';
import {useStyles} from 'routes/main/UserProfile/UserProfileLayout/UserProfileLayout.style';
import {Typography, Box, List, ListItem} from '@material-ui/core';
import {useHistory} from 'react-router-dom';

const UserProfileLayout: React.FC = ({children}) => {
  const classes = useStyles();
  // const menuItems = ['my info', 'impact', 'resume', 'gallery', 'portfolio', 'referral'];
  const history = useHistory();
  return (
    <Box className={classes.root}>
      <Box className={classes.menuContainer}>
        <Box className={classes.titleContainer}>
          <Typography
            gutterBottom
            variant="h4"
            component="h2"
            color="primary"
            align="center"
          >
            Manage you profile
            <br />
            to be actual
          </Typography>
        </Box>
        <Box className={classes.listContainer}>
          <List component="nav">
            <ListItem
              button
              style={{marginBottom: 30}}
              onClick={() => {
                // eslint-disable-next-line no-restricted-globals
                history.push(`/userprofile/my-info`);
              }}
            >
              <Typography variant="h4" component="h4" align="left" color="primary">
                My info
              </Typography>
            </ListItem>
            <ListItem
              button
              style={{marginBottom: 30}}
              onClick={() => {
                // eslint-disable-next-line no-restricted-globals
                history.push(`/userprofile/impact`);
              }}
            >
              <Typography variant="h4" component="h4" align="left" color="primary">
                Impact
              </Typography>
            </ListItem>
            <ListItem
              button
              style={{marginBottom: 30}}
              onClick={() => {
                // eslint-disable-next-line no-restricted-globals
                history.push(`/userprofile/resume`);
              }}
            >
              <Typography variant="h4" component="h4" align="left" color="primary">
                Resume
              </Typography>
            </ListItem>
            <ListItem
              button
              style={{marginBottom: 30}}
              onClick={() => {
                // eslint-disable-next-line no-restricted-globals
                history.push(`/userprofile/gallery`);
              }}
            >
              <Typography variant="h4" component="h4" align="left" color="primary">
                Gallery
              </Typography>
            </ListItem>
            <ListItem
              button
              style={{marginBottom: 30}}
              onClick={() => {
                // eslint-disable-next-line no-restricted-globals
                history.push(`/userprofile/portfolio`);
              }}
            >
              <Typography variant="h4" component="h4" align="left" color="primary">
                Portfolio
              </Typography>
            </ListItem>
            <ListItem
              button
              style={{marginBottom: 30}}
              onClick={() => {
                // eslint-disable-next-line no-restricted-globals
                history.push(`/userprofile/referral`);
              }}
            >
              <Typography variant="h4" component="h4" align="left" color="primary">
                Referral
              </Typography>
            </ListItem>
          </List>
        </Box>
      </Box>
      <Box className={classes.content}>{children}</Box>
    </Box>
  );
};

export default UserProfileLayout;
