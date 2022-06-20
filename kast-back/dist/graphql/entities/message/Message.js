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
let Message = class Message {
    constructor(id, sender, roomId, body, date, receiverId) {
        this.id = id;
        this.sender = sender;
        this.roomId = roomId;
        this.body = body;
        this.date = date;
        this.receiverId = receiverId;
    }
};
__decorate([
    graphql_1.Field(() => graphql_1.ID),
    __metadata("design:type", String)
], Message.prototype, "id", void 0);
__decorate([
    graphql_1.Field(() => User_1.default),
    __metadata("design:type", User_1.default)
], Message.prototype, "sender", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], Message.prototype, "roomId", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], Message.prototype, "body", void 0);
__decorate([
    graphql_1.Field(() => Date),
    __metadata("design:type", Date)
], Message.prototype, "date", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", Object)
], Message.prototype, "receiverId", void 0);
Message = __decorate([
    graphql_1.ObjectType(),
    __metadata("design:paramtypes", [String, User_1.default, String, String, Date, Object])
], Message);
exports.default = Message;
//# sourceMappingURL=Message.js.map