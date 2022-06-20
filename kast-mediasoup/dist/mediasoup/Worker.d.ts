import { types } from 'mediasoup';
import Router from './Router';
import IMediasoupInternal from 'mediasoup/IMediasoupInternal';
import { BaseEntity } from 'mediasoup/BaseEntity';
import { Filter } from 'mediasoup/Utils';
export default class Worker extends BaseEntity {
    private readonly mediasoup;
    private readonly instance;
    private readonly _routers;
    constructor(mediasoup: IMediasoupInternal, instance: types.Worker);
    createRouter(appData: Filter): Promise<Router>;
    get routers(): Router[];
    findRouter(filter: Filter): Router | undefined;
    get appData(): any;
    get getRouters(): Router[];
    closeRouter(router: Router): void;
}
