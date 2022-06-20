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
const IMessageStore_1 = __importDefault(require("./IMessageStore"));
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const MessageModel_1 = require("../../models/MessageModel");
const Mappers_1 = require("../../models/Mappers");
const rxjs_1 = require("rxjs");
const Message_1 = __importDefault(require("../../entities/Message"));
let MessageStore = class MessageStore extends IMessageStore_1.default {
    constructor(messageModel) {
        super();
        this.messageModel = messageModel;
        this.populateMessage = {
            path: 'sender',
        };
    }
    async createMessage(message) {
        const newMessage = {
            sender: message.sender,
            roomId: message.roomId,
            body: message.body,
            receiverId: message.receiverId,
        };
        const createdMessage = await this.messageModel.create(newMessage);
        return Mappers_1.mapMessageFromModel(await createdMessage.populate(this.populateMessage).execPopulate());
    }
    async getMessagesByRoom(roomId) {
        const messages = await this.messageModel
            .find({ roomId })
            .populate(this.populateMessage);
        return Mappers_1.mapMessagesFromModel(messages);
    }
    async getMessageById(messageId) {
        const message = await this.messageModel
            .findOne({ _id: messageId })
            .populate(this.populateMessage);
        return message ? Mappers_1.mapMessageFromModel(message) : message;
    }
    watchInternal() {
        if (!this.changeStream) {
            const changeStream = this.messageModel.watch();
            changeStream.on('change', this.onChangeEventReceived.bind(this));
            this.changeStream = changeStream;
        }
        let newMessageSubject;
        if (this.newMessageSubject) {
            newMessageSubject = this.newMessageSubject;
        }
        else {
            newMessageSubject = new rxjs_1.Subject();
            this.newMessageSubject = newMessageSubject;
        }
        return { newMessageSubject };
    }
    async onChangeEventReceived(doc) {
        if (doc.operationType === 'insert') {
            const newMessage = await this.getMessageById(doc.documentKey._id);
            if (!newMessage) {
                throw new Error('Message does not exist');
            }
            if (this.newMessageSubject !== undefined) {
                this.newMessageSubject.next(newMessage);
            }
        }
    }
    watchMessageCreated() {
        const { newMessageSubject } = this.watchInternal();
        return newMessageSubject;
    }
};
MessageStore = __decorate([
    __param(0, mongoose_1.InjectModel(MessageModel_1.MessageSchema.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], MessageStore);
exports.default = MessageStore;
//# sourceMappingURL=MessageStore.js.map