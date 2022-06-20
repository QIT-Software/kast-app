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
const graphql_type_json_1 = __importDefault(require("graphql-type-json"));
let ConsumerOptions = class ConsumerOptions {
    constructor(id, producerId, rtpParameters, appData) {
        this.id = id;
        this.producerId = producerId;
        this.rtpParameters = rtpParameters;
        this.appData = appData;
    }
};
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], ConsumerOptions.prototype, "id", void 0);
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], ConsumerOptions.prototype, "producerId", void 0);
__decorate([
    graphql_1.Field(() => graphql_type_json_1.default),
    __metadata("design:type", Object)
], ConsumerOptions.prototype, "rtpParameters", void 0);
__decorate([
    graphql_1.Field(() => graphql_type_json_1.default),
    __metadata("design:type", Object)
], ConsumerOptions.prototype, "appData", void 0);
ConsumerOptions = __decorate([
    graphql_1.ObjectType(),
    __metadata("design:paramtypes", [String, String, Object, Object])
], ConsumerOptions);
exports.default = ConsumerOptions;
//# sourceMappingURL=ConsumerOptions.js.map