"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("@nestjs/graphql");
const Message_1 = __importDefault(require("../entities/message/Message"));
const Mappers_1 = require("../entities/Mappers");
const CurrentSession_1 = __importDefault(require("../../enhancers/decorators/CurrentSession"));
const IMessageManager_1 = __importDefault(require("../../managers/message/IMessageManager"));
const graphql_subscriptions_1 = require("graphql-subscriptions");
const Ignore_1 = __importDefault(require("../../enhancers/decorators/Ignore"));
const SessionInfo_1 = __importDefault(require("../../entities/SessionInfo"));
const EVENT_NEW_MESSAGE = 'NEW_MESSAGE';
let MessageResolver = class MessageResolver {
    constructor(chatManager, pubSub) {
        this.chatManager = chatManager;
        this.pubSub = pubSub;
    }
    async messagesByRoom(roomId) {
        return Mappers_1.mapMessagesToGQL(await this.chatManager.getMessagesByRoom(roomId));
    }
    async messageById(messageId) {
        return Mappers_1.mapMessageToGQL(await this.chatManager.getMessageById(messageId));
    }
    async createMessage(session, roomId, messageBody, receiverId) {
        return this.chatManager.createMessage(session.userId, roomId, messageBody, receiverId || '');
    }
    async messageAdded(_roomId, _userId) {
        if (!this.messageCreatedSubscription) {
            this.messageCreatedSubscription = this.chatManager
                .messageCreatedObservable()
                .subscribe(async (newMessage) => this.pubSub.publish(EVENT_NEW_MESSAGE, newMessage));
        }
        return this.pubSub.asyncIterator(EVENT_NEW_MESSAGE);
    }
};
__decorate([
    graphql_1.Query(() => [Message_1.default]),
    __param(0, graphql_1.Args({ name: 'roomId', type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "messagesByRoom", null);
__decorate([
    graphql_1.Query(() => Message_1.default),
    __param(0, graphql_1.Args({ name: 'messageId', type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "messageById", null);
__decorate([
    graphql_1.Mutation(() => Message_1.default),
    __param(0, CurrentSession_1.default()),
    __param(1, graphql_1.Args({ name: 'roomId', type: () => String })),
    __param(2, graphql_1.Args({ name: 'messageBody', type: () => String })),
    __param(3, graphql_1.Args({ name: 'receiverId', type: () => String, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "createMessage", null);
__decorate([
    Ignore_1.default('AppType', 'Platform'),
    graphql_1.Subscription(() => Message_1.default, {
        filter: (newMessage, { roomId }) => roomId === newMessage.roomId,
        resolve: (newMessage) => newMessage,
    }),
    __param(0, graphql_1.Args({ name: 'roomId', type: () => String })),
    __param(1, graphql_1.Args({ name: 'userId', type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "messageAdded", null);
MessageResolver = __decorate([
    graphql_1.Resolver(),
    __metadata("design:paramtypes", [IMessageManager_1.default,
        graphql_subscriptions_1.PubSubEngine])
], MessageResolver);
exports.default = MessageResolver;
//# sourceMappingURL=MessageResolver.js.map