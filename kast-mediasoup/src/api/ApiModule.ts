import {Module} from '@nestjs/common';
import MediasoupController from './MediasoupController';
import {ManagerModule} from 'managers/ManagerModule';

@Module({
  imports: [
    //
    ManagerModule,
    // EnhancersModule,
  ],
  controllers: [
    //
    MediasoupController,
  ],
  exports: [],
})
export class ApiModule {}
