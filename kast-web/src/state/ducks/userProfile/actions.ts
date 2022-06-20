import {createAction} from 'redux-actions';
import types from './types';
import User from 'entities/User';
import UpdateUserRequest from './models';

export type FetchUserProfileCompleted = User;
export type Save = UpdateUserRequest;
export type SaveCompleted = User;

export type UploadUserImage = {
  name: string;
  file: File;
};

export type Resume = {
  summary: string;
  experience: string;
  education: string;
  awards: string;
};

export default {
  fetchUserProfile: createAction(types.FETCH_USER_PROFILE),
  fetchUserProfileCompleted: createAction<FetchUserProfileCompleted>(
    types.FETCH_USER_PROFILE_COMPLETED,
  ),
  save: createAction<Save>(types.SAVE),
  saveCompleted: createAction<SaveCompleted>(types.FETCH_USER_PROFILE_COMPLETED),

  uploadUserImage: createAction<UploadUserImage>(types.UPLOAD_USER_IMAGE),
  uploadUserImageCompleted: createAction(types.UPLOAD_USER_IMAGE_COMPLETED),

  uploadUserLogoImage: createAction<UploadUserImage>(types.UPLOAD_USER_LOGO_IMAGE),
  uploadUserLogoImageCompleted: createAction(types.UPLOAD_USER_LOGO_IMAGE_COMPLETED),

  uploadUserBackgroundImage: createAction<UploadUserImage>(
    types.UPLOAD_USER_BACKGROUND_IMAGE,
  ),
  uploadUserBackgroundImageCompleted: createAction(
    types.UPLOAD_USER_BACKGROUND_IMAGE_COMPLETED,
  ),
};
