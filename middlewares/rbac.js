const get = require('lodash.get')

const defaultGetRole = (context) => get(context, 'config.context.user.role')

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
  (serviceContext) => (instanceContext) => {

    context.instanceContext = (action) => {
      const role = getRole(serviceContext)
      return havePermission(roleMap, action, role)
    }

    return next => (...args) => next(...args)
  }

module.exports = rbacMiddleware
