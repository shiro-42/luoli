const get = require('lodash.get')

const defaultGetRole = (context) => get(context, 'config.context.role')

function havePermission (roleMap = {}, action, role) {
  const permissions = roleMap[role]

  if (permissions && permissions.includes(action)) return true
  throw new Error(`Permission ${action} denied`)
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
  (serviceContext) => (instanceContext) => {
    instanceContext.usePermission = (action) => {
      const role = getRole(serviceContext)
      return havePermission(roleMap, action, role)
    }

    return next => (...args) => next(...args)
  }

module.exports = rbacMiddleware
