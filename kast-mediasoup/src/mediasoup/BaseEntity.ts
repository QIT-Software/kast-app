import {Filter, matchAppData} from 'mediasoup/Utils';

export abstract class BaseEntity {
  public abstract get appData(): Filter;

  public matchAppData(filter: Filter): boolean {
    return matchAppData(this.appData, filter);
  }
}
