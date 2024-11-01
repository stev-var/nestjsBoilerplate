import { Logger } from '@nestjs/common';
const logger = new Logger();

export function infoLoggger(message: string) {
  logger.log(message);
}

export function warningLoggger(message: string) {
  logger.warn(message);
}

export function errorLoggger(message: string) {
  logger.error(message);
}

export function debugLoggger(message: string) {
  logger.debug(message);
}

export function verboseLoggger(message: string) {
  logger.verbose(message);
}
