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
const Room_1 = require("../../../entities/Room");
const User_1 = __importDefault(require("../user/User"));
graphql_1.registerEnumType(Room_1.RoomType, { name: 'RoomType' });
let Room = class Room {
    constructor(id, closed, name, inviteLink, type, user) {
        this.id = id;
        this.closed = closed;
        this.name = name;
        this.inviteLink = inviteLink;
        this.type = type;
        this.user = user;
    }
};
__decorate([
    graphql_1.Field(() => graphql_1.ID),
    __metadata("design:type", String)
], Room.prototype, "id", void 0);
__decorate([
    graphql_1.Field(() => Date, { nullable: true }),
    __metadata("design:type", Object)
], Room.prototype, "closed", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], Room.prototype, "name", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], Room.prototype, "inviteLink", void 0);
__decorate([
    graphql_1.Field(() => Room_1.RoomType),
    __metadata("design:type", String)
], Room.prototype, "type", void 0);
__decorate([
    graphql_1.Field(() => User_1.default),
    __metadata("design:type", User_1.default)
], Room.prototype, "user", void 0);
Room = __decorate([
    graphql_1.ObjectType(),
    __metadata("design:paramtypes", [String, Object, String, String, String, User_1.default])
], Room);
exports.default = Room;
//# sourceMappingURL=Room.js.map