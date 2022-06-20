import IRecordStore from 'database/stores/record/IRecordStore';
import { Model } from 'mongoose';
import RecordModel from 'database/models/RecordModel';
export default class RecordStore extends IRecordStore {
    private recordModel;
    constructor(recordModel: Model<RecordModel>);
    private readonly populateRecord;
    createRecord(userId: string, recordName: string, recordingId: string, fileId: string): Promise<void>;
    getRecords(userId: string): Promise<import("../../entities/Record").default[]>;
    findRecordByIdOrThrow(id: string): Promise<import("../../entities/Record").default>;
    deleteRecord(id: string): Promise<void>;
}
