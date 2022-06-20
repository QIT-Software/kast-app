import {types} from 'mediasoup';
import Router from './Router';
import IMediasoupInternal from 'mediasoup/IMediasoupInternal';
import {BaseEntity} from 'mediasoup/BaseEntity';
import {Filter, removeFromArray} from 'mediasoup/Utils';

export default class Worker extends BaseEntity {
  private readonly _routers: Array<Router> = [];

  public constructor(
    private readonly mediasoup: IMediasoupInternal,
    private readonly instance: types.Worker,
  ) {
    super();
  }

  public async createRouter(appData: Filter) {
    const config = this.mediasoup.getConfig();
    const {mediaCodecs} = config;
    const router = new Router(
      this.mediasoup,
      await this.instance.createRouter({mediaCodecs, appData}),
    );
    this._routers.push(router);
    return router;
  }

  public get routers() {
    return [...this._routers];
  }

  public findRouter(filter: Filter) {
    // console.log(
    //   'findRouter router, router list :',
    //   this.routers.map((el) => {
    //     return el;
    //   }),
    // );
    return this.routers.find((router) => router.matchAppData(filter));
  }

  get appData() {
    return this.instance.appData;
  }

  get getRouters() {
    return this._routers;
  }

  public closeRouter(router: Router) {
    router.close();
    removeFromArray(this.routers, router);
  }
}
