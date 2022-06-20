import { Filter } from 'mediasoup/Utils';
export declare abstract class BaseEntity {
    abstract get appData(): Filter;
    matchAppData(filter: Filter): boolean;
}
