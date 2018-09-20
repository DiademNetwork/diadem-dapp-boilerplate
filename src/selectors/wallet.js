import * as R from 'ramda'
import { createSelector } from 'reselect'

// Helpers
export const getWallet = (path) => R.path(['wallet', ...path])
export const getWalletData = (path) => createSelector([getWallet], R.path(['data', ...path]))
export const getWalletMeta = (path) => createSelector([getWallet], R.path(['meta', ...path]))

// Simple targets
export const getWalletStatus = getWallet(['status'])
export const getWalletAddress = getWalletData(['addrStr'])

// Logic
export const isUserRegistered = createSelector([getWalletMeta(['isUserRegistered'])], R.equals(true))
export const isWalletReady = createSelector([ getWalletStatus ], R.either(R.equals('restored'), R.equals('restoring-info-saved')))
