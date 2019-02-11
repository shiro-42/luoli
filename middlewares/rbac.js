const defaultGetRole = (context) => context
  ? context.user
    ? context.user.role
    : undefined
  : undefined

const rbacMiddleware = (roleMap, getRole = defaultGetRole) =>
  (context, initialize, base) => next => async (...args) => {
    context.usePermission = (action) => {

    }

    const res = await next(...args)

    return res
  }

module.exports = rbacMiddleware