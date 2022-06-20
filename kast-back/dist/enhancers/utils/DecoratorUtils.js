"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const RequestExtractors_1 = require("../RequestExtractors");
exports.createParamDecorator = (func) => {
    return common_1.createParamDecorator((data, context) => {
        const request = RequestExtractors_1.getRequest(context);
        if (!request)
            throw new Error('Request cannot be undefined');
        return func(request);
    });
};
//# sourceMappingURL=DecoratorUtils.js.map