import {Module} from '@nestjs/common';
import {MediasoupModule} from 'mediasoup/MediasoupModule';
import IMediaManager from 'managers/media/IMediaManager';
import MediaManager from 'managers/media/MediaManager';
import ILogger from 'utils/ILogger';
import Logger from 'utils/Logger';
import {RecordModule} from 'services/record/RecordModule';
import {ConfigModule} from 'services/config/ConfigModule';

@Module({
  imports: [
    //
    MediasoupModule,
    RecordModule,
    ConfigModule,
  ],
  providers: [
    {
      provide: IMediaManager,
      useClass: MediaManager,
    },
    {
      provide: ILogger,
      useClass: Logger,
    },
  ],
  exports: [
    //
    IMediaManager,
  ],
})
export class ManagerModule {}
