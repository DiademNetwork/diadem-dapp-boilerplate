import * as R from 'ramda'
import { createSelector } from 'reselect'

// Facebook
export const getFacebookAnthenticationStatus = R.path(['facebook', 'authenticationStatus'])
export const fromFacebookData = R.path(['facebook', 'data'])
export const getFacebook = name => createSelector([ fromFacebookData ], R.prop(name))
export const getFacebookPictureUrl = createSelector([ getFacebook('picture') ], R.path(['data', 'url']))
export const isFacebookAuthenticated = createSelector([ getFacebookAnthenticationStatus ], R.equals('succeeded'))

// Wallet
export const fromWalletMeta = R.path(['wallet', 'meta'])
export const fromWalletData = R.path(['wallet', 'data'])
export const getWalletStatus = R.path(['wallet', 'status'])
export const getWallet = name => createSelector([ fromWalletData ], R.prop(name))
export const getWalletMeta = name => createSelector([ fromWalletMeta ], R.prop(name))
export const isWalletReady = createSelector([ getWalletStatus ], R.either(R.equals('restored'), R.equals('restoring-info-saved')))

// Mix
export const isFacebookAuthenticatedAndWalletReady = createSelector([ isFacebookAuthenticated, isWalletReady ], R.and)
