import * as R from 'ramda'
import { createSelector } from 'reselect'
import sortByTime from '../helpers/sort-by-time'

// Helpers
export const getTransactions = (path) => R.path(['transactions', ...path])
export const getTransactionsData = (path) => createSelector([getTransactions], R.path(['data', ...path]))
export const getTransactionsMeta = (path) => createSelector([getTransactions], R.path(['meta', ...path]))

// Simple targets
export const getTransactionsFetchStatus = getTransactions(['fetchStatus'])

// Logic
export const getAchievementsItems = createSelector([getTransactionsData('items')], sortByTime.asc)
export const getTransactionsItemsCount = createSelector([getAchievementsItems], R.length)
