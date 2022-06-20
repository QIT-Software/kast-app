"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordModule = void 0;
const common_1 = require("@nestjs/common");
const ConfigModule_1 = require("../config/ConfigModule");
const IRecordSevice_1 = __importDefault(require("./IRecordSevice"));
const RecordService_1 = __importDefault(require("./RecordService"));
const config_node_1 = require("@spryrocks/config-node");
const fs = __importStar(require("fs"));
let RecordModule = (() => {
    let RecordModule = class RecordModule {
    };
    RecordModule = __decorate([
        common_1.Module({
            imports: [
                ConfigModule_1.ConfigModule,
            ],
            providers: [
                {
                    inject: [config_node_1.IConfigService],
                    provide: IRecordSevice_1.default,
                    useFactory: (configService) => {
                        const rootDirectory = configService.get('RECORDINGS_ROOT_DIRECTORY');
                        if (!fs.existsSync(rootDirectory))
                            throw new Error(`Recordings directory not exists at '${rootDirectory}'`);
                        return new RecordService_1.default(rootDirectory);
                    },
                },
            ],
            exports: [IRecordSevice_1.default],
        })
    ], RecordModule);
    return RecordModule;
})();
exports.RecordModule = RecordModule;
//# sourceMappingURL=RecordModule.js.map