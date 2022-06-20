/* eslint-disable array-callback-return,no-console, */
import React, {useEffect, useMemo, useState} from 'react';
import {useStyles} from 'routes/main/Room/RoomStream/Meeting/Meeting.styles';
import Box from '@material-ui/core/Box';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  MenuItem,
  Select,
} from '@material-ui/core';
import gridVMNotActive from 'routes/main/Room/assets/view-mode/grid-not-active.svg';
import gridVMActive from 'routes/main/Room/assets/view-mode/grid-active.svg';
import cameraVMActive from 'routes/main/Room/assets/view-mode/camera-active.svg';
import cameraVMNotActive from 'routes/main/Room/assets/view-mode/camera-not-active.svg';
import screenShareVMActive from 'routes/main/Room/assets/view-mode/screen-vw-active.svg';
import screenShareVMNotActive from 'routes/main/Room/assets/view-mode/screen-share-not-active.svg';
import screenshare from 'routes/main/Room/assets/devise/screenshare.svg';
import screenShareoff from 'routes/main/Room/assets/devise/screenshareoff.svg';
import cameraon from 'routes/main/Room/assets/devise/cameraon.svg';
import cameraoff from 'routes/main/Room/assets/devise/cameraoff.svg';
import audioon from 'routes/main/Room/assets/devise/audioon.svg';
import audiooff from 'routes/main/Room/assets/devise/audiooff.svg';
import invite from 'routes/main/Room/assets/others/invite.svg';
import startRecordImg from 'routes/main/Room/assets/others/start-record.svg';
import stopRecordImg from 'routes/main/Room/assets/others/stop-record.svg';
import copyToClipboard from 'routes/main/Room/assets/others/copy_to_clipboard.svg';
import Video from 'routes/main/Room/RoomStream/Meeting/Video';
import Audio from 'routes/main/Room/RoomStream/Meeting/Audio';
import {MediasoupService, SubscriptionService} from 'services';
import Typography from '@material-ui/core/Typography';
import {useTranslation} from 'react-i18next';
import {
  useMediasoupActions,
  useParticipantsActions,
  useRoomActions,
  useUserProfileActions,
} from 'state/hooks/UseActions';
import {useSelector} from 'state/hooks';
import {
  MediaTrack,
  MediaType,
  PlayingType,
  Quality,
  RenderMediaTrack,
} from 'entities/Mediasoup';
import CopyToClipboard from 'react-copy-to-clipboard';
import {getInviteLinkAdress} from 'utils/HttpAdress';
import {RoomType} from 'entities/Room';
import Timer from 'routes/main/Room/RoomStream/Timer';
import {ViewModeEnum} from 'state/ducks/mediasoup/actions';
import cross from 'routes/main/Dashboard/assets/cross.svg';
import raiseHandSvg from 'routes/main/Room/assets/others/raise-hand.svg';
import {AvikastApi as Api} from 'api';
import Participant from 'entities/Participant';
import CardMedia from '@material-ui/core/CardMedia';
import {RequireLoadable} from 'components';

interface CameraGridProps {
  roomId: string;
  type: RoomType;
  sessionUserId: string;
  sessionUserName: string;
  roomUserId: string;
  inviteLink: string;
  closed: undefined | null | Date;
}

const ua = navigator.userAgent;
const isMobile = /Android|webOS|iPhone|iPad|iPod/i.test(ua);

const Meeting: React.FC<CameraGridProps> = ({
  roomId,
  type,
  sessionUserId,
  sessionUserName,
  roomUserId,
  inviteLink,
  closed,
}) => {
  // useGuard({requireRoomCheck: true});
  const [renderWebinarControlElements, setRenderWebinarControlElements] = useState(false);
  const [renderMeetingControlElements, setRenderMeetingControlElements] = useState(false);
  const state = useSelector((state) => state.mediasoup);
  const particpantsState = useSelector((state) => state.participants);
  const {t} = useTranslation('room');
  const classes = useStyles();
  const [viewMode, setViewMode] = useState<ViewModeEnum>(ViewModeEnum.EqualScreen);
  const [allTracks, setAllTracks] = useState<RenderMediaTrack[]>([]);
  const [audioTracks, setAudioTracks] = useState<RenderMediaTrack[]>([]);
  const [primaryTrack, setPrimaryTrack] = useState<RenderMediaTrack | undefined>(
    undefined,
  );
  const [primaryUserName, setPrimaryUserName] = useState<string>('');
  const [inviteDialog, setInviteDialogOpen] = useState<boolean>(false);
  const [uploadDialog, setUploadDialogOpen] = useState<boolean>(false);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const raiseHand = useSelector((state) => state.participants.handRaised);
  const user = useSelector((state) => state.userProfile);
  const room = useSelector((state) => state.room);
  const [displayQuality, setDisplayQuality] = useState<Quality>(Quality.Low);
  const [raiseHandHook, setRaiseHandHook] = useState<boolean>(raiseHand);
  const mediasoupActions = useMediasoupActions();
  const participantsActions = useParticipantsActions();
  const roomActions = useRoomActions();
  const roomOwnerId = particpantsState.roomUserId;
  const actions = useUserProfileActions();

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

  // const rooms = roomActions.getUserRooms();
  console.log('RERENDER USEFECT global');
  useEffect(() => {
    const newTrack = MediasoupService.getMediaForRenderNewSubject().subscribe(
      (mediaTracks: RenderMediaTrack[]) => {
        console.log(mediaTracks, 'Mediat racks');
        const audioArr: RenderMediaTrack[] = [];
        const cameraArr: RenderMediaTrack[] = [];
        const screenArr: RenderMediaTrack[] = [];
        // eslint-disable-next-line no-restricted-syntax
        for (const track of mediaTracks) {
          if (track.enabled) {
            if (track.playingType === PlayingType.Audio) {
              audioArr.push(track);
            }
            if (track.playingType === PlayingType.Video) {
              cameraArr.push(track);
            }
            if (track.playingType === PlayingType.Screen) {
              screenArr.push(track);
            }
          }
        }
        const allTracksArr = [...cameraArr, ...screenArr];
        console.log(allTracksArr);
        setAllTracks([...allTracksArr]);
        setAudioTracks([...audioArr]);
      },
    );
    return () => {
      newTrack.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const room = Api.getRoomById(roomId).then((room) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      console.log('RERENDER USEFECT');
      MediasoupService.pushParticipantTracks(room).then();
      participantsActions.fetchParticipants(room, sessionUserId);
      const myParticipant: Participant | undefined = room.participants.find((el) => {
        return el.user.id === sessionUserId;
      });
      mediasoupActions.initialize(
        roomId,
        type,
        sessionUserId,
        roomUserId,
        myParticipant?.media.audio.enabled || false,
        myParticipant?.media.video.enabled || false,
        myParticipant?.media.screen.enabled || false,
      );
      if (myParticipant) participantsActions.checkMyParticipant(myParticipant);
    });
    console.log(room);

    SubscriptionService.subscribeToRoom(roomId, sessionUserId);

    setIsStarted(true);
    setRaiseHandHook(raiseHand);
    if (roomOwnerId === sessionUserId && type === RoomType.Meeting) {
      participantsActions.setRoomOwner(roomUserId === sessionUserId);
      setRenderMeetingControlElements(roomUserId === sessionUserId);
    }
    if (roomOwnerId === sessionUserId && type === RoomType.Webinar) {
      participantsActions.setRoomOwner(roomUserId === sessionUserId);
      setRenderWebinarControlElements(roomUserId === sessionUserId);
    }
    if (closed) {
      roomActions.leaveRoom(roomId);
    }
  }, []);

  const InviteLinkDialog: React.FC = () => {
    return (
      <Dialog
        aria-labelledby="simple-dialog-title"
        open={inviteDialog}
        onClose={() => {
          setInviteDialogOpen(false);
        }}
        fullWidth
        maxWidth="xs"
      >
        <Box px={2} py={3} style={{height: '75%'}}>
          <Box style={{display: 'flex', justifyContent: 'space-between'}}>
            <DialogTitle id="customized-dialog-title">{t('invitationLink')}</DialogTitle>
            <IconButton
              style={{width: 20, height: 20, padding: 25}}
              onClick={() => {
                setInviteDialogOpen(false);
              }}
            >
              <img src={cross} alt="" style={{width: 20, height: 20}} />
            </IconButton>
          </Box>
          <DialogContent>
            <Box>
              <Box mb={1}>
                <Typography variant="h6" component="h4" align="left">
                  {t('copyToClipboard')}
                </Typography>
              </Box>
              <Box>
                <CopyToClipboard text={getInviteLinkAdress(inviteLink)}>
                  <Box
                    border={1}
                    borderColor="primary"
                    borderRadius={5}
                    justifyContent="space-between"
                    alignItems="center"
                    display="flex"
                    px={2}
                  >
                    <Typography color="textPrimary" variant="subtitle1" align="left">
                      {inviteLink || 'avikast.com'}
                    </Typography>
                    <IconButton>
                      <img src={copyToClipboard} alt="" />
                    </IconButton>
                  </Box>
                </CopyToClipboard>
              </Box>
              <Box mt={2}>
                <Button
                  type="submit"
                  variant="contained"
                  style={{height: 45}}
                  fullWidth
                  onClick={() => {
                    setInviteDialogOpen(false);
                  }}
                >
                  {t('ok')}
                </Button>
              </Box>
            </Box>
          </DialogContent>
        </Box>
      </Dialog>
    );
  };

  const UploadLinkDialog: React.FC = () => {
    return (
      <Dialog
        aria-labelledby="simple-dialog-title"
        open={uploadDialog}
        onClose={() => {
          setUploadDialogOpen(false);
        }}
        fullWidth
        maxWidth="xs"
      >
        <Box px={2} py={3} style={{height: '75%'}}>
          <Box style={{display: 'flex', justifyContent: 'space-between'}}>
            <DialogTitle id="customized-dialog-title">Change Logo/Background</DialogTitle>
            <IconButton
              style={{width: 20, height: 20, padding: 25}}
              onClick={() => {
                setUploadDialogOpen(false);
              }}
            >
              <img src={cross} alt="" style={{width: 20, height: 20}} />
            </IconButton>
          </Box>
          <DialogContent>
            <Box>
              <RequireLoadable data={user}>
                {(user) => {
                  return (
                    <>
                      <Box className={classes.userMediaContainer}>
                        <CardMedia
                          className={classes.userMediaInPopUp}
                          image={user.logoUrl}
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
                          className={classes.userMediaInPopUp}
                          image={user.backgroundUrl}
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
                    </>
                  );
                }}
              </RequireLoadable>

              <Box mt={2}>
                <Button
                  type="submit"
                  variant="contained"
                  style={{height: 45}}
                  fullWidth
                  onClick={() => {
                    setInviteDialogOpen(false);
                  }}
                >
                  {t('ok')}
                </Button>
              </Box>
            </Box>
          </DialogContent>
        </Box>
      </Dialog>
    );
  };

  const renderRaiseHand = () => {
    return (
      <Box className={classes.socialManageContainer}>
        <div className={classes.deviceButtonWraper}>
          <IconButton
            color="primary"
            aria-label="invite"
            style={{marginTop: 5}}
            className={classes.deviceButton}
            onClick={() => {
              setRaiseHandHook(!raiseHandHook);
              participantsActions.raiseHand(roomId, !raiseHandHook);
            }}
          >
            <div>
              <img
                src={raiseHandSvg}
                alt="raise hand"
                style={{height: 27, width: 27, margin: 'auto'}}
              />
              <Typography
                color="primary"
                variant="subtitle2"
                align="center"
                style={{marginTop: 5}}
              >
                Ask
              </Typography>
            </div>
          </IconButton>
        </div>
      </Box>
    );
  };
  const renderCameraBtn = () => {
    if (state.cameraLoading) {
      return (
        <>
          <Box className={classes.deviceSpinner}>
            <CircularProgress style={{height: 27, width: 27, margin: 'auto'}} />
          </Box>
        </>
      );
    }
    if (state.cameraPlay) {
      return (
        <>
          <IconButton
            disabled={state.cameraLoading}
            color="primary"
            aria-label="camera"
            onClick={() => {
              if (!isStarted) {
                setIsStarted(!isStarted);
              }
              mediasoupActions.playPauseCamera(roomId);
            }}
            className={classes.deviceButton}
          >
            <div>
              <img
                src={cameraon}
                alt=""
                style={{height: 27, width: 27, margin: 'auto'}}
              />
              <Typography
                color="primary"
                variant="subtitle2"
                align="center"
                style={{marginTop: 5}}
              >
                {t('camera')}
              </Typography>
            </div>
          </IconButton>
        </>
      );
    }
    if (!state.cameraPlay) {
      return (
        <>
          <IconButton
            disabled={state.cameraLoading}
            color="primary"
            aria-label="camera"
            onClick={() => {
              if (!isStarted) {
                setIsStarted(!isStarted);
              }
              mediasoupActions.playPauseCamera(roomId);
            }}
            className={classes.deviceButton}
          >
            <div>
              <img
                src={cameraoff}
                alt=""
                style={{height: 27, width: 27, margin: 'auto'}}
              />
              <Typography
                color="primary"
                variant="subtitle2"
                align="center"
                style={{marginTop: 5}}
              >
                {t('camera')}
              </Typography>
            </div>
          </IconButton>
        </>
      );
    }

    return <span>{t('camera')}</span>;
  };

  const renderScreenBtn = () => {
    if (state.screenLoading) {
      return (
        <>
          <Box className={classes.deviceSpinner}>
            <CircularProgress style={{height: 30, width: 30, margin: 'auto'}} />
          </Box>
        </>
      );
    }
    if (!state.screenPlay) {
      return (
        <>
          <IconButton
            disabled={state.screenLoading}
            color="primary"
            aria-label="camera"
            onClick={() => {
              if (!isStarted) {
                setIsStarted(!isStarted);
              }
              mediasoupActions.playPauseScreen(roomId, displayQuality);
            }}
            className={classes.deviceButton}
          >
            <div>
              <img
                src={screenShareoff}
                alt=""
                style={{height: 27, width: 27, margin: 'auto'}}
              />
              <Typography
                color="primary"
                variant="subtitle2"
                align="center"
                style={{marginTop: 5}}
              >
                {t('screen')}
              </Typography>
            </div>
          </IconButton>
        </>
      );
    }
    if (state.screenPlay) {
      return (
        <>
          <IconButton
            disabled={state.screenLoading}
            color="primary"
            aria-label="screen"
            onClick={() => {
              if (!isStarted) {
                setIsStarted(!isStarted);
              }
              mediasoupActions.playPauseScreen(roomId, displayQuality);
            }}
            className={classes.deviceButton}
          >
            <div>
              <img
                src={screenshare}
                alt=""
                style={{height: 27, width: 27, margin: 'auto'}}
              />
              <Typography
                color="primary"
                variant="subtitle2"
                align="center"
                style={{marginTop: 5}}
              >
                {t('screen')}
              </Typography>
            </div>
          </IconButton>
        </>
      );
    }

    return <span>{t('screen')}</span>;
  };
  const renderAudioBtn = () => {
    if (state.audioLoading) {
      return (
        <>
          <Box className={classes.deviceSpinner}>
            <CircularProgress style={{height: 27, width: 27, margin: 'auto'}} />
          </Box>
        </>
      );
    }
    if (state.audioPlay) {
      return (
        <>
          <IconButton
            disabled={state.audioLoading}
            color="primary"
            aria-label="camera"
            onClick={() => {
              if (!isStarted) {
                setIsStarted(!isStarted);
              }
              mediasoupActions.playPauseAudio(roomId);
            }}
            className={classes.deviceButton}
          >
            <div>
              <img src={audioon} alt="" style={{height: 27, width: 27, margin: 'auto'}} />
              <Typography
                color="primary"
                variant="subtitle2"
                align="center"
                style={{marginTop: 5}}
              >
                {t('audio')}
              </Typography>
            </div>
          </IconButton>
        </>
      );
    }
    if (!state.audioPlay) {
      return (
        <>
          <IconButton
            disabled={state.audioLoading}
            color="primary"
            aria-label="audio"
            onClick={() => {
              if (!isStarted) {
                setIsStarted(!isStarted);
              }
              mediasoupActions.playPauseAudio(roomId);
            }}
            className={classes.deviceButton}
          >
            <div>
              <img
                src={audiooff}
                alt=""
                style={{height: 27, width: 27, margin: 'auto'}}
              />
              <Typography
                color="primary"
                variant="subtitle2"
                align="center"
                style={{marginTop: 5}}
              >
                {t('audio')}
              </Typography>
            </div>
          </IconButton>
        </>
      );
    }

    return <span>{t('camera')}</span>;
  };
  // @ts-ignore
  const renderGridVwBtn = () => {
    if (viewMode !== ViewModeEnum.EqualScreen) {
      return (
        <Box className={classes.deviceGridButtonWraper} style={{marginLeft: 0}}>
          <IconButton
            color="primary"
            aria-label="camera"
            onClick={() => {
              setViewMode(ViewModeEnum.EqualScreen);
            }}
            className={classes.deviceButton}
          >
            <div>
              <img
                src={gridVMNotActive}
                alt=""
                style={{height: 25, width: 40, margin: 'auto'}}
              />
              <Typography
                color="primary"
                variant="subtitle2"
                align="center"
                style={{marginTop: 5}}
              >
                {t('grid')}
              </Typography>
            </div>
          </IconButton>
        </Box>
      );
    }
    // @ts-ignore
    if (viewMode === ViewModeEnum.EqualScreen) {
      return (
        <Box className={classes.deviceButtonWraper} style={{marginLeft: 0}}>
          <IconButton color="primary" aria-label="audio" className={classes.deviceButton}>
            <div>
              <img
                src={gridVMActive}
                alt=""
                style={{height: 25, width: 40, margin: 'auto'}}
              />
              <Typography
                color="primary"
                variant="subtitle2"
                align="center"
                style={{marginTop: 5}}
              >
                {t('grid')}
              </Typography>
            </div>
          </IconButton>
        </Box>
      );
    }
  };
  // @ts-ignore
  const renderCameraVwBtn = () => {
    if (viewMode !== ViewModeEnum.CameraMain) {
      return (
        <Box className={classes.deviceButtonWraper}>
          <IconButton
            color="primary"
            aria-label="camera"
            onClick={() => {
              setViewMode(ViewModeEnum.CameraMain);
              setPrimaryTrack(
                allTracks.find((track: MediaTrack) => {
                  return track.track.kind === MediaType.UserMedia;
                }),
              );
            }}
            className={classes.deviceButton}
          >
            <div>
              <img
                src={cameraVMNotActive}
                alt="cameraActive.png"
                style={{height: 25, width: 40, margin: 'auto'}}
              />
              <Typography
                color="primary"
                variant="subtitle2"
                align="center"
                style={{marginTop: 5}}
              >
                {t('camera')}
              </Typography>
            </div>
          </IconButton>
        </Box>
      );
    }
    if (viewMode === ViewModeEnum.CameraMain) {
      return (
        <Box className={classes.deviceButtonWraper}>
          <IconButton color="primary" aria-label="audio" className={classes.deviceButton}>
            <div>
              <img
                src={cameraVMActive}
                alt=""
                style={{height: 25, width: 40, margin: 'auto'}}
              />
              <Typography
                color="primary"
                variant="subtitle2"
                align="center"
                style={{marginTop: 5}}
              >
                {t('camera')}
              </Typography>
            </div>
          </IconButton>
        </Box>
      );
    }
  };
  // @ts-ignore
  const renderScreenVwBtn = () => {
    // @ts-ignore
    if (viewMode !== ViewModeEnum.ScreenMain) {
      return (
        <Box className={classes.deviceButtonWraper}>
          <IconButton
            color="primary"
            aria-label="audio"
            onClick={() => {
              const track = allTracks.find((track: MediaTrack) => {
                return track.type === MediaType.ScreenShare;
              });
              setPrimaryTrack(track);
              setViewMode(ViewModeEnum.ScreenMain);
            }}
            className={classes.deviceButton}
          >
            <div>
              <img
                src={screenShareVMNotActive}
                alt=""
                style={{height: 25, width: 40, margin: 'auto'}}
              />
              <Typography
                color="primary"
                variant="subtitle2"
                align="center"
                style={{marginTop: 5}}
              >
                {t('screenShare')}
              </Typography>
            </div>
          </IconButton>
        </Box>
      );
    }
    // @ts-ignore
    if (viewMode === ViewModeEnum.ScreenMain) {
      return (
        <Box className={classes.deviceButtonWraper}>
          <IconButton
            color="primary"
            aria-label="camera"
            className={classes.deviceButton}
          >
            <div>
              <img
                src={screenShareVMActive}
                alt=""
                style={{height: 25, width: 40, margin: 'auto'}}
              />
              <Typography
                color="primary"
                variant="subtitle2"
                align="center"
                style={{marginTop: 5}}
              >
                {t('screen')}
              </Typography>
            </div>
          </IconButton>
        </Box>
      );
    }

    return <span>{t('screen')}</span>;
  };
  // screens
  const equalScreen = () => {
    return (
      <div className={classes.gridContainer}>
        {allTracks.map((element: RenderMediaTrack) => {
          const findAudioTrack = audioTracks.find((audio) => {
            return element.userName === audio.userName;
          });
          if (element.enabled) {
            return (
              <div
                className={classes.gridElement}
                key={element.userName + element.kind.toString() + element.type.toString()}
              >
                <Video
                  trackOptions={{
                    muted: false,
                    source: element.type,
                    ownUserId: sessionUserId,
                    ownerUserId: particpantsState.roomUserId,
                    renderUserName: element.userName,
                    renderUserId: element.userId,
                    roomId,
                    producerId: element.producerId,
                    audioProducerId: findAudioTrack
                      ? findAudioTrack.producerId
                      : undefined,
                    roomType: type,
                  }}
                  srcObject={new MediaStream([element.track])}
                  type="grid"
                />
              </div>
            );
          }

          return <div />;
        })}
      </div>
    );
  };
  const largeScreen = () => {
    const tracksForRender: RenderMediaTrack[] = []; // TODO remove allTracks.map
    // eslint-disable-next-line array-callback-return
    allTracks.map((element) => {
      if (element.type === MediaType.ScreenShare) {
        tracksForRender.push(element);
      }
    });
    const findAudioTrack = audioTracks.find((audio) => {
      return primaryTrack?.userName === audio.userName;
    });
    if (tracksForRender.length === 0) return;

    return (
      <Box className={classes.largeScreenContainer}>
        {type === RoomType.Meeting && (
          <FormControl className={classes.formControl} variant="outlined">
            <Box className={classes.selectInput}>
              <Select
                className={classes.selectSubInput}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={primaryUserName || tracksForRender[0].userName}
                onChange={(event: any) => {
                  const name = event.target.value as string;
                  tracksForRender.forEach((elemet) => {
                    if (elemet.userName === name) {
                      setPrimaryTrack(elemet);
                      setPrimaryUserName(name);
                    }
                  });
                  setPrimaryUserName(name);
                }}
              >
                {tracksForRender.map((element) => (
                  <MenuItem value={element.userName}>{element.userName}</MenuItem>
                ))}
              </Select>
            </Box>
          </FormControl>
        )}
        <Box className={classes.largeScreenMedia}>
          <Video
            trackOptions={{
              muted: false,
              source: primaryTrack?.type || tracksForRender[0].type,
              ownUserId: sessionUserId,
              ownerUserId: particpantsState.roomUserId,
              renderUserName: primaryTrack?.userName || tracksForRender[0].userName,
              renderUserId: primaryTrack?.userId || tracksForRender[0].userId,
              roomId,
              producerId: primaryTrack?.producerId || tracksForRender[0].producerId,
              audioProducerId: findAudioTrack ? findAudioTrack.producerId : undefined,
              roomType: type,
            }}
            srcObject={new MediaStream([primaryTrack?.track || tracksForRender[0].track])}
            type="single"
          />
        </Box>
      </Box>
    );
  };
  const largeCamera = () => {
    const tracksForRender: RenderMediaTrack[] = [];
    // eslint-disable-next-line array-callback-return
    allTracks.map((element) => {
      if (element.type === MediaType.UserMedia) {
        tracksForRender.push(element);
      }
    });
    const findAudioTrack = audioTracks.find((audio) => {
      return primaryTrack?.userName === audio.userName;
    });
    if (tracksForRender.length === 0) return;
    return (
      <Box className={classes.largeScreenContainer}>
        {type === RoomType.Meeting && (
          <FormControl className={classes.formControl} variant="outlined">
            <Box className={classes.selectInput}>
              <Select
                className={classes.selectSubInput}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={primaryUserName || tracksForRender[0].userName}
                onChange={(event: any) => {
                  const name = event.target.value as string;
                  tracksForRender.forEach((elemet) => {
                    if (elemet.userName === name) {
                      setPrimaryTrack(elemet);
                      setPrimaryUserName(name);
                    }
                  });
                  setPrimaryUserName(name);
                }}
              >
                {tracksForRender.map((element) => (
                  <MenuItem value={element.userName}>{element.userName}</MenuItem>
                ))}
              </Select>
            </Box>
          </FormControl>
        )}
        <Box className={classes.largeScreenMedia}>
          <Video
            trackOptions={{
              muted: primaryTrack?.muted || tracksForRender[0].muted,
              source: primaryTrack?.type || tracksForRender[0].type,
              ownUserId: sessionUserId,
              ownerUserId: particpantsState.roomUserId,

              renderUserName: primaryTrack?.userName || tracksForRender[0].userName,
              renderUserId: primaryTrack?.userId || tracksForRender[0].userId,
              roomId,
              producerId: primaryTrack?.producerId || tracksForRender[0].producerId,
              audioProducerId: findAudioTrack ? findAudioTrack.producerId : undefined,
              roomType: type,
            }}
            srcObject={new MediaStream([primaryTrack?.track || tracksForRender[0].track])}
            type="single"
          />
        </Box>
      </Box>
    );
  };
  const NewEqual: React.FC = () => {
    return useMemo(() => equalScreen(), allTracks);
  };
  return (
    <>
      <Box className={classes.roomRoot}>
        <Box className={classes.topContainer}>
          <Box className={classes.logoContainer}>
            <RequireLoadable data={room}>
              {(room) => {
                return (
                  <CardMedia
                    className={classes.media}
                    image={room.data.user.logoUrl}
                    title="Contemplative Reptile"
                  />
                );
              }}
            </RequireLoadable>
          </Box>
          <Box>
            <Button
              style={
                displayQuality === Quality.Low
                  ? {backgroundColor: '#C82FC6', color: '#FFF'}
                  : {backgroundColor: 'transparent'}
              }
              onClick={() => {
                setDisplayQuality(Quality.Low);
                mediasoupActions.changeQuality(
                  roomId,
                  Quality.Low,
                  state.cameraPlay,
                  state.screenPlay,
                );
              }}
            >
              Low quality
            </Button>
            <Button
              className={classes.qualityBtn}
              style={
                displayQuality === Quality.High
                  ? {backgroundColor: '#C82FC6', color: '#FFF'}
                  : {backgroundColor: 'transparent'}
              }
              onClick={() => {
                console.log('change quality to high', displayQuality);
                setDisplayQuality(Quality.High);
                mediasoupActions.changeQuality(
                  roomId,
                  Quality.High,
                  state.cameraPlay,
                  state.screenPlay,
                );
              }}
            >
              High quality
            </Button>
          </Box>
        </Box>
        <RequireLoadable data={room}>
          {(room) => {
            return (
              // <img src={room.data.user.backgroundUrl} alt=""/>
              // <CardMedia
              //   className={classes.userMedia}
              //   image={room.data.user.backgroundUrl}
              //   title="User Background"
              // >
              <Box className={classes.userMedia}>
                <img
                  src={room.data.user.backgroundUrl}
                  className={classes.userBg}
                  alt=""
                />
                <Box className={classes.camerasContainer}>
                  {viewMode === ViewModeEnum.EqualScreen && <NewEqual />}
                  {viewMode === ViewModeEnum.CameraMain && largeCamera()}
                  {viewMode === ViewModeEnum.ScreenMain && largeScreen()}
                  {audioTracks.map((element) => {
                    if (
                      element.userName !== sessionUserName &&
                      !renderWebinarControlElements
                    ) {
                      return <Audio srcObject={new MediaStream([element.track])} />;
                    }
                    return null;
                  })}
                </Box>
              </Box>
            );
          }}
        </RequireLoadable>
        <Box className={classes.controlPanel}>
          {(type === RoomType.Meeting || renderWebinarControlElements) && (
            <Box className={classes.devicesContainer}>
              <div className={classes.deviceButtonWraper} style={{marginLeft: 0}}>
                {renderAudioBtn()}
              </div>
              <div className={classes.deviceButtonWraper}>{renderCameraBtn()}</div>
              {!isMobile && (
                <div className={classes.deviceButtonWraper}>{renderScreenBtn()}</div>
              )}
              {(renderMeetingControlElements || renderWebinarControlElements) && (
                <div className={classes.deviceButtonWraper}>
                  <IconButton
                    disabled={state.screenLoading}
                    color="primary"
                    aria-label="startRecord"
                    onClick={() => {
                      if (!isRecording) {
                        setIsRecording(!isRecording);
                        mediasoupActions.startRecording(
                          roomId,
                          allTracks[0] ? allTracks[0].producerId : undefined,
                          audioTracks[0] ? audioTracks[0].producerId : undefined,
                        );
                      }
                      if (isRecording) {
                        setIsRecording(!isRecording);
                        mediasoupActions.stopRecording(roomId);
                      }
                    }}
                    className={classes.deviceButton}
                  >
                    <div>
                      {!isRecording ? (
                        <img
                          src={startRecordImg}
                          alt="start recording"
                          style={{height: 27, width: 27, margin: 'auto'}}
                        />
                      ) : (
                        <img
                          src={stopRecordImg}
                          style={{height: 27, width: 27, margin: 'auto'}}
                          alt=""
                        />
                      )}
                      <Typography
                        color="primary"
                        variant="subtitle2"
                        align="center"
                        style={{marginTop: 5}}
                      >
                        {!isRecording ? t('record') : t('stop')}
                      </Typography>
                    </div>
                  </IconButton>
                </div>
              )}
            </Box>
          )}
          <Box className={classes.socialManageContainer}>
            {renderRaiseHand()}
            <div className={classes.deviceButtonWraper}>
              <IconButton
                color="primary"
                aria-label="invite"
                style={{marginTop: 5}}
                className={classes.deviceButton}
                onClick={() => {
                  setInviteDialogOpen(true);
                }}
              >
                <div>
                  <img
                    src={invite}
                    alt="invite"
                    style={{height: 27, width: 27, margin: 'auto'}}
                  />
                  <Typography
                    color="primary"
                    variant="subtitle2"
                    align="center"
                    style={{marginTop: 5}}
                  >
                    {t('invite')}
                  </Typography>
                </div>
              </IconButton>
            </div>
            <div className={classes.deviceButtonWraper}>
              <IconButton
                color="primary"
                aria-label="upload"
                style={{marginTop: 5}}
                className={classes.deviceButton}
                onClick={() => {
                  setUploadDialogOpen(true);
                }}
              >
                <div>
                  <img
                    src={invite}
                    alt="invite"
                    style={{height: 27, width: 27, margin: 'auto'}}
                  />
                  <Typography
                    color="primary"
                    variant="subtitle2"
                    align="center"
                    style={{marginTop: 5}}
                  >
                    Upload
                  </Typography>
                </div>
              </IconButton>
            </div>
          </Box>
          <div className={classes.streamDurationContainer}>
            <span className={classes.streamDurationTitle}>Stream duration:</span>
            <Timer isStarted={isStarted} />
          </div>
          <Box className={classes.viewModelContainer}>
            {renderGridVwBtn()}
            {renderScreenVwBtn()}
            {renderCameraVwBtn()}
          </Box>
        </Box>
      </Box>
      {inviteDialog && <InviteLinkDialog />}
      {user.isSuccess &&
        room.isSuccess &&
        user.id === room.data.user.id &&
        uploadDialog && <UploadLinkDialog />}
    </>
  );
};

export default Meeting;
// export default User;
