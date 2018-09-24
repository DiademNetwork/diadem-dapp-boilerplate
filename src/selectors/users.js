import * as R from 'ramda'
import { createSelector } from 'reselect'

// Helpers
export const getUsers = (path) => R.path(['users', ...path])
export const getUsersData = (path) => createSelector([getUsers(['data'])], R.path(path))
export const getUsersMeta = (path) => createSelector([getUsers(['meta'])], R.path(path))

// Simple targets
export const getUsersFetchStatus = getUsers(['fetchStatus'])
export const getUsersItems = getUsersData(['items'])

// Logic
export const getAllUsersBut = (creatorID) => createSelector([getUsersItems], R.filter(
  R.complement(R.propEq)('userAccount', creatorID)
))
