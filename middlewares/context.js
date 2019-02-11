const contextMiddleware = (config, context, initialContext) => next => async (...args) => {
  context.user = config.user
  context.useContext = function () {
    return context
  }
  context.updateContext = function (changes) {
    Object.assign(initialContext, changes)
  }

  const res = await next(...args)
  return res
}

module.exports = contextMiddleware
