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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const IMessageManager_1 = __importDefault(require("./IMessageManager"));
const IMessageStore_1 = __importDefault(require("../../database/stores/message/IMessageStore"));
const Mappers_1 = require("../../database/entities/Mappers");
const operators_1 = require("rxjs/operators");
const Message_1 = __importDefault(require("../../entities/Message"));
let MessageManager = class MessageManager extends IMessageManager_1.default {
    constructor(messageStore) {
        super();
        this.messageStore = messageStore;
    }
    async getMessagesByRoom(roomId) {
        const message = await this.messageStore.getMessagesByRoom(roomId);
        if (!message)
            throw new Error("Message's array is empty");
        return Mappers_1.mapMessagesFromDB(message);
    }
    async getMessageById(messageId) {
        const message = await this.messageStore.getMessageById(messageId);
        if (!message) {
            throw new Error(`Message with id: ${messageId} does not exist`);
        }
        return Mappers_1.mapMessageFromDB(message);
    }
    async createMessage(sender, roomId, body, receiverId) {
        const message = { sender, roomId, body, receiverId };
        return Mappers_1.mapMessageFromDB(await this.messageStore.createMessage(message));
    }
    messageCreatedObservable() {
        return this.messageStore.watchMessageCreated().pipe(operators_1.map(Mappers_1.mapMessageFromDB));
    }
};
MessageManager = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [IMessageStore_1.default])
], MessageManager);
exports.default = MessageManager;
//# sourceMappingURL=MessageManager.js.map