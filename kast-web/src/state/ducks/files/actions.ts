import {createAction} from 'redux-actions';
import types from './types';
import {AvikastDirectory, AvikastFile} from 'entities/AvikastFiles';

export type FetchFiles = {parent: string | undefined};
export type FetchFilesCompleted = {
  id: string;
  name: string;
  files: AvikastFile;
  directories: AvikastDirectory;
};

export type UploadFile = {name: string; file: File; parent: string | undefined};

export type CreateDirectory = {name: string; parent: string | undefined};

export type DeleteFile = {id: string; parent: string | undefined};
export type DeleteDirectory = {id: string; parent: string | undefined};

export default {
  fetchFiles: createAction<FetchFiles>(types.FETCH_FILES),
  fetchFilesCompleted: createAction(types.FETCH_FILES_COMPLETED),

  uploadFile: createAction<UploadFile>(types.UPLOAD_FILE),

  createDirectory: createAction<CreateDirectory>(types.CREATE_DIRECTORY),

  deleteFile: createAction<DeleteFile>(types.DELETE_FILE),
  deleteDirectory: createAction<DeleteDirectory>(types.DELETE_DIRECTORY),
};
