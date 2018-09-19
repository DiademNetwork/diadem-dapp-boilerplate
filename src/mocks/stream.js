import * as R from 'ramda'
import achievementsStub from '../stubs/achievements'
import transactionsStub from '../stubs/transactions'

export default (function stream () {
  function suscribe (name) {
    console.log(`Fake suscribe to ${name}`)
  }

  function get (name) {
    switch (name) {
      case 'achievement_chain_feeds':
        return achievementsStub
      case 'transactions_feed':
        return transactionsStub
      default:
        return {}
    }
  }

  function feed (name) {
    return Object.freeze({
      get: R.partial(get, [name]),
      suscribe: R.partial(get, [suscribe])
    })
  }

  function connect () {
    console.log('CONNECT ?')
    return Object.freeze({
      feed
    })
  }

  return Object.freeze({
    connect
  })
})()
