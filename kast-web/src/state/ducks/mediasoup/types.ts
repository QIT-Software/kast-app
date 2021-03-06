const prefix = 'MEDIASOUP_';

export default {
  START_STREAMING: `${prefix}START_STREAMING`,
  STOP_STREAMING: `${prefix}STOP_STREAMING`,
  STOP_STREAMING_COMPLETED: `${prefix}STOP_STREAMING_COMPLETED`,

  INITIALIZE: `${prefix}INITIALIZE`,
  INITIALIZE_MEETING: `${prefix}INITIALIZE`,
  INITIALIZE_WEBINAR_OWNER: `${prefix}INITILIZE_WEBINAR_OWNER`,
  INITIALIZE_WEBINAR_PARTICIPANT: `${prefix}INITILIZE_WEBINAR_PARTICIPANT`,

  PRODUCE: `${prefix}PRODUCE`,
  CONSUME: `${prefix}CONSUME`,
  UPDATE_WEBINAR_TRACKS: `${prefix}UPDATE_WEBINAR_TRACKS`,

  PLAY_PAUSE_SCREEN: `${prefix}PLAY_PAUSE_SCREEN`,
  PLAY_PAUSE_SCREEN_COMPLETED: `${prefix}PLAY_PAUSE_SCREEN_COMPLETED`,
  PLAY_PAUSE_CAMERA: `${prefix}PLAY_PAUSE_CAMERA`,
  PLAY_PAUSE_CAMERA_COMPLETED: `${prefix}PLAY_PAUSE_CAMERA_COMPLETED`,
  PLAY_PAUSE_AUDIO: `${prefix}PLAY_PAUSE_AUDIO`,
  PLAY_PAUSE_AUDIO_COMPLETED: `${prefix}PLAY_PAUSE_AUDIO_COMPLETED`,

  START_RECORDING: `${prefix}START_RECORDING`,
  START_RECORDING_COMPLETED: `${prefix}START_RECORDING_COMPLETED`,
  STOP_RECORDING: `${prefix}STOP_RECORDING`,
  STOP_RECORDING_COMPLETED: `${prefix}STOP_RECORDING_COMPLETED`,

  SET_LARGE_SCREEN: `${prefix}SET_LARGE_SCREEN`,
  SET_SCREEN_GRID_WITH_CAMERAS: `${prefix}SET_SCREEN_GRID_WITH_CAMERAS`,
  SET_SCREEN_GRID_WITH_SCREENSHARE: `${prefix}SET_SCREEN_GRID_WITH_SCREENSHARE`,

  PAUSE: `${prefix}PAUSE`,

  GET_ROOM_TRACKS: `${prefix}GET_ROOM_TRACKS`,
  PUSH_PARTICIPANT_TRACKS: `${prefix}PUSH_PARTICIPANT_TRACKS`,

  CHANGE_QUALITY: `${prefix}CHANGE_QUALITY`,
};
