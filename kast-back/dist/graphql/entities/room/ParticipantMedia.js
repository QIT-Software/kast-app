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
const ParticipantTrackOptions_1 = __importDefault(require("./ParticipantTrackOptions"));
let ParticipantMedia = class ParticipantMedia {
    constructor(userName, audio, video, screen) {
        this.userName = userName;
        this.audio = audio;
        this.video = video;
        this.screen = screen;
    }
};
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], ParticipantMedia.prototype, "userName", void 0);
__decorate([
    graphql_1.Field(() => ParticipantTrackOptions_1.default),
    __metadata("design:type", ParticipantTrackOptions_1.default)
], ParticipantMedia.prototype, "audio", void 0);
__decorate([
    graphql_1.Field(() => ParticipantTrackOptions_1.default),
    __metadata("design:type", ParticipantTrackOptions_1.default)
], ParticipantMedia.prototype, "video", void 0);
__decorate([
    graphql_1.Field(() => ParticipantTrackOptions_1.default),
    __metadata("design:type", ParticipantTrackOptions_1.default)
], ParticipantMedia.prototype, "screen", void 0);
ParticipantMedia = __decorate([
    graphql_1.ObjectType(),
    __metadata("design:paramtypes", [String, ParticipantTrackOptions_1.default,
        ParticipantTrackOptions_1.default,
        ParticipantTrackOptions_1.default])
], ParticipantMedia);
exports.default = ParticipantMedia;
//# sourceMappingURL=ParticipantMedia.js.map