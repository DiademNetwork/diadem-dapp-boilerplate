import { all, fork, put } from 'redux-saga/effects'
import ownA from './actions'

const shouldDisplayWelcomeHelp = function * () {
  const doNotShowSplash = window.localStorage.getItem('do-not-show-splash')
  if (!doNotShowSplash) {
    yield put(ownA.toggleHelp({ helpDisplay: 'welcome' }))
  }
}

export default function * () {
  yield all([
    fork(shouldDisplayWelcomeHelp)
  ])
}
