import moment from 'moment'
import winston from 'winston'

const formatDate = function () {
  return moment(new Date()).format('DD-MM-YYYY')
}

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.prettyPrint()
  ),
  transports: [
    new winston.transports.Console({
      colorize: true,
      level: 'info'
    }),
    new winston.transports.File({
      filename: `logs/${formatDate()}.err`,
      level: 'error'
    })
  ]
})

/**
 * Handled Logger in logErrors
 * @param {Request} err
 * @param {Request} req
 * @param {Response} res
 * @param next
 */
export function logErrors (err, req, res, next) {
  logger['error']({
    code: err.code || err.status || 500,
    message: err.customMessage || err.message,
    error: err.message,
    endpoint: req.url,
    client: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    headers: req.headers,
    params: req.params,
    query: req.query,
    stack: err.stack
  })

  next(err)
}

/**
 * Handled Error and Response interceptor
 * @param {Request} err
 * @param {Request} req
 * @param {Response} res
 * @param next
 */
export function errorHandler (err, req, res, next) {
  // catch errors while streaming
  if (res.headersSent) {
    next(err)
  }
  res.status(err.code || err.status || 500).send({
    code: err.code ? err.code : 500,
    status: 'error',
    message:
      err.customMessage || err.message || 'No se pudo completar la solicitud',
    warning: [],
    error: err.code ? [] : err.customMessage ? [] : err
  })
}

/**
 * Handled Page Not Found
 * @param {Request} req
 * @param {Response} res
 */
export function notFound (req, res) {
  res.status(404).send({
    code: 404,
    status: 'error',
    message: 'Not Found'
  })
}
