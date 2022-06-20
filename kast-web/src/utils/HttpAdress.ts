// eslint-disable-next-line import/no-extraneous-dependencies
import {generatePath} from 'react-router';

export const getInviteLinkAdress = (inviteLink: string | undefined) => {
  const {location} = window;
  const path = generatePath('/main/joinRoom/?invite=:inviteLink', {inviteLink});
  return `${location.protocol}//${location.host}${path}`;
};
