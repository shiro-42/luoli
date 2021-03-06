const { useMiddleware, applyMiddleware } = require('../src')

test('useMiddleware - can give an enhancer', () => {
  const enhancer = () => () => n => n
  const useService = useMiddleware({}, enhancer)

  expect(typeof useService).toEqual('function')
})

test('useService - return the result', async () => {
  let called = false
  const obj = {}
  const enhancer = serviceContext => executionContext => next => (...args) => next(...args)
  const Service = () => () => {
    called = true
    return obj
  }

  const useService = useMiddleware({}, enhancer)

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
  const enhancer = serviceContext => executionContext => next => (...args) => next(...args)
  const Service = () => (a, b, c, d) => {
    expect(p1).toStrictEqual(a)
    expect(p2).toStrictEqual(b)
    expect(p3).toStrictEqual(c)
    expect(undefined).toStrictEqual(d)
    called = true
    return obj
  }

  const useService = useMiddleware({}, enhancer)

  const service = useService(Service)
  const result = await service(p1, p2, p3)

  expect(called).toEqual(true)
})

test('applyMiddleware - Return an identity function if called without args', async () => {
  const res = applyMiddleware()

  expect(typeof res).toEqual('function')
})

