import * as R from 'ramda'
import achievementGenerator from '../stubs/achievementGenerator'
import achievementsStub from '../stubs/achievements'
import transactionsStub from '../stubs/transactions'

const FAKE_ACHIEVEMENT_TIMEOUT = 60000
const FAKE_TIMELINE_TIMEOUT = 45000

export default (function stream () {
  function subscribe (name, successCallback) {
    switch (name) {
      case 'achievements_chain':
        setInterval(() => successCallback({ new: [ ...achievementGenerator() ] }), FAKE_ACHIEVEMENT_TIMEOUT)
        break
      case 'transactions':
        setInterval(() => successCallback({ new: [ ...achievementGenerator() ] }), FAKE_TIMELINE_TIMEOUT)
        return transactionsStub
      default:
        break
    }
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
