/* eslint-disable no-console,class-methods-use-this */

import ILogger from 'utils/IMyLogger';

export default class MyLogger extends ILogger {
  logger(message: string, info: string) {
    console.log(`${message} ${info}`);
  }
}
