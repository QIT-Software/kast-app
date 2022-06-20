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
const INotificationService_1 = __importDefault(require("./INotificationService"));
const NotificationService_1 = __importDefault(require("./NotificationService"));
const StoresModule_1 = require("../../database/stores/StoresModule");
const EmailSenderModule_1 = require("../emailSender/EmailSenderModule");
let NotificationModule = class NotificationModule {
};
NotificationModule = __decorate([
    common_1.Module({
        imports: [
            StoresModule_1.StoresModule,
            EmailSenderModule_1.EmailSenderModule,
        ],
        providers: [
            {
                provide: INotificationService_1.default,
                useClass: NotificationService_1.default,
            },
        ],
        exports: [INotificationService_1.default],
    })
], NotificationModule);
exports.NotificationModule = NotificationModule;
//# sourceMappingURL=NotificationModule.js.map