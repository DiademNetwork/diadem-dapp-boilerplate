import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers'

const getStore = () => {
  const store = createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware)
  )
  return store
}

const store = getStore()

export default store
