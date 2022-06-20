"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EmailMessage_1 = __importDefault(require("../../emailSender/EmailMessage"));
function createNewPasswordMessage(newPassword) {
    return {
        template: 'NewPassword',
        subject: 'Avikast - New Password',
        context: {
            newPassword,
        },
    };
}
exports.createNewPasswordMessage = createNewPasswordMessage;
function createSuccessRegistrationMessage(userName) {
    return {
        template: 'NewUser',
        subject: `Avikast - Welcome in our service`,
        context: {
            userName,
        },
    };
}
exports.createSuccessRegistrationMessage = createSuccessRegistrationMessage;
//# sourceMappingURL=EmailMessages.js.map