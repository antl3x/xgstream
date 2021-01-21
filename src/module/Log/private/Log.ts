import bunyan from 'bunyan';

const LogService = bunyan.createLogger ({
  name: 'xgstream',
  streams: [{ stream: process.stdout, level: 'info' }],
});

export const logInfo = LogService.info.bind (LogService);
export const logError = LogService.error.bind (LogService);
export const logWarn = LogService.warn.bind (LogService);
export const logDebug = LogService.debug.bind (LogService);
export const logChild = LogService.child.bind (LogService);
