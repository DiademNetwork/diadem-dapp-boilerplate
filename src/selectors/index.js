import * as R from 'ramda'
import { createSelector } from 'reselect'
import sortByTime from '../helpers/sort-by-time'

// Facebook
export const getFacebookAnthenticationStatus = R.path(['facebook', 'authenticationStatus'])
export const getAllFacebookData = R.path(['facebook', 'data'])
export const getFacebook = name => createSelector([ getAllFacebookData ], R.prop(name))
export const getFacebookUserID = getFacebook('userID')
export const getFacebookPictureUrl = createSelector([ getFacebook('picture') ], R.path(['data', 'url']))
export const isFacebookAuthenticated = createSelector([ getFacebookAnthenticationStatus ], R.equals('succeeded'))

// Wallet
export const getAllWalletMeta = R.path(['wallet', 'meta'])
export const getAllWalletData = R.path(['wallet', 'data'])
export const getWalletStatus = R.path(['wallet', 'status'])
export const getWallet = name => createSelector([ getAllWalletData ], R.prop(name))
export const getWalletMeta = name => createSelector([ getAllWalletMeta ], R.prop(name))
export const isWalletReady = createSelector([ getWalletStatus ], R.either(R.equals('restored'), R.equals('restoring-info-saved')))

// Mix
export const isFacebookAuthenticatedAndWalletReady = createSelector([ isFacebookAuthenticated, isWalletReady ], R.and)

// Transactions
export const getAllTransactionsData = R.path(['transactions', 'data'])
export const getAllTransactionsMeta = R.path(['transactions', 'meta'])
export const getTransactionsMeta = name => createSelector([getAllTransactionsMeta], R.prop(name))
export const getTransactionsCount = createSelector([getAllTransactionsData], R.length)
export const getSortedTransactions = createSelector([getAllTransactionsData], sortByTime.asc)
export const hasUserCreatedAnAchievement = createSelector([getFacebookUserID, getSortedTransactions], (userID, transactions) => {
  return R.filter(
    R.both(
      R.propEq('actor', userID),
      R.propEq('verb', 'create')
    ),
    transactions
  ).length > 0
})

// Achievements
export const getAllAchievementsData = R.path(['achievements', 'data'])
export const getAllAchievementsMeta = R.path(['achievements', 'meta'])
export const getAchievementsMeta = name => createSelector([getAllAchievementsMeta], R.prop(name))
export const getAchievementsCount = createSelector([getAllAchievementsData], R.length)
export const getSortedAchievements = createSelector([getAllAchievementsData], sortByTime.asc)
