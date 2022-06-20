"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const ConfigModule_1 = require("./config/ConfigModule");
const MediasoupModule_1 = require("./mediasoup/MediasoupModule");
const StorageModule_1 = require("./storage/StorageModule");
const EmailSenderModule_1 = require("./emailSender/EmailSenderModule");
const NotificationModule_1 = require("./notifications/NotificationModule");
const PdfModule_1 = require("./pdf/PdfModule");
let ServicesModule = class ServicesModule {
};
ServicesModule = __decorate([
    common_1.Module({
        imports: [
            ConfigModule_1.ConfigModule,
            MediasoupModule_1.MediasoupModule,
            StorageModule_1.StorageModule,
            EmailSenderModule_1.EmailSenderModule,
            NotificationModule_1.NotificationModule,
            PdfModule_1.PdfModule,
        ],
        providers: [],
        exports: [
            ConfigModule_1.ConfigModule,
            MediasoupModule_1.MediasoupModule,
            StorageModule_1.StorageModule,
            EmailSenderModule_1.EmailSenderModule,
            NotificationModule_1.NotificationModule,
            PdfModule_1.PdfModule,
        ],
    })
], ServicesModule);
exports.ServicesModule = ServicesModule;
//# sourceMappingURL=ServicesModule.js.map