import AppType from 'entities/AppType';
import { Platform } from 'entities/Platform';
export interface HttpRequestInfo {
    baseUrl: string;
    appType: AppType;
    platform: Platform;
}
declare const _default: (...dataOrPipes: any[]) => ParameterDecorator;
export default _default;
