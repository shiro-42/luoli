const defaultFormat = x => x

const formatDate = date => {

  return (new Date()).toString().slice(16, 24)
}

const loggerMiddleware = (logger, format = defaultFormat) =>
  (_, context) => next => async (...args) => {
    const start = new Date()
    logger.log(`[${formatDate(start)}] - ${context.actionName} ->`)
    try {
      const res = await next(...args)
      const end = new Date()
      logger.log(`[${formatDate(end)}] - ${context.actionName} \x1b[32m<-\x1b[0m`)
      return res
    } catch (err) {
      logger.error(`[${formatDate(end)}] - ${context.actionName} \x1b[31m<-\x1b[0m`)
      throw err
    }
  }

module.exports = loggerMiddleware
