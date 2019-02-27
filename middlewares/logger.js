const defaultFormat = x => x

const getPrettyDate = () => (new Date()).toString().slice(16, 24)

const loggerMiddleware = (logger, format = defaultFormat) =>
  () => (context) => next => async (...args) => {
    logger.log(`[${getPrettyDate()}] - ${context.actionName} ->`)
    try {
      const res = await next(...args)

      logger.log(`[${getPrettyDate()}] - ${context.actionName} \x1b[32m<-\x1b[0m`)
      return res
    } catch (err) {
      logger.error(`[${getPrettyDate()}] - ${context.actionName} \x1b[31m<-\x1b[0m`)
      throw err
    }
  }

module.exports = loggerMiddleware
