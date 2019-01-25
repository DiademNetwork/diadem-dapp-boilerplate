import * as R from 'ramda'
import { createSelector } from 'reselect'
import sortByTime from 'helpers/sort-by-time'
import { createBaseSelector } from 'modules/utils'

const getTransactions = createBaseSelector(['timeline'])

const rawList = getTransactions(['list'])

export const list = createSelector([rawList], sortByTime.asc)
export const count = createSelector([rawList], R.length)
export const hasMore = getTransactions(['hasMore'])
export const fetchStatus = getTransactions(['fetchStatus'])
