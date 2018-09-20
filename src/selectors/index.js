import * as R from 'ramda'
import { createSelector } from 'reselect'

// Mix
export const lastLinkOfUserAchievementOrNull = createSelector([
  getWalletAddress,
  getAllAchievementsWallets,
  getProcessedAchievements
], (
  userWalletAddress,
  allAchievementsWallets,
  processedAchievements
) => {
  if (!userWalletAddress || !R.is(Array)(allAchievementsWallets) || processedAchievements === {}) {
    return null
  }
  if (!R.contains(userWalletAddress, allAchievementsWallets)) {
    return null
  } else {
    const userAchievementsChain = R.propOr([], userWalletAddress, processedAchievements)
    const updates = R.filter(R.propEq('verb', 'update'), userAchievementsChain)
    const create = R.find(R.propEq('verb', 'create'), userAchievementsChain)
    return R.compose(
      R.prop('object'),
      R.head,
      R.takeLast(1)
    )([ create, ...updates ])
  }
})
export const canUserConfirmCreateUpdateSupportDeposit = createSelector([isFacebookAuthenticated, isWalletReady, isUserRegistered], R.unapply(R.all(R.equals(true))))

export const getLastUserTransactions = (state, { userID }) => {
  if (!userID) {
    return []
  }
  return R.compose(
    R.takeLast(2),
    R.map(R.prop('target')),
    R.filter(R.propEq('actor', userID)),
    R.path(['transactions', 'data'])
  )(state)
}

export const getUsersFetchStatus = R.path(['users', 'fetchStatus'])
