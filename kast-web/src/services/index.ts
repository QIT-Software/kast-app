import IFirebaseMessagingService from './IFirebaseMessagingService';
import FirebaseMessagingService from './FirebaseMessagingService';
import {createConfigService, getConfigEnv} from '@spryrocks/config-react';
import resources from '../resources/env.tmp.json';
import IMediasoupService from './mediasoup/IMediasoupService';
import MediasoupService from './mediasoup/MediasoupService';
import ISubscriptionsService from 'services/subscriptions/ISubscriptionsService';
import SubscriptionsService from './subscriptions/SubscriptionsService';

const firebaseMessagingServiceInstance = new FirebaseMessagingService();
const firebaseMessagingService: IFirebaseMessagingService = firebaseMessagingServiceInstance;

const configService = createConfigService(getConfigEnv(), undefined, resources);

const mediasoupService: IMediasoupService = new MediasoupService();

const subscriptionService: ISubscriptionsService = new SubscriptionsService();

export {
  //
  firebaseMessagingService as FirebaseMessagingService,
  configService as ConfigService,
  mediasoupService as MediasoupService,
  subscriptionService as SubscriptionService,
};

export const initializeServicesAsync = async () => {
  await firebaseMessagingServiceInstance.initialize();
};
