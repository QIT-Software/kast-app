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
let Preferences = class Preferences {
    constructor(allowNotifications) {
        this.allowNotifications = allowNotifications;
    }
};
__decorate([
    graphql_1.Field(() => Boolean),
    __metadata("design:type", Boolean)
], Preferences.prototype, "allowNotifications", void 0);
Preferences = __decorate([
    graphql_1.ObjectType(),
    __metadata("design:paramtypes", [Boolean])
], Preferences);
exports.default = Preferences;
//# sourceMappingURL=Preferences.js.map