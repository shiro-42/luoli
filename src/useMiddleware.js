/**
 * useMiddleware
 *
 * @param config={}    the configuration object passed to every middlewares
 * @param enhancer     the function enhancer
 * @returns {Function} the function used to decorate your desired function
 */
function useMiddleware (config = {}, enhancer) {
  const serviceContext = { config }

  // Initialize enhancer with the serviceContext
  const contextifiedEnhancer = enhancer(serviceContext)

  const useService = (serviceCreator, parentContext) => (...args) => {
    const actionName = serviceCreator.name
    const instanceContext = { ...serviceContext, actionName }

    if (parentContext) {
      instanceContext.parent = parentContext
    }

    instanceContext.useService = (sCreator) => useService(sCreator, instanceContext)

    return contextifiedEnhancer(instanceContext, {})(serviceCreator(instanceContext))(...args)
  }

  return useService
}

module.exports = useMiddleware
