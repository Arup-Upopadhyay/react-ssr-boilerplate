import appRoot from 'app-root-path';
import winston from'winston';

// define the custom settings for each transport (file, console)
const options = {
  file: {
    level: 'info',
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 100,
    colorize: true,
  },
  errorFile: {
    level: 'error',
    name: 'file.error',
    filename: `${appRoot}/logs/error.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 100,
    colorize: true,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};


// instantiate a new Winston Logger with the settings defined above
const logger = winston.createLogger({
  level: 'debug',
  transports: [
      new (winston.transports.Console)(options.console),
      new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize({all: true}),
                winston.format.printf(
                    info => `${info.timestamp} - ${info.level}: ${info.message}`
                ),
                winston.format.timestamp(),
                winston.format.simple()
            )
      }),
      new (winston.transports.File)(options.errorFile),
      new (winston.transports.File)(options.file)
  ],
  exitOnError: false, // do not exit on handled exceptions
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write: function(message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message);
  },
};

export default logger;
