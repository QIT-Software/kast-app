import {handleActions, Reducer} from 'redux-actions';
import types from './types';
import {ResumeReducerState} from '../../entities/State';
import Resume from 'entities/Resume';

const fetchResume: Reducer<ResumeReducerState, Resume> = (state, {payload}) => {
  return {...state, resume: payload};
};

const fetchResumeLink: Reducer<ResumeReducerState, string> = (state, {payload}) => {
  return {...state, link: payload};
};

export default handleActions<ResumeReducerState, never>(
  {
    [types.FETCH_USER_RESUME_COMPLETED]: fetchResume,
    [types.FETCH_USER_RESUME_LINK_COMPLETED]: fetchResumeLink,
  },
  {
    resume: undefined,
    link: undefined,
  },
);
