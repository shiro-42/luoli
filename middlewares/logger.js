const defaultFormat = x => x

const loggerMiddleware = (logger, format = defaultFormat) =>
  (_, context) => next => async (...args) => {
    logger.log(`${context.actionName} ->`)
    try {
      const res = await next(...args)
      logger.log(`${context.actionName} \x1b[32m<-\x1b[0m`)
      return res
    } catch (err) {
      logger.error(`${context.actionName} \x1b[31m<-\x1b[0m`)
      throw err
    }
  }

module.exports = loggerMiddleware
