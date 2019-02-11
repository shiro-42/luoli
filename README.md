# Luoli

Help you to create reusable services for your application.

# Service

A service is simple function.

# Why Luoli ?

Luoli can help you to add middlewares like logging, rbac helpers.

```javascript

const luoli = new Luoli() // Create a new Luoli instance

// register middlewares
luoli
  .use(contextMiddleware)
  .use(loggingMiddleware(logger))

// create a context object
const context = { user: { role: 'ADMIN' } }

// create the useService using the context
const useService = luoli.prepareContext(context)

// get the binded useService function
const updateUser = useService(UpdateUser)

const res = await updateUser(1, { name: 'Jessica' })

console.log(res)

```
