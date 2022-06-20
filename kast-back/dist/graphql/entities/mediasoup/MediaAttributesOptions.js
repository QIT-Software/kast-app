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
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("@nestjs/graphql");
const Mediasoup_1 = require("../../../entities/Mediasoup");
graphql_1.registerEnumType(Mediasoup_1.MediaKind, { name: 'MediaKind' });
graphql_1.registerEnumType(Mediasoup_1.MediaType, { name: 'MediaType' });
let MediaAttributesOptions = class MediaAttributesOptions {
    constructor(kind, mediaType, direction) {
        this.kind = kind;
        this.mediaType = mediaType;
        this.direction = direction;
    }
};
__decorate([
    graphql_1.Field(() => Mediasoup_1.MediaKind),
    __metadata("design:type", String)
], MediaAttributesOptions.prototype, "kind", void 0);
__decorate([
    graphql_1.Field(() => Mediasoup_1.MediaType),
    __metadata("design:type", String)
], MediaAttributesOptions.prototype, "mediaType", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], MediaAttributesOptions.prototype, "direction", void 0);
MediaAttributesOptions = __decorate([
    graphql_1.InputType(),
    __metadata("design:paramtypes", [String, String, String])
], MediaAttributesOptions);
exports.default = MediaAttributesOptions;
//# sourceMappingURL=MediaAttributesOptions.js.map