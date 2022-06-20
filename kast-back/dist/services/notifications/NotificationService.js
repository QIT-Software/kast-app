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
const INotificationService_1 = __importDefault(require("./INotificationService"));
const common_1 = require("@nestjs/common");
const IEmailSenderService_1 = require("../emailSender/IEmailSenderService");
const IUserStore_1 = __importDefault(require("../../database/stores/user/IUserStore"));
const ISessionStore_1 = __importDefault(require("../../database/stores/session/ISessionStore"));
const EmailMessages_1 = require("./messages/EmailMessages");
let NotificationService = class NotificationService extends INotificationService_1.default {
    constructor(userStore, sessionStore, mailerService) {
        super();
        this.userStore = userStore;
        this.sessionStore = sessionStore;
        this.mailerService = mailerService;
    }
    async sendRegistrationMessage(userName, email) {
        const message = EmailMessages_1.createSuccessRegistrationMessage(userName);
        await this.mailerService.sendMessage(email, message);
    }
    async sendNewPassword(userId, password) {
        const user = await this.userStore.getUser(userId);
        if (!user)
            throw new Error('Email sender no user');
        const message = EmailMessages_1.createNewPasswordMessage(password);
        await this.mailerService.sendMessage(user.email, message);
    }
};
NotificationService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [IUserStore_1.default,
        ISessionStore_1.default,
        IEmailSenderService_1.IEmailSenderService])
], NotificationService);
exports.default = NotificationService;
//# sourceMappingURL=NotificationService.js.map