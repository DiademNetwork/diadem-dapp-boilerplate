import * as R from 'ramda'
import { createSelector } from 'reselect'

// Helpers
export const getWallet = (path) => R.path(['wallet', ...path])
export const getWalletData = (path) => createSelector([getWallet(['data'])], R.path(path))
export const getWalletMeta = (path) => createSelector([getWallet(['meta'])], R.path(path))

// Simple targets
export const getWalletStatus = getWallet(['status'])
export const getWalletAddress = getWalletData(['addrStr'])
export const getWalletBalance = getWalletData(['balance'])
export const getWalletUnconfimredBalance = getWalletData(['unconfirmedBalance'])
export const getWalletHasPendingTransactions = getWalletMeta(['hasPendingTransactions'])
export const getWalletMnemonic = getWalletMeta(['mnemonic'])
export const getWalletPrivateKey = getWalletMeta(['privateKey'])
export const getWalletUtil = getWalletMeta(['wallet'])
export const getWalletIsRegistrationPending = getWalletMeta(['isRegistrationPending'])

// Logic
export const isUserRegistered = createSelector([getWalletMeta(['isUserRegistered'])], R.equals(true))
export const isWalletReady = createSelector([getWalletStatus], R.either(R.equals('restored'), R.equals('restoring-info-saved')))
