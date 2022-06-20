"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const operators_1 = require("rxjs/operators");
const ErrorUtils_1 = require("../utils/ErrorUtils");
class ApiExceptionInterceptor {
    intercept(context, next) {
        return next.handle().pipe(operators_1.catchError(ErrorUtils_1.processError));
    }
}
exports.ApiExceptionInterceptor = ApiExceptionInterceptor;
//# sourceMappingURL=ApiExceptionInterceptor.js.map