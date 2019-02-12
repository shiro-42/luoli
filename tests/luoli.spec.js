const { useMiddleware, applyMiddleware } = require('../src')

test('useMiddleware - can instantiate without args', () => {
  const useService = useMiddleware()

  expect(typeof useService).toEqual('function')
})

test('useMiddleware - return a function', () => {
  const useService = useMiddleware({})

  expect(typeof useService).toEqual('function')
})

test('useMiddleware - can give an enhancer', () => {
  const enhancer = () => n => n
  const useService = useMiddleware({}, enhancer)

  expect(typeof useService).toEqual('function')
})

test('useMiddleware - only accept one enhancer', () => {
  const enhancer1 = () => n => n
  const enhancer2 = () => n => n

  expect(() => {
    useMiddleware({}, enhancer1, enhancer2)
  }).toThrow()
})

test('useMiddleware - enhancer must be a function', () => {
  const enhancer = false

  expect(() => {
    useMiddleware({}, enhancer)
  }).toThrow()
})

test('useService - return the result', async () => {
  let called = false
  const obj = {}
  const Service = () => () => {
    called = true
    return obj
  }

  const useService = useMiddleware({})

  const service = useService(Service)
  const result = await service()

  expect(typeof service).toEqual('function')
  expect(called).toEqual(true)
  expect(result).toStrictEqual(obj)
})

test('useService - receive the params', async () => {
  let called = false
  const obj = {}
  const p1 = 1
  const p2 = []
  const p3 = {}
  const Service = () => (a, b, c, d) => {
    expect(p1).toStrictEqual(a)
    expect(p2).toStrictEqual(b)
    expect(p3).toStrictEqual(c)
    expect(undefined).toStrictEqual(d)
    called = true
    return obj
  }

  const useService = useMiddleware({})

  const service = useService(Service)
  const result = await service(p1, p2, p3)

  expect(called).toEqual(true)
})

test('applyMiddleware - Return an identity function if called without args', async () => {
  const res = applyMiddleware()

  expect(typeof res).toEqual('function')
})

test('applyMiddleware - Work with one param', async () => {
  const testFn = (c, C, i) => next => (...args) => {
    return next(...args)
  }
  const res = applyMiddleware(testFn)

  expect(typeof res).toEqual('function')
})

test('applyMiddleware - Work with a lot of param', async () => {
  const testFn1 = (c, C, i) => next => (...args) => {
    return next(...args)
  }
  const testFn2 = (c, C, i) => next => (...args) => {
    return next(...args)
  }
  const testFn3 = (c, C, i) => next => (...args) => {
    return next(...args)
  }
  const res = applyMiddleware(testFn1, testFn2, testFn3)

  expect(typeof res).toEqual('function')
})

test('applyMiddleware - The function is a combined version', async () => {
  const results = []

  const testFn1 = (c, C, i) => next => (...args) => {
    results.push(1)
    return next(...args)
  }
  const testFn2 = (c, C, i) => next => (...args) => {
    results.push(2)
    return next(...args)
  }
  const testFn3 = (c, C, i) => next => (...args) => {
    results.push(3)
    return next(...args)
  }
  const enhancer = applyMiddleware(testFn1, testFn2, testFn3)

  const res = enhancer()(() => {})()

  expect(results[0]).toEqual(1)
  expect(results[1]).toEqual(2)
  expect(results[2]).toEqual(3)
})

test('applyMiddleware - every middleware receive the same params', async () => {
  let called = 0
  const p1 = []
  const p2 = []
  const p3 = []

  const testFn1 = (c, C, i) => next => (...args) => {
    called++
    expect(p1).toStrictEqual(c)
    expect(p2).toStrictEqual(C)
    expect(p3).toStrictEqual(i)
    return next(...args)
  }
  const testFn2 = (c, C, i) => next => (...args) => {
    called++
    expect(p1).toStrictEqual(c)
    expect(p2).toStrictEqual(C)
    expect(p3).toStrictEqual(i)
    return next(...args)
  }
  const testFn3 = (c, C, i) => next => (...args) => {
    called++
    expect(p1).toStrictEqual(c)
    expect(p2).toStrictEqual(C)
    expect(p3).toStrictEqual(i)
    return next(...args)
  }
  const enhancer = applyMiddleware(testFn1, testFn2, testFn3)

  const res = enhancer(p1, p2, p3)(() => {})()
  expect(called).toEqual(3)
})
