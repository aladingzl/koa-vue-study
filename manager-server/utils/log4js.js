/**
 * 日志存储
 */
const log4js = require('log4js');

const levels = {
  'trace': log4js.levels.TRACE,
  'debug': log4js.levels.DEBUG,
  'info': log4js.levels.INFO,
  'warn': log4js.levels.WARN,
  'error': log4js.levels.ERROR,
  'fatal': log4js.levels.FATAL,
}

log4js.configure({
  appenders: {
    console: { type: 'console' },
    info: {
      type: 'file',
      filename: 'logs/all-logs.log'
    },
    error: {
      type: 'dateFile',
      filename: 'logs/log',
      pattern: 'yyyy-MM-dd.log',
      alwaysIncludePattern: true
    }
  },
  categories: {
    default: {
      appenders: [ 'console' ],
      level: 'debug'
    },
    info: {
      appenders: [ 'info', 'console' ],
      level: 'info'
    },
    error: {
      appenders: [ 'error', 'console' ],
      level: 'error'
    }
  }
})

/**
 * 日志输出，level 为 debug
 */
exports.debug = (content) => {
  let logger = log4js.getLogger();
  logger.level = levels.debug;
  logger.debug(content);
}

/**
 * 日志输出，level 为 info
 */
exports.info = (content) => {
  let logger = log4js.getLogger();
  logger.level = levels.info;
  logger.info(content);
}

/**
 * 日志输出，level 为 error
 */
exports.error = (content) => {
  let logger = log4js.getLogger();
  logger.level = levels.error;
  logger.error(content);
}