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
const graphql_1 = require("@nestjs/graphql");
const User_1 = __importDefault(require("../user/User"));
const AvikastFile_1 = require("../../../entities/AvikastFile");
graphql_1.registerEnumType(AvikastFile_1.AvikastFileType, { name: 'AvikastFileType' });
let AvikastFile = class AvikastFile {
    constructor(id, name, user, type) {
        this.id = id;
        this.name = name;
        this.user = user;
        this.type = type;
    }
};
__decorate([
    graphql_1.Field(() => graphql_1.ID),
    __metadata("design:type", String)
], AvikastFile.prototype, "id", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], AvikastFile.prototype, "name", void 0);
__decorate([
    graphql_1.Field(() => User_1.default),
    __metadata("design:type", User_1.default)
], AvikastFile.prototype, "user", void 0);
__decorate([
    graphql_1.Field(() => AvikastFile_1.AvikastFileType),
    __metadata("design:type", String)
], AvikastFile.prototype, "type", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", Object)
], AvikastFile.prototype, "fileId", void 0);
AvikastFile = __decorate([
    graphql_1.ObjectType(),
    __metadata("design:paramtypes", [String, String, User_1.default, String])
], AvikastFile);
exports.default = AvikastFile;
//# sourceMappingURL=AvikastFile.js.map