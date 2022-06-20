import Router from './Router';
import Worker from './Worker';
import {Filter} from 'mediasoup/Utils';

export default abstract class IMediasoup {
  abstract createRouter(appData: Filter): Promise<Router>;

  abstract findRouter(filter: Filter): Router | undefined;

  abstract findWorker(roomId: string): Worker | undefined;

  abstract closeRouter(router: Router): void;
}
