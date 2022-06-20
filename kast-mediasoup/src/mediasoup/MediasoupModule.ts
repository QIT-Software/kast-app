import {Module} from '@nestjs/common';
import IMediasoup from './IMediasoup';
import {initializeMediasoup} from './MediasoupInitializer';
import {IConfigService} from '@spryrocks/config-node';
import {ConfigModule} from 'services/config/ConfigModule';

@Module({
  imports: [
    //
    ConfigModule,
  ],
  providers: [
    {
      provide: IMediasoup,
      useFactory: (configService: IConfigService) => {
        return initializeMediasoup(configService);
      },
      inject: [IConfigService],
    },
  ],
  exports: [
    //
    IMediasoup,
  ],
})
export class MediasoupModule {}
