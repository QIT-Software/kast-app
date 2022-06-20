import {Module, ValidationPipe} from '@nestjs/common';
import {GraphQLModule} from '@nestjs/graphql';
import {StoresModule} from 'database/stores/StoresModule';
import {AccountResolver} from './resolvers/AccountResolver';
import {ManagerModule} from 'managers/ManagerModule';
import {EnhancersModule} from 'enhancers/EnhancersModule';
import {APP_PIPE} from '@nestjs/core';
import RoomResolver from './resolvers/RoomResolver';
import MediasoupResolver from 'graphql/resolvers/MediasoupResolver';
import {BookmarkResolver} from './resolvers/BookmarkResolver';
import MessageResolver from './resolvers/MessageResolver';
import {PubSub, PubSubEngine} from 'graphql-subscriptions';
import {RecordResolver} from 'graphql/resolvers/RecordResolver';
import {AvikastFileResolver} from 'graphql/resolvers/AvikastFileResolver';
import {ResumeResolver} from './resolvers/ResumeResolver';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.graphql',
      installSubscriptionHandlers: true,
      tracing: true,
      context: (context) => context,
      useGlobalPrefix: true,
    }),
    ManagerModule,
    EnhancersModule,
    StoresModule,
  ],
  providers: [
    {
      provide: PubSubEngine,
      useClass: PubSub,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    AvikastFileResolver,
    AccountResolver,
    RoomResolver,
    MediasoupResolver,
    BookmarkResolver,
    MessageResolver,
    RecordResolver,
    ResumeResolver,
  ],
})
export class GraphqlModule {}
