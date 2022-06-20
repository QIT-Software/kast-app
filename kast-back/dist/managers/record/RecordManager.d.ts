import IRecordManager from 'managers/record/IRecordManager';
import IRecordStore from 'database/stores/record/IRecordStore';
export default class RecordManager extends IRecordManager {
    private readonly recordStore;
    constructor(recordStore: IRecordStore);
    getRecords(userId: string): Promise<import("../../entities/Record").default[]>;
    deleteRecord(userId: string, id: string): Promise<void>;
}
