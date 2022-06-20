"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseEntity = void 0;
const Utils_1 = require("./Utils");
class BaseEntity {
    matchAppData(filter) {
        return Utils_1.matchAppData(this.appData, filter);
    }
}
exports.BaseEntity = BaseEntity;
//# sourceMappingURL=BaseEntity.js.map