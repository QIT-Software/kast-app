import IFileStore from 'database/stores/file/IFileStore';
import {Injectable} from '@nestjs/common';
import {Model, QueryPopulateOptions} from 'mongoose';
import FileModel, {CreateFileModel, FileSchema} from 'database/models/FileModel';
import {InjectModel} from '@nestjs/mongoose';
import {mapFileFromModel} from 'database/models/Mappers';

@Injectable()
export default class FileStore implements IFileStore {
  constructor(
    @InjectModel(FileSchema.name)
    private fileModel: Model<FileModel>,
  ) {}

  private readonly populateFiles: QueryPopulateOptions = {
    path: 'files',
  };

  async addFile(name: string, mimeType: string, mediaLink: string) {
    const newFile: CreateFileModel = {
      mediaLink,
      name,
      mimeType,
    };
    return mapFileFromModel(await this.fileModel.create(newFile));
  }

  async getFile(file: {id: string}) {
    const result = await this.fileModel.findById(file.id);
    return result ? mapFileFromModel(result) : undefined;
  }

  async addResume(name: string, mimeType: string, mediaLink: string) {
    const newFile: CreateFileModel = {
      mediaLink,
      name,
      mimeType,
    };
    const updateResume = await this.fileModel.findOneAndUpdate(
      {name, mimeType},
      {newFile},
    );
    if (!updateResume) {
      return mapFileFromModel(await this.fileModel.create(newFile));
    }

    return mapFileFromModel(updateResume);
  }
}
