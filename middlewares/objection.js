const { transaction } = require('objection')

const loggerMiddleware = (knex) =>
  (config, context) => next => async (...args) => {
    context.models = context.models || config.models

    /**
     * @param {objection.Model} The models you want to eventually bind to the current Transaction
     *
     * @returns {[objection.Model]}
     */
    context.useModels = (...models) => {
      if (context.transaction) {
        return models.map(model => model.bindTransaction(context.transaction))
      }
      return models
    }

    /**
     * Start a new transaction and store inside the context
     *
     * @returns {transaction}
     */
    context.useTransaction = async () => {
      const trx = await transaction.start(knex)

      context.trx = trx

      return trx
    }

    const res = await next(...args)

    return res
  }

module.exports = loggerMiddleware
