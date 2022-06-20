"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Common_1 = require("./Common");
const UserModel_1 = __importStar(require("./UserModel"));
const schemaName = 'resume';
exports.ResumeSchema = Common_1.createSchema(schemaName, {
    summary: { type: String, required: false },
    experience: { type: String, required: false },
    education: { type: String, required: false },
    awards: { type: String, required: false },
    user: { type: String, ref: UserModel_1.UserSchema.name },
    fileName: { type: String, required: false },
});
//# sourceMappingURL=ResumeModel.js.map