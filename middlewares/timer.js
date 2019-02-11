const loggerMiddleware = (_, context) => next => async (...args) => {
  var hrtime = process.hrtime()
  const start = ((hrtime[0] * 1e9) + hrtime[1]) / 1e6

  try {
    const res = await next(...args)

    hrtime = process.hrtime()
    const end = ((hrtime[0] * 1e9) + hrtime[1]) / 1e6

    console.log(`${context.actionName}: ` + (end - start).toFixed(2) + ' ms')

    return res
  } catch (err) {
    throw err
  }
}

module.exports = loggerMiddleware
