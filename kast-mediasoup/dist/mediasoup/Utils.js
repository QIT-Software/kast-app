"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFromArray = exports.matchAppData = void 0;
exports.matchAppData = (appData, filter) => {
    for (const filterKey in filter) {
        if (filter[filterKey] !== appData[filterKey])
            return false;
    }
    return true;
};
exports.removeFromArray = (array, item) => {
    const index = array.indexOf(item);
    if (index < 0)
        throw new Error('Item not fount');
    array.splice(index, 1);
};
//# sourceMappingURL=Utils.js.map