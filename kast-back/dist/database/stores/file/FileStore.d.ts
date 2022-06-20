import IFileStore from 'database/stores/file/IFileStore';
import { Model } from 'mongoose';
import FileModel from 'database/models/FileModel';
export default class FileStore implements IFileStore {
    private fileModel;
    constructor(fileModel: Model<FileModel>);
    private readonly populateFiles;
    addFile(name: string, mimeType: string, mediaLink: string): Promise<import("../../entities/File").default>;
    getFile(file: {
        id: string;
    }): Promise<import("../../entities/File").default | undefined>;
    addResume(name: string, mimeType: string, mediaLink: string): Promise<import("../../entities/File").default>;
}
