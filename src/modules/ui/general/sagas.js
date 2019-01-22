import { all, fork, put } from 'redux-saga/effects'
import ownA from './actions'

const shouldDisplayWelcomeHelp = function * () {
  // For now we disactivate Welcome splash screen because there is already primary blockchain save info screen
  // remove "true ||" to put back help splash screen
  const doNotShowSplash = true || window.localStorage.getItem('do-not-show-splash')
  if (!doNotShowSplash) {
    yield put(ownA.toggleHelp({ helpDisplay: 'welcome' }))
  }
}

export default function * () {
  yield all([
    fork(shouldDisplayWelcomeHelp)
  ])
}
