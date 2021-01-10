import bunyan from 'bunyan';

export const LogService = bunyan.createLogger ({
  name: 'xgstream',
  streams: [{ stream: process.stdout, level: 'debug' }],
});
