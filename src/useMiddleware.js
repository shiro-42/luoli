function useMiddleware (config = {}, enhancer) {
  const initialContext = {}

  if (!enhancer) {
    enhancer = () => fn => fn
  }

  if (enhancer && arguments[3]) {
    throw new Error(
      'It looks like you are passing several store enhancers to ' +
        'useMiddleware(). This is not supported. Instead, compose them ' +
        'together to a single function'
    )
  }

  if (typeof enhancer !== 'function') {
    throw new Error('Expected the enhancer to be a function.')
  }

  const useService = serviceCreator => {
    const instanceContext = { ...initialContext }

    instanceContext.actionName = serviceCreator.name

    // wrap the context to be sure to not get asynchronous issues
    const getContext = () => instanceContext

    return enhancer(config, instanceContext, initialContext)(
      (...args) => serviceCreator(getContext())(...args)
    )
  }

  initialContext.useService = useService

  return useService
}

module.exports = useMiddleware
