const get = require('lodash.get')

const contextMiddleware = (serviceContext) => {
  const context = get(serviceContext, 'config.context', {})

  return (executionContext) => {
    executionContext.useContext = function () {
      return context
    }

    return next => (...args) => next(...args)
  }
}

module.exports = contextMiddleware

