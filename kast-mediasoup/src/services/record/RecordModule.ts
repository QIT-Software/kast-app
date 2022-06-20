import {Module} from '@nestjs/common';
import {ConfigModule} from '../config/ConfigModule';
import IRecordService from 'services/record/IRecordSevice';
import RecordService from 'services/record/RecordService';
import {IConfigService} from '@spryrocks/config-node';
import * as fs from 'fs';

@Module({
  imports: [
    //
    ConfigModule,
  ],
  providers: [
    {
      inject: [IConfigService],
      provide: IRecordService,
      useFactory: (configService: IConfigService) => {
        const rootDirectory = configService.get('RECORDINGS_ROOT_DIRECTORY');
        if (!fs.existsSync(rootDirectory))
          throw new Error(`Recordings directory not exists at '${rootDirectory}'`);
        return new RecordService(rootDirectory);
      },
    },
  ],
  exports: [IRecordService],
})
export class RecordModule {}
