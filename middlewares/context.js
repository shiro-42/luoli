const contextMiddleware = (context, initialize, base) => next => async (...args) => {
  context.user = initialize.user
  context.useContext = function () {
    return context
  }
  context.updateContext = function (changes) {
    Object.assign(base, changes)
  }
  // context.useContext = context.useContext.bind(context)
  const res = await next(...args)
  return res
}

module.exports = contextMiddleware
