/* eslint-disable */
import {Injectable} from '@nestjs/common';
import {mapAvikastFileFromDB, mapAvikastFilesFromDB} from 'database/entities/Mappers';
import IAvikastFileManager from './IAvikastFileManager';
import IAvikastFileStore from '../../database/stores/avikastFile/IAvikastFileStore';
import {AvikastFile, AvikastFileType} from 'entities/AvikastFile';

@Injectable()
export default class AvikastFileManager extends IAvikastFileManager {
  constructor(private readonly avikastFileStore: IAvikastFileStore) {
    super();
  }

  async getFiles(userId: string, parent: string | undefined) {
    return mapAvikastFilesFromDB(await this.avikastFileStore.getFiles(userId, parent));
  }

  async getImages(userId: string) {
    const files = mapAvikastFilesFromDB(await this.avikastFileStore.getImages(userId));
    const images: AvikastFile[] = [];
    files.map((el) => {
      const fileType = el.name.substring(el.name.length - 3, el.name.length);
      if (fileType === 'jpg' || fileType === 'png') { //TODO adapt to jpeg?
        images.push(el);
      }
    });
    return images;
  }

  async addFile(
    userId: string,
    name: string,
    fileId: string,
    parent: string | undefined,
  ) {
    return mapAvikastFileFromDB(
      await this.avikastFileStore.createFile(
        userId,
        name,
        AvikastFileType.File,
        fileId,
        parent,
      ),
    );
  }

  async createDirectory(userId: string, name: string, parent: string | undefined) {
    return mapAvikastFileFromDB(
      await this.avikastFileStore.createFile(
        userId,
        name,
        AvikastFileType.Directory,
        undefined,
        parent,
      ),
    );
  }

  async deleteFile(userId: string, id: string) {
    const file = await this.avikastFileStore.findFileByIdOrThrow(id);
    if (file.type !== AvikastFileType.File) throw new Error('This is not a file');
    await this.avikastFileStore.deleteFile(file.id);
  }

  async deleteDirectory(userId: string, id: string) {
    const file = await this.avikastFileStore.findFileByIdOrThrow(id);
    if (file.type !== AvikastFileType.Directory)
      throw new Error('This is not a directory');
    await this.avikastFileStore.deleteFile(file.id);
  }
}
