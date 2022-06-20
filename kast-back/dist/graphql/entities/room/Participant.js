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
const Participant_1 = require("../../../entities/Participant");
const User_1 = __importDefault(require("../user/User"));
const ParticipantMedia_1 = __importDefault(require("./ParticipantMedia"));
graphql_1.registerEnumType(Participant_1.ParticipantRole, { name: 'ParticipantRole' });
let Participant = class Participant {
    constructor(id, user, role, media, raiseHand, kicked, muted) {
        this.id = id;
        this.user = user;
        this.role = role;
        this.media = media;
        this.raiseHand = raiseHand;
        this.kicked = kicked;
        this.muted = muted;
    }
};
__decorate([
    graphql_1.Field(() => graphql_1.ID),
    __metadata("design:type", String)
], Participant.prototype, "id", void 0);
__decorate([
    graphql_1.Field(() => User_1.default),
    __metadata("design:type", User_1.default)
], Participant.prototype, "user", void 0);
__decorate([
    graphql_1.Field(() => Participant_1.ParticipantRole),
    __metadata("design:type", String)
], Participant.prototype, "role", void 0);
__decorate([
    graphql_1.Field(() => ParticipantMedia_1.default),
    __metadata("design:type", ParticipantMedia_1.default)
], Participant.prototype, "media", void 0);
__decorate([
    graphql_1.Field(() => Boolean, { nullable: true }),
    __metadata("design:type", Object)
], Participant.prototype, "raiseHand", void 0);
__decorate([
    graphql_1.Field(() => Boolean),
    __metadata("design:type", Boolean)
], Participant.prototype, "kicked", void 0);
__decorate([
    graphql_1.Field(() => Boolean),
    __metadata("design:type", Boolean)
], Participant.prototype, "muted", void 0);
Participant = __decorate([
    graphql_1.ObjectType(),
    __metadata("design:paramtypes", [String, User_1.default, String, ParticipantMedia_1.default, Object, Boolean, Boolean])
], Participant);
exports.default = Participant;
//# sourceMappingURL=Participant.js.map