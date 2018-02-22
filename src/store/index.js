import { createStore } from 'redux'
import rootReducer from '../reducers'

const store = createStore(
  rootReducer,
  process.env.NODE_ENV !== 'production' && window.devToolsExtension
    ? window.devToolsExtension()
    : f => f
)

export default store
