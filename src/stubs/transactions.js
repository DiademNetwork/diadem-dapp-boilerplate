
import transactionGenerator from './transactionGenerator'
import * as R from 'ramda'

export default {
  results: R.range(0, 50).map(transactionGenerator),
  next: '',
  duration: '5ms'
}
