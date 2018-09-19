import * as R from 'ramda'
import achievementsStub from '../stubs/achievements'
import transactionsStub from '../stubs/transactions'

export default (function stream () {
  function subscribe (name) {
    console.log(`Fake subscribe to ${name}`)
  }

  function get (name) {
    switch (name) {
      case 'achievements_chain':
        return achievementsStub
      case 'transactions':
        return transactionsStub
      default:
        return {}
    }
  }

  function feed (name) {
    return Object.freeze({
      get: R.partial(get, [name]),
      subscribe: R.partial(subscribe, [name])
    })
  }

  function connect () {
    return Object.freeze({
      feed
    })
  }

  return Object.freeze({
    connect
  })
})()
