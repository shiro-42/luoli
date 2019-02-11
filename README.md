# Luoli

Help you to create reusable services for your application.

# Service

A service is simple function.

# Why Luoli ?

Luoli can help you to add middlewares like logging, rbac helpers.

```javascript

// prepare the middleware
const enhancer = applyMiddleware(contextMiddleware, loggingMiddleware(logger))

// create the config to pass to middlewares
const config = { user: { role: 'ADMIN' } }

// create the useService function using the config and enhancer
const useService = luoli.createContext(config, enhancer)

// get the binded useService function
const updateUser = useService(UpdateUser)

const res = await updateUser(1, { name: 'Jessica' })

console.log(res)

```
