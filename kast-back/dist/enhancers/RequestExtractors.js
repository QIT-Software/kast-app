"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("@nestjs/graphql");
const AuthorizationHeader = 'Authorization';
const AppHeader = 'App';
const PlatformHeader = 'Platform';
function getRequest(context) {
    let request = context.switchToHttp().getRequest();
    if (request)
        return request;
    const gqlContext = graphql_1.GqlExecutionContext.create(context);
    request = gqlContext.getContext().req;
    return request;
}
exports.getRequest = getRequest;
function getHeader(context, header) {
    const request = getRequest(context);
    if (!request)
        return undefined;
    return request.header(header);
}
function extractJwtFromContext(context) {
    return getHeader(context, AuthorizationHeader);
}
exports.extractJwtFromContext = extractJwtFromContext;
function extractAppFromContext(context) {
    return getHeader(context, AppHeader);
}
exports.extractAppFromContext = extractAppFromContext;
function extractPlatformHeaderFromContext(context) {
    return getHeader(context, PlatformHeader);
}
exports.extractPlatformHeaderFromContext = extractPlatformHeaderFromContext;
//# sourceMappingURL=RequestExtractors.js.map