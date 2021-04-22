import bunyan from 'bunyan';

export const log = bunyan.createLogger ({
  name: 'xgstream',
  streams: [{ stream: process.stdout, level: 'info' }],
});
