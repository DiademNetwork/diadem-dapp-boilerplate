import * as R from 'ramda'
import { createSelector } from 'reselect'

// Facebook
export const getFacebookAnthenticationStatus = R.path(['facebook', 'authenticationStatus'])
export const getAllFacebookData = R.path(['facebook', 'data'])
export const getFacebook = name => createSelector([ getAllFacebookData ], R.prop(name))
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
