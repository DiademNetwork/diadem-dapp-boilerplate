import moment from 'moment'
import * as R from 'ramda'

const momentDate = X => moment(new Date(X))

const sortByTimeAsc = R.sort((A, B) => momentDate(A.time).valueOf() - momentDate(B.time).valueOf())
const sortByTimeDesc = R.sort((A, B) => momentDate(B.time).valueOf() - momentDate(A.time).valueOf())

export default {
  asc: sortByTimeDesc,
  desc: sortByTimeAsc
}
