/**
 * useMiddleware
 *
 * @param config={}    the configuration object passed to every middlewares
 * @param enhancer     the function enhancer
 * @returns {Function} the function used to decorate your desired function
 */
function useMiddleware (context = {}, enhancer) {
  const serviceContext = { context }

  // Initialize enhancer with the serviceContext
  const contextifiedEnhancer = enhancer(serviceContext)

  const useService = serviceCreator => (...args) => {
    const actionName = serviceCreator.name
    const instanceContext = { ...serviceContext, actionName }

    // instanceContext.useService = (sCreator) => useService(sCreator, instanceContext)

    return contextifiedEnhancer(instanceContext)(serviceCreator(instanceContext))(...args)
  }

  serviceContext.useService = useService

  return useService
}


module.exports = useMiddleware
