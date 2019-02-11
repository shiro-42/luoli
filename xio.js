const { useMiddleware, applyMiddleware } = require('.')
const contextMiddleware = require('./middlewares/context')
const rbacMiddleware = require('./middlewares/rbac')
const loggerMiddleware = require('./middlewares/logger')

function UserModel() {
  const userData = { name: 'Luo li' }
  return {
    find() {
      return userData
    },
    update(payload) {
      return { userData, ...payload }
    }
  }
}

const LogUser = ({ useContext }) => (id) => {
  const context = useContext()

  console.log(context)

  console.log('hey')
}

const LogCtx = ({ useContext, useService, updateContext }) => async (id) => {
  const context = useContext()

  updateContext({ someData: 2 })

  console.log(context)
  const logUser = useService(LogUser)

  console.log(useService)

  await logUser()
  console.log('JJJ')
}

const UpdateUser = ({ useContext, useService }) => async (id, payload) => {
  const context = useContext()

  // const logUser = useService(LogUser)
  const logCtx = useService(LogCtx)

  // await logUser(2)
  await logCtx()

  console.log(context)

  return 1

  // const { User: UserModel } = useModel()

  // usePermission('update user', user)

  // const doesExist = UserModel.find({ id })

  // if (!doesExist) throw new NotFoundError('User', id)

  // const updatedUser = UserModel.update(payload)

  // return updatedUser
}

const enhancer = applyMiddleware(contextMiddleware, loggerMiddleware(console))

const main = async () => {
  const config = { user: { role: 'ADMIN' } }

  const useService = useMiddleware(config, enhancer)

  const updateUser = useService(UpdateUser)

  try {
    const res = await updateUser(1, { name: 'Jessica' })

    console.log(res)
  } catch (err) {
    console.log(err.message)
  }
}

main()
