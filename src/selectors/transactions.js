import * as R from 'ramda'
import { createSelector } from 'reselect'
import sortByTime from '../helpers/sort-by-time'

// Helpers
export const getTransactions = (path) => R.path(['transactions', ...path])
export const getTransactionsData = (path) => createSelector([getTransactions(['data'])], R.path(path))
export const getTransactionsMeta = (path) => createSelector([getTransactions(['meta'])], R.path(path))

// Simple targets
export const getTransactionsFetchStatus = getTransactions(['fetchStatus'])
export const getTransactionsHasMore = getTransactionsMeta(['hasMore'])

// Logic
export const getTransactionsItems = createSelector([getTransactionsData(['items'])], sortByTime.asc)
export const getTransactionsItemsCount = createSelector([getTransactionsItems], R.length)
