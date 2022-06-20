import {Module} from '@nestjs/common';
import {MongooseModule, MongooseModuleOptions} from '@nestjs/mongoose';
import {ConfigModule} from 'services/config/ConfigModule';
import {UserSchema} from './models/UserModel';
import {LocalLoginSchema} from './models/LocalLoginModel';
import {SessionSchema} from './models/SessionModel';
import {IConfigService} from '@spryrocks/config-node';
import {RoomSchema} from 'database/models/RoomModel';
import {BookmarkSchema} from './models/BookmarkModel';
import {ParticipantSchema} from 'database/models/ParticipantModel';
import {AvikastFileSchema} from './models/AvikastFileModel';
import {MessageSchema} from './models/MessageModel';
import {FileSchema} from 'database/models/FileModel';
import {RecordSchema} from 'database/models/RecordModel';
import {ResumeSchema} from 'database/models/ResumeModel';

const options = (configService: IConfigService): MongooseModuleOptions => {
  const host = configService.get('DATABASE_HOST');
  const port = configService.getNumber('DATABASE_PORT');
  const databaseName = configService.get('DATABASE_NAME');

  const uri = `mongodb://${host}:${port}/${databaseName}`;

  return {
    uri,
    user: configService.get('DATABASE_USERNAME'),
    pass: configService.get('DATABASE_PASSWORD'),
    dbName: 'avikast',
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    poolSize: 100,
  };
};

@Module({
  imports: [
    //
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [IConfigService],
      useFactory: options,
    }),
    MongooseModule.forFeature([
      //
      UserSchema,
      LocalLoginSchema,
      SessionSchema,
      RoomSchema,
      BookmarkSchema,
      AvikastFileSchema,
      ParticipantSchema,
      MessageSchema,
      FileSchema,
      RecordSchema,
      ResumeSchema,
    ]),
  ],
  exports: [
    //
    MongooseModule,
  ],
})
export class DatabaseModule {}
