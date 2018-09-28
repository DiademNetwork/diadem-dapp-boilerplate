import * as R from 'ramda'
import { createSelector } from 'reselect'
import sortByTime from '/helpers/sort-by-time'

const getTransactions = (path) => R.path(['transactions', ...path])

const rawList = getTransactions(['list'])

export const list = createSelector([rawList], sortByTime.asc)
export const count = createSelector([rawList], R.length)
export const hasMore = getTransactions(['hasMore'])
export const hasUnread = getTransactions(['hasUnread'])
