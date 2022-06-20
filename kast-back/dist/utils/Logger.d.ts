import ILogger from './ILogger';
export default class Logger extends ILogger {
    logger(message: string, info: string): void;
}
