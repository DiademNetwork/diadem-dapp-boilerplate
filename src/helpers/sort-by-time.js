import moment from 'moment'
import * as R from 'ramda'

const isDateBefore = (A, B) => moment(A).isBefore(B)
const isPropBeforeInTime = (prop) => (A, B) => isDateBefore(A[prop], B[prop])
const isTimeBefore = isPropBeforeInTime('time')
const sortByTimeDesc = R.sort(isTimeBefore)

const isDateAfter = (A, B) => moment(B).isBefore(A)
const isPropAfterInTime = (prop) => (A, B) => isDateAfter(A[prop], B[prop])
const isTimeAfter = isPropAfterInTime('time')
const sortByTimeAsc = R.sort(isTimeAfter)

export default {
  asc: sortByTimeDesc,
  desc: sortByTimeAsc
}
