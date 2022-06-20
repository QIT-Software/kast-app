import {createAction} from 'redux-actions';
import types from './types';
import {NavigationPayload} from 'state/ducks/router/actions';

export type Resume = {
  awards: string;
  education: string;
  experience: string;
  summary: string;
};

export type UploadPdf = {
  name: string;
  file: File;
} & NavigationPayload;

export default {
  saveUserResume: createAction<Resume>(types.SAVE_USER_RESUME),
  saveUserResumeCompleted: createAction(types.SAVE_USER_RESUME_COMPLETED),

  fetchUserResume: createAction(types.FETCH_USER_RESUME),
  fetchUserResumeCompleted: createAction<Resume>(types.FETCH_USER_RESUME_COMPLETED),

  fetchUserResumeLink: createAction(types.FETCH_USER_RESUME_LINK),
  fetchUserResumeLinkCompleted: createAction<string>(
    types.FETCH_USER_RESUME_LINK_COMPLETED,
  ),
  uploadPdf: createAction<UploadPdf>(types.UPLOAD_PDF),
  uploadPdfCompleted: createAction(types.UPLOAD_PDF_COMPLETED),
};
