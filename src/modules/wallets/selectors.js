import * as R from 'ramda'
import * as U from 'utils'
import { createSelector } from 'reselect'
import { createBaseSelector } from 'modules/utils'

const getWallets = createBaseSelector(['wallets'])
const getWallet = name => createBaseSelector(['wallets', name])
const wallets = R.path(['wallets'])

export const data = getWallets(['data'])
export const util = getWallets(['util'])

export const loadFailReason = (name) => getWallets(name)(['loadFailReason'])
export const recoverFailReason = (name) => getWallet(name)(['recoverFailReason'])

// generation
export const mnemonic = (name) => getWallet(name)(['mnemonic'])
export const privateKey = (name) => getWallet(name)(['privateKey'])
export const infoSaved = (name) => getWallet(name)(['infoSaved'])
// export const hasPendingTx = getWallets(['hasPendingTx'])

// registration
export const isRegistered = (name) => getWallet(name)(['isRegistered'])
export const isRegistrationPending = (name) => getWallet(name)(['isRegistrationPending'])

// data
export const address = (name) => getWallet(name)(['walletInfo', 'addrStr'])
export const balance = (name) => getWallet(name)(['walletInfo', 'balance'])
export const unconfirmedBalance = (name) => getWallet(name)(['walletInfo', 'unconfirmedBalance'])

// status
export const status = (name) => getWallet(name)(['status'])
const isReadyStatus = U.oneOf(['loaded', 'recovered', 'recovery-info-saved'])
export const isReady = (name) => createSelector([status(name)], isReadyStatus(status))
export const getReadyWallets = createSelector([wallets], R.pickBy(({ status }) => isReadyStatus(status)))
