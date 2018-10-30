import * as R from 'ramda'
import userGenerator from './userGenerator'

export default {
  usersList: R.range(0, 50).map(userGenerator)
}
