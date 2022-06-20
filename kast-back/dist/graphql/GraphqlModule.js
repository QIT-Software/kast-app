"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const StoresModule_1 = require("../database/stores/StoresModule");
const AccountResolver_1 = require("./resolvers/AccountResolver");
const ManagerModule_1 = require("../managers/ManagerModule");
const EnhancersModule_1 = require("../enhancers/EnhancersModule");
const core_1 = require("@nestjs/core");
const RoomResolver_1 = __importDefault(require("./resolvers/RoomResolver"));
const MediasoupResolver_1 = __importDefault(require("./resolvers/MediasoupResolver"));
const BookmarkResolver_1 = require("./resolvers/BookmarkResolver");
const MessageResolver_1 = __importDefault(require("./resolvers/MessageResolver"));
const graphql_subscriptions_1 = require("graphql-subscriptions");
const RecordResolver_1 = require("./resolvers/RecordResolver");
const AvikastFileResolver_1 = require("./resolvers/AvikastFileResolver");
const ResumeResolver_1 = require("./resolvers/ResumeResolver");
let GraphqlModule = class GraphqlModule {
};
GraphqlModule = __decorate([
    common_1.Module({
        imports: [
            graphql_1.GraphQLModule.forRoot({
                autoSchemaFile: 'schema.graphql',
                installSubscriptionHandlers: true,
                tracing: true,
                context: (context) => context,
                useGlobalPrefix: true,
            }),
            ManagerModule_1.ManagerModule,
            EnhancersModule_1.EnhancersModule,
            StoresModule_1.StoresModule,
        ],
        providers: [
            {
                provide: graphql_subscriptions_1.PubSubEngine,
                useClass: graphql_subscriptions_1.PubSub,
            },
            {
                provide: core_1.APP_PIPE,
                useClass: common_1.ValidationPipe,
            },
            AvikastFileResolver_1.AvikastFileResolver,
            AccountResolver_1.AccountResolver,
            RoomResolver_1.default,
            MediasoupResolver_1.default,
            BookmarkResolver_1.BookmarkResolver,
            MessageResolver_1.default,
            RecordResolver_1.RecordResolver,
            ResumeResolver_1.ResumeResolver,
        ],
    })
], GraphqlModule);
exports.GraphqlModule = GraphqlModule;
//# sourceMappingURL=GraphqlModule.js.map