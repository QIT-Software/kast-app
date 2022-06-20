import IRecordService from 'services/record/IRecordSevice';
export default class RecordService extends IRecordService {
    private readonly recordingsDirectory;
    private readonly processes;
    private readonly configDirectory;
    constructor(recordingsDirectory: string);
    startRecording(roomId: string, recordId: string, audio: boolean): Promise<boolean>;
    stopRecording(roomId: string): Promise<boolean>;
}
