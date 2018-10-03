import { all, fork, put } from 'redux-saga/effects'
import actions from './actions'

const shouldDisplayWelcomeHelp = function * () {
  const doNotShowSplash = window.localStorage.getItem('do-not-show-splash')
  if (!doNotShowSplash) {
    yield put(actions.toggleHelp({ helpDisplay: 'welcome' }))
  }
}

export default function * () {
  yield all([
    fork(shouldDisplayWelcomeHelp)
  ])
}
