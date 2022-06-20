import IAvikastFileManager from './IAvikastFileManager';
import IAvikastFileStore from '../../database/stores/avikastFile/IAvikastFileStore';
import { AvikastFile } from 'entities/AvikastFile';
export default class AvikastFileManager extends IAvikastFileManager {
    private readonly avikastFileStore;
    constructor(avikastFileStore: IAvikastFileStore);
    getFiles(userId: string, parent: string | undefined): Promise<AvikastFile[]>;
    getImages(userId: string): Promise<AvikastFile[]>;
    addFile(userId: string, name: string, fileId: string, parent: string | undefined): Promise<AvikastFile>;
    createDirectory(userId: string, name: string, parent: string | undefined): Promise<AvikastFile>;
    deleteFile(userId: string, id: string): Promise<void>;
    deleteDirectory(userId: string, id: string): Promise<void>;
}
