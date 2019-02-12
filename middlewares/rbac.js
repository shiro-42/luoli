const defaultGetRole = (context) => context
  ? context.user
    ? context.user.role
    : undefined
  : undefined

function havePermission(roleMap, action, role) {
  return roleMap[role].includes(action)
}

/**
 *
 * const roleMap = {
 *  ADMIN: [
 *    'create user',
 *    'update user',
 *    'read user'
 *  ],
 *  CLIENT: [
 *    'read user'
 *  ]
 * }
 *
 */
const rbacMiddleware = (roleMap, getRole = defaultGetRole) =>
  (config, context, base) => next => async (...args) => {

    context.usePermission = (action) => {
      const role = getRole(context)
      return havePermission(roleMap, action, role)
    }

    const res = await next(...args)

    return res
  }

module.exports = rbacMiddleware
