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
export const isUserRegistered = createSelector([getWalletMeta('isUserRegistered')], R.equals(true))
export const getWalletAddress = getWallet('addrStr')
export const isWalletReady = createSelector([ getWalletStatus ], R.either(R.equals('restored'), R.equals('restoring-info-saved')))

// Transactions
export const getAllTransactionsData = R.path(['transactions', 'data'])
export const getAllTransactionsMeta = R.path(['transactions', 'meta'])
export const getTransactionsMeta = name => createSelector([getAllTransactionsMeta], R.prop(name))
export const getTransactionsCount = createSelector([getAllTransactionsData], R.length)
export const getSortedTransactions = createSelector([getAllTransactionsData], sortByTime.asc)

// Achievements
export const getAllAchievementsData = R.path(['achievements', 'data'])
export const getAllAchievementsMeta = R.path(['achievements', 'meta'])
export const getAchievementsMeta = name => createSelector([getAllAchievementsMeta], R.prop(name))
export const getAchievementsCount = createSelector([getAllAchievementsData], R.length)
export const getGroupedByWalletAchievements = createSelector([getAllAchievementsData], R.groupBy(R.prop('wallet')))
export const getAllAchievementsWallets = createSelector([getGroupedByWalletAchievements], R.keys)
export const getProcessedAchievements = createSelector([getGroupedByWalletAchievements], R.compose(
  R.mapObjIndexed((itemsInHistory) => {
    const getNamesForAction = verb => R.compose(
      R.map(R.prop('actor')), // replace with name when ready
      R.filter(R.propEq('verb', verb))
    )
    const creation = R.find(R.propEq('verb', 'create'))(itemsInHistory)
    const updates = R.filter(R.propEq('verb', 'update'))(itemsInHistory)
    return {
      history: [ creation, ...updates ],
      confirmators: getNamesForAction('confirm')(itemsInHistory),
      depositors: getNamesForAction('deposit')(itemsInHistory),
      supporters: getNamesForAction('support')(itemsInHistory)
    }
  }),
  R.mapObjIndexed(sortByTime.asc)
))

// Mix
export const isFacebookAuthenticatedAndWalletReady = createSelector([ isFacebookAuthenticated, isWalletReady ], R.and)
export const hasUserCreatedAnAchievement = createSelector([getWalletAddress, getAllAchievementsWallets], R.contains)
export const canCreateOrUpdateAchievement = createSelector([isFacebookAuthenticated, isWalletReady, isUserRegistered], R.unapply(R.all(R.equals(true))))
