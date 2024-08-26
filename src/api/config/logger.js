'use strict';
Object.defineProperty(exports, '__esModule', {value: true});
exports.logger = void 0;
var winston_1 = require('winston');
var combine = winston_1.format.combine,
  timestamp = winston_1.format.timestamp,
  label = winston_1.format.label,
  printf = winston_1.format.printf,
  colorize = winston_1.format.colorize;
var appFormat = printf(function (_a) {
  var level = _a.level,
    message = _a.message,
    timestamp = _a.timestamp;
  return ''.concat(timestamp, ' ').concat(level, ': ').concat(message);
});
exports.logger = winston_1.createLogger({
  level: 'info',
  format: combine(
    colorize(),
    label({label: 'hobbyist-API'}),
    timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
    appFormat,
  ),
  transports: [
    new winston_1.transports.Console()
    // new winston_1.transports.File({filename: 'combined.log'}),
  ],
});
