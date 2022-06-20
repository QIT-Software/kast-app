/// <reference types="node" />
import IFileManager from './IFileManager';
import IFileStore from 'database/stores/file/IFileStore';
import { IFileStorage } from '@spryrocks/file-storage';
export default class FileManager extends IFileManager {
    private readonly fileStore;
    private readonly fileStorage;
    constructor(fileStore: IFileStore, fileStorage: IFileStorage);
    addFile(name: string, mimeType: string, buffer: Buffer): Promise<{
        id: string;
    }>;
    getFile(file: {
        id: string;
    }): Promise<{
        stream: import("stream").Readable;
        name: string;
    }>;
}
