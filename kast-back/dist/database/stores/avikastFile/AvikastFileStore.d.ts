import { Model } from 'mongoose';
import IAvikastFileStore from './IAvikastFileStore';
import AvikastFileModel from '../../models/AvikastFileModel';
import { AvikastFileType } from 'entities/AvikastFile';
export default class AvikastFileStore extends IAvikastFileStore {
    private avikastFileModel;
    constructor(avikastFileModel: Model<AvikastFileModel>);
    private readonly populateAvikastFile;
    findFileByIdOrThrow(id: string): Promise<import("../../entities/AvikastFile").default>;
    getFiles(userId: string, parent: string | undefined): Promise<import("../../entities/AvikastFile").default[]>;
    getImages(userId: string): Promise<import("../../entities/AvikastFile").default[]>;
    createFile(userId: string, name: string, type: AvikastFileType, fileId: string | undefined, parent: string | undefined): Promise<import("../../entities/AvikastFile").default>;
    deleteFile(id: string): Promise<void>;
}
