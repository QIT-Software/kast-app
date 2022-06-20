"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const ConfigModule_1 = require("../services/config/ConfigModule");
const UserModel_1 = require("./models/UserModel");
const LocalLoginModel_1 = require("./models/LocalLoginModel");
const SessionModel_1 = require("./models/SessionModel");
const config_node_1 = require("@spryrocks/config-node");
const RoomModel_1 = require("./models/RoomModel");
const BookmarkModel_1 = require("./models/BookmarkModel");
const ParticipantModel_1 = require("./models/ParticipantModel");
const AvikastFileModel_1 = require("./models/AvikastFileModel");
const MessageModel_1 = require("./models/MessageModel");
const FileModel_1 = require("./models/FileModel");
const RecordModel_1 = require("./models/RecordModel");
const ResumeModel_1 = require("./models/ResumeModel");
const options = (configService) => {
    const host = configService.get('DATABASE_HOST');
    const port = configService.getNumber('DATABASE_PORT');
    const databaseName = configService.get('DATABASE_NAME');
    const uri = `mongodb://${host}:${port}/${databaseName}`;
    return {
        uri,
        user: configService.get('DATABASE_USERNAME'),
        pass: configService.get('DATABASE_PASSWORD'),
        dbName: 'avikast',
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        poolSize: 100,
    };
};
let DatabaseModule = class DatabaseModule {
};
DatabaseModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forRootAsync({
                imports: [ConfigModule_1.ConfigModule],
                inject: [config_node_1.IConfigService],
                useFactory: options,
            }),
            mongoose_1.MongooseModule.forFeature([
                UserModel_1.UserSchema,
                LocalLoginModel_1.LocalLoginSchema,
                SessionModel_1.SessionSchema,
                RoomModel_1.RoomSchema,
                BookmarkModel_1.BookmarkSchema,
                AvikastFileModel_1.AvikastFileSchema,
                ParticipantModel_1.ParticipantSchema,
                MessageModel_1.MessageSchema,
                FileModel_1.FileSchema,
                RecordModel_1.RecordSchema,
                ResumeModel_1.ResumeSchema,
            ]),
        ],
        exports: [
            mongoose_1.MongooseModule,
        ],
    })
], DatabaseModule);
exports.DatabaseModule = DatabaseModule;
//# sourceMappingURL=DatabaseModule.js.map