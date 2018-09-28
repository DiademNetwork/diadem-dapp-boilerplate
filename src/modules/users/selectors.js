import * as R from 'ramda'
import { createSelector } from 'reselect'

const getUsers = (path) => R.path(['users', ...path])

export const list = getUsers(['list'])
export const listWithoutFacebookUser = (facebookUserID) => createSelector([list], R.filter(
  R.complement(R.propEq)('userAccount', facebookUserID)
))
