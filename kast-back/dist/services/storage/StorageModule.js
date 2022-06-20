"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const ConfigModule_1 = require("../config/ConfigModule");
const config_node_1 = require("@spryrocks/config-node");
const file_storage_1 = require("@spryrocks/file-storage");
let StorageModule = class StorageModule {
};
StorageModule = __decorate([
    common_1.Module({
        imports: [ConfigModule_1.ConfigModule],
        providers: [
            {
                inject: [config_node_1.IConfigService],
                provide: file_storage_1.IFileStorage,
                useFactory: (configService) => {
                    const rootDirectory = configService.get('FILE_STORAGE_ROOT_DIRECTORY');
                    return new file_storage_1.FileStorage({ rootDirectory });
                },
            },
        ],
        exports: [
            file_storage_1.IFileStorage,
        ],
    })
], StorageModule);
exports.StorageModule = StorageModule;
//# sourceMappingURL=StorageModule.js.map