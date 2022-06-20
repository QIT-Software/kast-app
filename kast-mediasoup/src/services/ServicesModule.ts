import {Module} from '@nestjs/common';
import {ConfigModule} from 'services/config/ConfigModule';
import {RecordModule} from 'services/record/RecordModule';

@Module({
  imports: [
    //
    ConfigModule,
    RecordModule,
  ],
  providers: [],
  exports: [
    //
    ConfigModule,
    RecordModule,
  ],
})
export class ServicesModule {}
