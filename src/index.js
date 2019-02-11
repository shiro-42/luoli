const compose = require('./compose')

class Luoli {
  constructor () {
    this.plugins = []
    this.prepareContext = this.prepareContext.bind(this)
  }

  use (plugin) {
    this.plugins.push(plugin)
    return this
  }

  // Initialize every plugins
  prepareContext (payload = {}) {
    const baseContext = {}

    const useService = serviceCreator => {
      const serviceContext = { ...baseContext }

      serviceContext.actionName = serviceCreator.name

      const plugins = this.plugins.map(plugin => plugin(serviceContext, payload, baseContext))

      // wrap the context to be sure to not get asynchronous issues
      const getContext = () => serviceContext

      return compose(...plugins)((...args) => {
        return serviceCreator(getContext())(...args)
      })
    }

    baseContext.useService = useService

    return useService
  }
}

module.exports = Luoli
