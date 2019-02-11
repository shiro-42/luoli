const compose = require('./compose')

function applyMiddleware(...middlewares) {
  return (...args) => {
    const chain = middlewares.map(plugin => plugin(...args))

    return compose(...chain)
  }
}

module.exports = applyMiddleware
