import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from 'modules/reducers'
import sagas from 'modules/sagas'

const sagaMiddleware = createSagaMiddleware()

export default (() => {
  const store = createStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware(
        thunkMiddleware,
        sagaMiddleware
      )
    )
  )
  sagas.forEach(sagaMiddleware.run.bind(sagaMiddleware))
  return store
})()
