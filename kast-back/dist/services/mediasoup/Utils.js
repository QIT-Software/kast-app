"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function requireResult(value) {
    if (value === undefined)
        throw new Error('Empty result');
    return value;
}
exports.requireResult = requireResult;
function getNameAsDate() {
    const date = new Date(Date.now());
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDay();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    return `${year}.${month}.${day}-${hour}:${minute}:${second}`;
}
exports.getNameAsDate = getNameAsDate;
//# sourceMappingURL=Utils.js.map