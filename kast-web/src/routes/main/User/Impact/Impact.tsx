import React, {useEffect, useState} from 'react';
import {useSelector} from 'state/hooks';
import {useStyles} from './Impact.style';
import Box from '@material-ui/core/Box';
import {useUserProfileActions} from 'state/hooks/UseActions';
import ChipInput from 'material-ui-chip-input';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import {RequireLoadable} from 'components';

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

  const addInterests = (interests: string) => {
    if (!user.isSuccess) return;
    setInterests([...(interests || user.interests), interests]);
  };

  const deleteInterests = (index: number) => {
    if (!user.isSuccess) return;
    const currentInterests: string[] = interests || user.interests;
    currentInterests.splice(index, 1);
    setInterests([...currentInterests]);
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
                  disabled
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
                  disabled
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
                  disabled
                  onAdd={(chip) => addSkills(chip)}
                  onDelete={(_, index) => deleteSkill(index)}
                  blurBehavior="add"
                />
                <InputLabel className={classes.label} htmlFor="interests">
                  Interests
                </InputLabel>
                <ChipInput
                  className={classes.chipInput}
                  disabled
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
      </Box>
    </Box>
  );
};

export default Impact;
