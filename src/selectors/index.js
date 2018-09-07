import * as R from 'ramda'
import { createSelector } from 'reselect'

export const getFacebookAnthenticationStatus = R.path(['facebook', 'authenticationStatus'])
export const getFacebookData = R.path(['facebook', 'data'])

export const getFacebook = name => createSelector([ getFacebookData ], R.prop(name))
export const isFBAuthenticated = createSelector([ getFacebookAnthenticationStatus ], R.equals('succeeded'))

export const getWalletStatus = R.path(['wallet', 'status'])
export const isWalletReady = createSelector([ getWalletStatus ], R.either(R.equals('restored'), R.equals('restoring-info-saved')))

export const isFBAuthenticatedAndWalletReady = createSelector([ isFBAuthenticated, isWalletReady ], R.and)
