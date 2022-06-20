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
const Mediasoup_1 = require("../../../entities/Mediasoup");
const graphql_type_json_1 = __importDefault(require("graphql-type-json"));
graphql_1.registerEnumType(Mediasoup_1.MediaKind, { name: 'MediaKind' });
graphql_1.registerEnumType(Mediasoup_1.MediaType, { name: 'MediaType' });
let ParticipantTrackOptions = class ParticipantTrackOptions {
    constructor(enabled, muted, clientId, userId, producerOptions, mediaKind, mediaType) {
        this.enabled = enabled;
        this.muted = muted;
        this.clientId = clientId;
        this.userId = userId;
        this.producerOptions = producerOptions;
        this.mediaKind = mediaKind;
        this.mediaType = mediaType;
    }
};
__decorate([
    graphql_1.Field(() => Boolean),
    __metadata("design:type", Boolean)
], ParticipantTrackOptions.prototype, "enabled", void 0);
__decorate([
    graphql_1.Field(() => Boolean),
    __metadata("design:type", Boolean)
], ParticipantTrackOptions.prototype, "muted", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", Object)
], ParticipantTrackOptions.prototype, "clientId", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", Object)
], ParticipantTrackOptions.prototype, "userId", void 0);
__decorate([
    graphql_1.Field(() => graphql_type_json_1.default, { nullable: true }),
    __metadata("design:type", Object)
], ParticipantTrackOptions.prototype, "producerOptions", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", Object)
], ParticipantTrackOptions.prototype, "mediaKind", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", Object)
], ParticipantTrackOptions.prototype, "mediaType", void 0);
ParticipantTrackOptions = __decorate([
    graphql_1.ObjectType(),
    __metadata("design:paramtypes", [Boolean, Boolean, Object, Object, Object, Object, Object])
], ParticipantTrackOptions);
exports.default = ParticipantTrackOptions;
//# sourceMappingURL=ParticipantTrackOptions.js.map