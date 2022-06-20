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
const UserModel_1 = require("./UserModel");
const FileModel_1 = __importStar(require("./FileModel"));
const schemaName = 'record';
exports.RecordSchema = Common_1.createSchema(schemaName, {
    id: { type: String, required: true },
    name: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: false },
    user: { type: String, ref: UserModel_1.UserSchema.name },
    file: { type: String, ref: FileModel_1.FileSchema.name },
});
//# sourceMappingURL=RecordModel.js.map