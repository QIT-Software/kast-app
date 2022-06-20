import IAvikastFilesManager from '../../managers/avikastFile/IAvikastFileManager';
import AvikastFile from '../entities/avikastFile/AvikastFile';
import SessionInfo from 'entities/SessionInfo';
export declare class AvikastFileResolver {
    private readonly avikastFilesManager;
    constructor(avikastFilesManager: IAvikastFilesManager);
    avikastFiles({ userId }: SessionInfo, parent: string | undefined): Promise<AvikastFile[]>;
    getImages({ userId }: SessionInfo): Promise<AvikastFile[]>;
    addAvikastFile({ userId }: SessionInfo, name: string, fileId: string, parent: string | undefined): Promise<AvikastFile>;
    createAvikastDirectory({ userId }: SessionInfo, name: string, parent: string | undefined): Promise<AvikastFile>;
    deleteAvikastFile({ userId }: SessionInfo, id: string): Promise<boolean>;
    deleteAvikastDirectory({ userId }: SessionInfo, id: string): Promise<boolean>;
}
