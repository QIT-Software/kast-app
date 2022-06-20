import IFileManager from 'managers/file/IFileManager';
import { Response } from 'express';
import UploadFileInfo from './UploadFileInfo';
import { ID } from 'entities/Common';
export declare class FilesController {
    private readonly fileManager;
    constructor(fileManager: IFileManager);
    uploadFile(file: UploadFileInfo): Promise<string>;
    getFile(id: ID, res: Response): Promise<void>;
}
