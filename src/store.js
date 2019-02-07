import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import createRootReducer from 'modules/reducers'
import rootSaga from 'modules/sagas'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'

export const history = createBrowserHistory()

const sagaMiddleware = createSagaMiddleware()

export default (() => {
  const store = createStore(
    createRootReducer(history),
    composeWithDevTools(
      applyMiddleware(
        routerMiddleware(history),
        sagaMiddleware,
        thunkMiddleware
      )
    )
  )
  sagaMiddleware.run(rootSaga)
  return store
})()
