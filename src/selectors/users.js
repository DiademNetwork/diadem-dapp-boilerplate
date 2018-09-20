import * as R from 'ramda'
import { createSelector } from 'reselect'

export const getAllOtherUsers = createSelector([
  R.pathOr([], ['users', 'data']),
  (state, props) => R.prop('creatorID', props)
], (users, creatorID) => R.filter(
  R.complement(R.propEq)('userAccount', creatorID),
  users
))
