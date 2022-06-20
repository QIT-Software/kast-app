"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const IPdfService_1 = require("./IPdfService");
const PdfService_1 = require("./PdfService");
let PdfModule = class PdfModule {
};
PdfModule = __decorate([
    common_1.Module({
        imports: [],
        providers: [
            {
                provide: IPdfService_1.IPdfService,
                useClass: PdfService_1.PdfService,
            },
        ],
        exports: [IPdfService_1.IPdfService],
    })
], PdfModule);
exports.PdfModule = PdfModule;
//# sourceMappingURL=PdfModule.js.map