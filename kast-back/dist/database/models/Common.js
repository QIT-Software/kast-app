"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.createSchema = (name, definition) => ({
    name,
    schema: new mongoose_1.Schema(definition),
});
//# sourceMappingURL=Common.js.map