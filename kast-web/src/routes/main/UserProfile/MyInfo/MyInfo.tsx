import React, {useEffect, useState} from 'react';
import {useSelector} from 'state/hooks';
import {RequireLoadable} from 'components';
import {useStyles} from 'routes/main/UserProfile/MyInfo/MyInfo.style';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ChipInput from 'material-ui-chip-input';
import InputLabel from '@material-ui/core/InputLabel';
import {useUserProfileActions} from 'state/hooks/UseActions';
import {useTranslation} from 'react-i18next';
import {generatePath} from 'react-router-dom';

const MyInfo = () => {
  const state = useSelector((state) => state.userProfile);
  const classes = useStyles();
  const {t} = useTranslation('files');
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
  const [userImage, setUserImage] = useState<File | undefined>(undefined);
  const [userImageName, setUserImageName] = useState<string | undefined>(undefined);
  const [userLogoImage, setUserLogoImage] = useState<File | undefined>(undefined);
  const [userLogoImageName, setUserLogoImageName] = useState<string | undefined>(
    undefined,
  );
  const [userBackgroundImage, setUserBackgroundImage] = useState<File | undefined>(
    undefined,
  );
  const [userBackgroundImageName, setUserBackgroundImageName] = useState<
    string | undefined
  >(undefined);

  const formatDate = (date: string) => {
    const correctDate = new Date(date);
    return correctDate;
  };

  const save = () => {
    actions.save({
      name,
      country,
      city,
      position,
      telephone,
      dateOfBirth: dateOfBirth ? formatDate(dateOfBirth) : undefined,
      tags,
      skills: state.isSuccess ? state.skills : [''],
      mission: state.isSuccess ? state.mission : [''],
      vision: state.isSuccess ? state.vision : [''],
      interests: state.isSuccess ? state.interests : [''],
      referralCode,
    });
  };
  // const addSkills = (skill: string) => {
  //   if (!state.isSuccess) return;
  //   setSkills([...(skills || state.skills), skill]);
  // };
  // const deleteSkill = (index: number) => {
  //   if (!state.isSuccess) return;
  //   const currentSkills: string[] = skills || state.skills;
  //   currentSkills.splice(index, 1);
  //   setSkills([...currentSkills]);
  // };

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

  const uploadUserImage = () => {
    // @ts-ignore
    if (userImage) {
      // @ts-ignore
      actions.uploadUserImage(userImageName, userImage);
    }
  };

  const uploadUserLogoImage = () => {
    // @ts-ignore
    if (userLogoImage) {
      // @ts-ignore
      actions.uploadUserLogoImage(userLogoImageName, userLogoImage);
    }
  };

  const uploadUserBackgroundImage = () => {
    // @ts-ignore
    if (userBackgroundImage) {
      // @ts-ignore
      actions.uploadUserBackgroundImage(userBackgroundImageName, userBackgroundImage);
    }
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
              <Box className={classes.avatarWrapper}>
                <Avatar
                  className={classes.avatarIcon}
                  alt={user.name}
                  src={user.avatarUrl}
                />
                <Box>
                  <Typography className={classes.userName} variant="h5" component="h2">
                    {user.name}
                  </Typography>
                  <label htmlFor="upload-photo">
                    <input
                      accept="image/*"
                      style={{display: 'none'}}
                      id="upload-photo"
                      name="upload-photo"
                      type="file"
                      onSubmit={() => {
                        uploadUserImage();
                      }}
                      onChange={(event) => {
                        // @ts-ignore
                        setUserImage(event.target.files[0]);
                        // @ts-ignore
                        setUserImageName(event.target.files[0].name);
                        if (event.target.files) {
                          actions.uploadUserImage(
                            event.target.files[0].name,
                            event.target.files[0],
                          );
                        }
                        actions.fetchUserProfile();
                      }}
                    />
                    <Button component="span">
                      <Typography className={classes.photoInputBtn}>
                        {t('changePhoto')}
                      </Typography>
                    </Button>
                  </label>
                </Box>
              </Box>
              <Box className={classes.inputsWrapper}>
                <Box className={classes.inputsSubwrapper}>
                  <InputLabel className={classes.label} htmlFor="username">
                    Username
                  </InputLabel>
                  <TextField
                    className={classes.input}
                    required
                    id="username"
                    value={name || user.name}
                    onChange={(e) => setName(e.target.value)}
                    variant="outlined"
                  />
                  <Box className={classes.inputsLocatedWrapper}>
                    <Box className={classes.locatedWrapper}>
                      <InputLabel className={classes.label} htmlFor="country">
                        Country
                      </InputLabel>
                      <TextField
                        className={classes.input}
                        required
                        id="country"
                        value={country || user.country}
                        onChange={(e) => setCountry(e.target.value)}
                        variant="outlined"
                      />
                    </Box>
                    <Box className={classes.locatedWrapper}>
                      <InputLabel className={classes.label} htmlFor="city">
                        City
                      </InputLabel>
                      <TextField
                        className={classes.input}
                        required
                        id="city"
                        value={city || user.city}
                        onChange={(e) => setCity(e.target.value)}
                        variant="outlined"
                      />
                    </Box>
                  </Box>
                  <InputLabel className={classes.label} htmlFor="dateOfBirth">
                    Date of birth
                  </InputLabel>
                  <TextField
                    className={classes.input}
                    required
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
                    required
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
                  <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      save();
                      if (userImage) {
                        uploadUserImage();
                      }
                    }}
                  >
                    Save
                  </Button>
                </Box>
                <Box className={classes.inputsSubwrapper1}>
                  <InputLabel className={classes.label} htmlFor="position">
                    Position
                  </InputLabel>
                  <TextField
                    className={classes.input}
                    required
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
                    required
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
                    value={tags || user.tags}
                    variant="outlined"
                    onAdd={(chip) => addTag(chip)}
                    onDelete={(_, index) => deleteTag(index)}
                    blurBehavior="add"
                  />
                  <div className={classes.mediaContainer}>
                    <Box className={classes.userMediaContainer}>
                      <CardMedia
                        className={classes.userMedia}
                        image={user.logoUrl}
                        title="User Logo"
                      />
                      <label htmlFor="upload-logo">
                        <input
                          accept="image/*"
                          style={{display: 'none'}}
                          id="upload-logo"
                          name="upload-logo"
                          type="file"
                          onSubmit={() => {
                            uploadUserLogoImage();
                          }}
                          onChange={(event) => {
                            // @ts-ignore
                            setUserLogoImage(event.target.files[0]);
                            // @ts-ignore
                            setUserLogoImageName(event.target.files[0].name);
                            if (event.target.files) {
                              actions.uploadUserLogoImage(
                                event.target.files[0].name,
                                event.target.files[0],
                              );
                            }
                            actions.fetchUserProfile();
                          }}
                        />
                        <Button component="span">
                          <Typography className={classes.photoInputBtn}>
                            Upload logo
                          </Typography>
                        </Button>
                      </label>
                    </Box>
                    <Box className={classes.userMediaContainer}>
                      <CardMedia
                        className={classes.userMedia}
                        image={user.backgroundUrl}
                        title="User Background"
                      />
                      <label htmlFor="upload-background">
                        <input
                          accept="image/*"
                          style={{display: 'none'}}
                          id="upload-background"
                          name="upload-background"
                          type="file"
                          onSubmit={() => {
                            uploadUserBackgroundImage();
                          }}
                          onChange={(event) => {
                            // @ts-ignore
                            setUserBackgroundImage(event.target.files[0]);
                            // @ts-ignore
                            setUserBackgroundImageName(event.target.files[0].name);
                            if (event.target.files) {
                              actions.uploadUserBackgroundImage(
                                event.target.files[0].name,
                                event.target.files[0],
                              );
                            }
                            actions.fetchUserProfile();
                          }}
                        />
                        <Button component="span">
                          <Typography className={classes.photoInputBtn}>
                            Upload background
                          </Typography>
                        </Button>
                      </label>
                    </Box>
                  </div>
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
