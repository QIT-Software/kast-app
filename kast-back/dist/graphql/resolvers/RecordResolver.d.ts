import IRecordManager from 'managers/record/IRecordManager';
import Record from '../entities/record/Record';
import SessionInfo from 'entities/SessionInfo';
export declare class RecordResolver {
    private readonly recordManager;
    constructor(recordManager: IRecordManager);
    records({ userId }: SessionInfo): Promise<Record[]>;
    deleteRecord({ userId }: SessionInfo, id: string): Promise<boolean>;
}
