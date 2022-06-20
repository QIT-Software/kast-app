import React, {useEffect, useState} from 'react';
import {useSelector} from 'state/hooks';
import {RequireLoadable} from 'components';
import {useStyles} from './MyInfo.style';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import ChipInput from 'material-ui-chip-input';
import InputLabel from '@material-ui/core/InputLabel';
import {useUserProfileActions} from 'state/hooks/UseActions';
import {generatePath} from 'react-router-dom';

const MyInfo = () => {
  const state = useSelector((state) => state.userProfile);
  const classes = useStyles();
  const actions = useUserProfileActions();
  useEffect(() => {
    actions.fetchUserProfile();
  }, []);

  const [name, setName] = useState<string>();
  const [country, setCountry] = useState<string>();
  const [city, setCity] = useState<string>();
  const [position, setPosition] = useState<string>();
  const [telephone, setTelephone] = useState<string>();
  const [dateOfBirth, setDateOfBirth] = useState<string | null>();
  const [tags, setTags] = useState<string[]>();
  // const [skills, setSkills] = useState<string[]>();
  const [referralCode, setReferralCode] = useState<string>();

  const addTag = (tag: string) => {
    if (!state.isSuccess) return;
    setTags([...(tags || state.tags), tag]);
  };

  const deleteTag = (index: number) => {
    if (!state.isSuccess) return;
    const currentTags: string[] = tags || state.tags;
    currentTags.splice(index, 1);
    setTags([...currentTags]);
  };

  return (
    <Box className={classes.root}>
      <RequireLoadable data={state}>
        {(user) => {
          const {location} = window;
          const referralInvitationPath = `${location.protocol}//${
            location.host
          }${generatePath('/signup?referralCode=:referralCode', {
            referralCode: user.referralCode || 'referral',
          })}`;
          return (
            <form className={classes.form}>
              <Box className={classes.inputsWrapper}>
                <Box className={classes.inputsSubwrapper}>
                  <InputLabel className={classes.label} htmlFor="username">
                    Username
                  </InputLabel>
                  <TextField
                    className={classes.input}
                    disabled
                    id="username"
                    value={name || user.name}
                    onChange={(e) => setName(e.target.value)}
                    variant="outlined"
                  />
                  <Box className={classes.inputsSubwrapper}>
                    <InputLabel className={classes.label} htmlFor="country">
                      Country
                    </InputLabel>
                    <TextField
                      className={classes.input}
                      disabled
                      id="country"
                      value={country || user.country}
                      onChange={(e) => setCountry(e.target.value)}
                      variant="outlined"
                    />
                  </Box>
                  <Box className={classes.inputsSubwrapper}>
                    <InputLabel className={classes.label} htmlFor="city">
                      City
                    </InputLabel>
                    <TextField
                      className={classes.input}
                      disabled
                      id="city"
                      value={city || user.city}
                      onChange={(e) => setCity(e.target.value)}
                      variant="outlined"
                    />
                  </Box>

                  <InputLabel className={classes.label} htmlFor="dateOfBirth">
                    Date of birth
                  </InputLabel>
                  <TextField
                    className={classes.input}
                    disabled
                    type="date"
                    id="dateOfBirth"
                    inputProps={{min: '1900-01-24', max: '2017-05-31'}}
                    value={dateOfBirth || user.dateOfBirth}
                    onChange={(e) => {
                      setDateOfBirth(e.target.value);
                    }}
                    variant="outlined"
                  />
                  <TextField
                    className={classes.input}
                    disabled
                    id="referralCode"
                    value={referralCode || user.referralCode}
                    onChange={(e) => setReferralCode(e.target.value)}
                    variant="outlined"
                  />
                  <TextField
                    className={classes.input}
                    label="Referral code link"
                    variant="filled"
                    value={referralInvitationPath}
                  />
                  <InputLabel className={classes.label} htmlFor="position">
                    Position
                  </InputLabel>
                  <TextField
                    className={classes.input}
                    disabled
                    id="position"
                    value={position || user.position}
                    onChange={(e) => setPosition(e.target.value)}
                    variant="outlined"
                  />
                  <InputLabel className={classes.label} htmlFor="telephone">
                    Telephone
                  </InputLabel>
                  <TextField
                    className={classes.input}
                    disabled
                    id="telephone"
                    value={telephone || user.telephone}
                    onChange={(e) => setTelephone(e.target.value)}
                    variant="outlined"
                  />
                  <InputLabel className={classes.label} htmlFor="tags">
                    Tags
                  </InputLabel>
                  <ChipInput
                    className={classes.input}
                    id="tags"
                    disabled
                    value={tags || user.tags}
                    variant="outlined"
                    onAdd={(chip) => addTag(chip)}
                    onDelete={(_, index) => deleteTag(index)}
                    blurBehavior="add"
                  />
                </Box>
              </Box>
            </form>
          );
        }}
      </RequireLoadable>
    </Box>
  );
};

export default MyInfo;
