# Luoli

Wrap your functions with sexy middlewares without hassle.

# Why use Luoli ?

When you are writing functions or services in node.js you sometime want to generate side-effects,
share a context or simply add logging it's a not easy to do it in a elegant way without a lot of
boilerplate.

Luoli help you to add middlewares to everything without modifying the signature of your function.

```javascript

// The function you want to wrap
const UpdateUser = () => (id, payload) => User.update(id, payload)

// prepare the middleware
const enhancer = applyMiddleware(loggingMiddleware(console))

// create the config to pass to middlewares
const config = { user: { role: 'ADMIN' } }

// create the useService function using the config and enhancer
const useService = luoli.createContext(config, enhancer)

// get the binded useService function
const updateUser = useService(UpdateUser)

const res = await updateUser(1, { name: 'Jessica' })

console.log(res)

// Output
// updateUser ->
// updateUser <-

```

Now you can follow in the console every call of updateUser.
