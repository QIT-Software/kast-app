"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const pdfmake_1 = __importDefault(require("pdfmake"));
const fs_1 = __importDefault(require("fs"));
const uuid_1 = require("uuid");
let PdfService = class PdfService {
    async createPdfResume(user, resume, link) {
        const fonts1 = {
            Roboto: {
                normal: './fonts/Roboto-Regular.ttf',
                bold: './fonts/Roboto-Medium.ttf',
                italics: './fonts/Roboto-Italic.ttf',
                bolditalics: './fonts/Roboto-MediumItalic.ttf',
            },
        };
        const printer = new pdfmake_1.default(fonts1);
        const docDefinition = {
            content: [
                {
                    text: 'Avikast Resume',
                    style: 'watermark',
                },
                { text: `${user.name} Resume`, style: 'header' },
                { text: `Summary`, style: 'subheader' },
                { text: `${resume.summary}`, style: 'text' },
                { text: `Education`, style: 'subheader' },
                { text: `${resume.education}`, style: 'text' },
                { text: `Experience`, style: 'subheader' },
                { text: `${resume.experience}`, style: 'text' },
                { text: `Awards`, style: 'subheader' },
                { text: `${resume.awards}`, style: 'text' },
                {
                    text: 'Render in avikast.com',
                    style: 'sign',
                },
            ],
            styles: {
                watermark: {
                    fontSize: 12,
                    color: '#C82FC6',
                    alignment: 'right',
                },
                header: {
                    fontSize: 30,
                    bold: true,
                    color: 'blue',
                    alignment: 'center',
                    marginBottom: 25,
                },
                subheader: {
                    fontSize: 24,
                    bold: true,
                    color: 'black',
                    marginLeft: 20,
                },
                text: {
                    fontSize: 18,
                    marginBottom: 50,
                },
            },
        };
        const pdfDoc = printer.createPdfKitDocument(docDefinition);
        pdfDoc.end();
        const fileName = uuid_1.v4();
        await pdfDoc.pipe(fs_1.default.createWriteStream(`../files/${link}`));
        return fileName;
    }
};
PdfService = __decorate([
    common_1.Injectable()
], PdfService);
exports.PdfService = PdfService;
//# sourceMappingURL=PdfService.js.map