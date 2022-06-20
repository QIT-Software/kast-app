import React, {useEffect, useState} from 'react';
import {useSelector} from 'state/hooks';
import {useStyles} from './Impact.style';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import CardMedia from '@material-ui/core/CardMedia';
import {useUserProfileActions} from 'state/hooks/UseActions';
import {Hidden} from '@material-ui/core';
import ChipInput from 'material-ui-chip-input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
// import classNames from 'classnames';
import TextField from '@material-ui/core/TextField';

import {RequireLoadable} from 'components';
import userProfileLogo from 'routes/main/UserProfile/assets/userProfileLogo.svg';

const Impact = () => {
  const user = useSelector((state) => state.userProfile);
  const classes = useStyles();
  const userActions = useUserProfileActions();
  // const history = useHistory();
  const [skills, setSkills] = useState<string[]>();
  const [mission, setMission] = useState<string>();
  const [vision, setVision] = useState<string>();
  const [interests, setInterests] = useState<string[]>();

  const addSkills = (skill: string) => {
    if (!user.isSuccess) return;
    setSkills([...(skills || user.skills), skill]);
  };
  const deleteSkill = (index: number) => {
    if (!user.isSuccess) return;
    const currentSkills: string[] = skills || user.skills;
    currentSkills.splice(index, 1);
    setSkills([...currentSkills]);
  };

  const addInterests = (interest: string) => {
    if (!user.isSuccess) return;
    setInterests([...(interests || user.interests), interest]);
  };

  const deleteInterests = (index: number) => {
    if (!user.isSuccess) return;
    const currentInterests: string[] = interests || user.interests;
    currentInterests.splice(index, 1);
    setInterests([...currentInterests]);
  };

  const date = new Date();

  const save = () => {
    userActions.save({
      name: user.isSuccess ? user.name : '',
      country: user.isSuccess ? user.country : '',
      city: user.isSuccess ? user.city : '',
      position: user.isSuccess ? user.position : '',
      telephone: user.isSuccess ? user.telephone : '',
      dateOfBirth: date,
      tags: user.isSuccess ? user.tags : [''],
      skills,
      mission: mission ? [mission] : [''],
      vision: vision ? [vision] : [''],
      interests,
      referralCode: user.isSuccess ? user.referralCode : '',
    });
  };

  useEffect(() => {
    userActions.fetchUserProfile();
  }, []);

  return (
    <Box className={classes.rootMain}>
      <Box>
        <RequireLoadable data={user}>
          {(user) => {
            return (
              <form className={classes.form}>
                <InputLabel className={classes.label} htmlFor="mission">
                  Mission
                </InputLabel>
                <TextField
                  className={classes.input}
                  required
                  multiline
                  rows={10}
                  id="mission"
                  value={mission || user.mission}
                  onChange={(e) => setMission(e.target.value)}
                  variant="outlined"
                />
                <InputLabel className={classes.label} htmlFor="vision">
                  Vision
                </InputLabel>
                <TextField
                  className={classes.input}
                  required
                  multiline
                  rows={5}
                  id="vision"
                  value={vision || user.vision}
                  onChange={(e) => setVision(e.target.value)}
                  variant="outlined"
                />
                <InputLabel className={classes.label} htmlFor="skills">
                  Skills
                </InputLabel>
                <ChipInput
                  className={classes.chipInput}
                  id="skills"
                  value={skills || user.skills}
                  variant="outlined"
                  onAdd={(chip) => addSkills(chip)}
                  onDelete={(_, index) => deleteSkill(index)}
                  blurBehavior="add"
                />
                <InputLabel className={classes.label} htmlFor="interests">
                  Interests
                </InputLabel>
                <ChipInput
                  className={classes.chipInput}
                  id="interests"
                  value={interests || user.interests}
                  variant="outlined"
                  onAdd={(chip) => addInterests(chip)}
                  onDelete={(_, index) => deleteInterests(index)}
                  blurBehavior="add"
                />
              </form>
            );
          }}
        </RequireLoadable>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={() => {
            save();
          }}
        >
          Save
        </Button>
      </Box>
      <Hidden only={['xs', 'sm']}>
        <Paper className={classes.paperRoot} elevation={0}>
          <CardMedia
            className={classes.media}
            image={userProfileLogo}
            title="Contemplative Reptile"
          />
        </Paper>
      </Hidden>
    </Box>
  );
};

export default Impact;
