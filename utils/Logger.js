
const winston = require('winston');
const moment = require('moment');
const DailyRotateFile = require('winston-daily-rotate-file');
const fs = require('fs');

// file size limit 10M
const LOGGER_COMMON_CONFIG = {
    timestamp: moment().format('YYYY-MM-DD HH:mm:ss:SSS'),
    prepend: true,
    datePattern: 'YYYY-MM-DD',
    maxsize: "10m",
    maxFiles: "14d",
    colorize: false,
    json: false,
    handleExceptions: true,
};

class Logger {

    constructor(dir) {
        createDirIfNotExist(dir);
        this.error_logger = generateLogger("error", dir);
        this.debug_logger = generateLogger("debug", dir);
        this.info_logger = generateLogger("info", dir);
        this.warn_logger = generateLogger("warn", dir);

        this.info = this.info.bind(this);
        this.debug = this.debug.bind(this);
        this.warn = this.warn.bind(this);
        this.error = this.error.bind(this);
    }

    info(msg, args) {
        this.info_logger.info(msg, args);
    }
    warn(msg, args) {
        this.warn_logger.warn(msg, args);
    }
    debug(msg, args) {
        this.debug_logger.debug(msg, args);
    }
    error(msg, args) {
        this.error_logger.error(msg, args);
    }

}

function createDirIfNotExist(dir) {
    if (dir && !fs.existsSync(dir)) {
        fs.mkdirSync(dir, {
            recursive: true
        });
    }
}

function generateLogger(level, dir) {
    let transport;
    // output the log to file if provider dir
    if (dir) {
        transport = new DailyRotateFile({
            name: level,
            level: level,
            filename: `${dir}/${level}-%DATE%.log`,
            ...LOGGER_COMMON_CONFIG,
        });
    } else {
        transport = new winston.transports.Console({
            name: level,
            level: level,
            ...LOGGER_COMMON_CONFIG,
            colorize: true,
        });
    }
    const config = {
        level,
        transports: [
            transport
        ],
        exitOnError: false,
    };
    return new winston.Logger(config);
}

module.exports = Logger;