const { useMiddleware } = require('../src')

test('useMiddleware - return a function', () => {
  const useService = useMiddleware({})

  expect(typeof useService).toEqual('function')
})

test('useService - call a service and return the service result', async () => {
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

test('useService - the service receive the params', async () => {
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
