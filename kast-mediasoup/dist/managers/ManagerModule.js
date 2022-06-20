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
exports.ManagerModule = void 0;
const common_1 = require("@nestjs/common");
const MediasoupModule_1 = require("../mediasoup/MediasoupModule");
const IMediaManager_1 = __importDefault(require("./media/IMediaManager"));
const MediaManager_1 = __importDefault(require("./media/MediaManager"));
const ILogger_1 = __importDefault(require("../utils/ILogger"));
const Logger_1 = __importDefault(require("../utils/Logger"));
const RecordModule_1 = require("../services/record/RecordModule");
const ConfigModule_1 = require("../services/config/ConfigModule");
let ManagerModule = (() => {
    let ManagerModule = class ManagerModule {
    };
    ManagerModule = __decorate([
        common_1.Module({
            imports: [
                MediasoupModule_1.MediasoupModule,
                RecordModule_1.RecordModule,
                ConfigModule_1.ConfigModule,
            ],
            providers: [
                {
                    provide: IMediaManager_1.default,
                    useClass: MediaManager_1.default,
                },
                {
                    provide: ILogger_1.default,
                    useClass: Logger_1.default,
                },
            ],
            exports: [
                IMediaManager_1.default,
            ],
        })
    ], ManagerModule);
    return ManagerModule;
})();
exports.ManagerModule = ManagerModule;
//# sourceMappingURL=ManagerModule.js.map