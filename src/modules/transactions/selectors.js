import * as R from 'ramda'
import { createSelector } from 'reselect'
import sortByTime from 'helpers/sort-by-time'
import { createBaseSelector } from 'modules/utils'

const getTransactions = createBaseSelector(['transactions'])

const rawList = getTransactions(['list'])

export const list = createSelector([rawList], sortByTime.asc)
export const count = createSelector([rawList], R.length)
export const hasMore = getTransactions(['hasMore'])
export const hasUnread = getTransactions(['hasUnread'])
export const fetchStatus = getTransactions(['fetchStatus'])

export const lastForUser = userID => (state) => {
  if (!userID) { return [] }
  const lastTX = R.compose(
    R.takeLast(2),
    R.map(R.prop('target')),
    R.filter(R.propEq('actor', userID)),
    R.path(['transactions', 'list'])
  )(state)
  return lastTX
}
