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
const AvikastFile_1 = require("../../entities/AvikastFile");
const UserModel_1 = require("./UserModel");
const FileModel_1 = __importStar(require("./FileModel"));
const schemaName = 'avikastFile';
exports.AvikastFileSchema = Common_1.createSchema(schemaName, {
    name: { type: String, required: true },
    type: { type: AvikastFile_1.AvikastFileType, enum: AvikastFile_1.AvikastFileType, required: true },
    user: { type: String, ref: UserModel_1.UserSchema.name, required: true },
    file: { type: String, ref: FileModel_1.FileSchema.name },
    parent: { type: String, ref: schemaName },
});
//# sourceMappingURL=AvikastFileModel.js.map