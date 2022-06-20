import IInitializeService from 'services/core/IInitializeService';
import IFirebaseMessagingService from './IFirebaseMessagingService';
import firebase from 'firebase';

// region Helpers

// endregion

export default class FirebaseMessagingService
  implements IFirebaseMessagingService, IInitializeService {
  // eslint-disable-next-line class-methods-use-this
  async initialize() {
    try {
      const firebaseConfig = {
        apiKey: 'AIzaSyAltIk67cucYGnzlOW4kHPdGvWmV-8pXag',
        authDomain: 'klean-4db98.firebaseapp.com',
        databaseURL: 'https://klean-4db98.firebaseio.com',
        projectId: 'klean-4db98',
        storageBucket: 'klean-4db98.appspot.com',
        messagingSenderId: '336838062363',
        appId: '1:336838062363:web:fc4dd6fffaa20130ad63be',
        measurementId: 'G-LFXEHNRSJG',
      };

      firebase.initializeApp(firebaseConfig);

      return true;
    } catch (e) {
      return false;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async getToken(): Promise<string | null> {
    return firebase.messaging().getToken();
  }
}
