// Goal of this function is to add logging capabilities for better debugging experience
export const createMockResponse = (...args) => function (config) {
  const { method, url } = config
  console.log(config)
  console.log(`axiosMock call: ${method.toUpperCase()} - ${url}`, config)

  // response code or function
  if (args.length === 1) {
    if (typeof args[0] === 'number') {
      return [args[0], {}]
    }
    if (typeof args[0] === 'function') {
      return args[0](config)
    }
  // response code + data
  } else if (args.length === 2 && typeof args[0] === 'number' && typeof args[1] === 'object') {
    return args
  } else {
    throw new Error('Mock arguments invalid')
  }
}
