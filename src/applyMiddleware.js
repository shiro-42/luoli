const compose = require('./compose')

function applyMiddleware(...middlewares) {
  return (...args) => {
    // apply the service context
    const chain = middlewares.map(plugin => plugin(...args))

    return (...args2) => {
      // apply the instance context
      const chain2 = chain.map(plugin => plugin(...args2))
      return compose(...chain2)
    }
  }
}

module.exports = applyMiddleware
