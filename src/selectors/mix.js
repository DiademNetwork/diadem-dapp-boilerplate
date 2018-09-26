import * as R from 'ramda'
import { createSelector } from 'reselect'
import * as achievements from './achievements'
import * as facebook from './facebook'
import * as wallet from './wallet'

export const lastLinkOfUserAchievementOrNull = createSelector([
  wallet.getWalletAddress,
  achievements.getAllAchievementsWallets,
  achievements.getProcessedAchievementsChains
], (
  userWalletAddress,
  allAchievementsWallets,
  processedAchievementsChains
) => {
  if (!userWalletAddress || !R.is(Array)(allAchievementsWallets) || processedAchievementsChains === {}) {
    return null
  }
  if (!R.contains(userWalletAddress, allAchievementsWallets)) {
    return null
  } else {
    const userAchievementsChain = R.propOr([], userWalletAddress, processedAchievementsChains)
    const updates = R.filter(R.propEq('verb', 'update'), userAchievementsChain)
    const create = R.find(R.propEq('verb', 'create'), userAchievementsChain)
    return R.compose(
      R.prop('object'),
      R.head,
      R.takeLast(1)
    )([ create, ...updates ])
  }
})

export const canUserConfirmCreateUpdateSupportDeposit = createSelector([
  facebook.isFacebookAuthenticated,
  wallet.isWalletReady,
  wallet.isUserRegistered
], R.unapply(R.all(R.equals(true))))

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
