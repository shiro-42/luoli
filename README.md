# Luoli

Wrap your functions with sexy middlewares without the hassle.

# Why use Luoli ?

When you are writing functions or services in node.js you sometime want to generate side-effects,
share a context or simply add logging it's a not easy to do it in a elegant way without a lot of
boilerplate.

Luoli help you to add middlewares to everything without modifying the signature of your functions.

## Simple exemple

```javascript

// The function you want to wrap
const UpdateUser = () => (id, payload) => new Promise(r => setTimeout(r, 200))

// prepare the middleware
const enhancer = applyMiddleware(timerMiddleware)

// create the config to pass to middlewares
const config = { user: { role: 'ADMIN' } }

// create the useService function using the config and enhancer
const useService = useMiddleware(config, enhancer)

// get the binded useService function
const updateUser = useService(UpdateUser)

const res = await updateUser(1, { name: 'Jessica' })

console.log(res)

// Output
// UpdateUser: 200.86 ms
```

Now you can check in the console the duration every call of updateUser.

# Luoli lifecycle

```javascript

const middleware = config => {
  // 1. Initialize the plugin on startup
  const someData = {}

  return serviceContext => {
    // 2. access data of the wrapped function
    return executionContext => {

      return next => async (...args) => {
        // 3. access data from the exection context this is a new object in every call

        // here calling next is the equivalent of calling directly the service method
        const res = await next(...args) // 4, 5.

        // 6. service terminated you can clean up, patch the result, etc

        return res
      }
    }
  }
}

const Service = () => {
  // 4. use the execution context

  return async (data1, data2) => {
    // 5. the true service logic

    return 'something'
  }
}

const enhancer = applyMiddleware(middleware(config)) // run 1

const useService = useContext({}, enhancer) // run 2

const service = useService(Service) // run 3

service() // run 3, 4, 5 and 6

```









