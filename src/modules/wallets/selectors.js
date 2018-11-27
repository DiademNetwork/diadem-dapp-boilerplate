import * as R from 'ramda'
import { createSelector } from 'reselect'
import { createBaseSelector } from 'modules/utils'

const getWallets = createBaseSelector(['wallets'])
const getWallet = name => createBaseSelector(['wallets', name])

export const data = getWallets(['data'])
export const util = getWallets(['util'])
export const loadFailReason = getWallets(['loadFailReason'])
export const recoverFailReason = getWallets(['recoverFailReason'])

// generation
export const mnemonic = getWallets(['mnemonic'])
export const privateKey = getWallets(['privateKey'])
export const infoSaved = getWallets(['infoSaved'])
export const hasPendingTx = getWallets(['hasPendingTx'])

// registration
export const isRegistered = (name) => getWallet(name)(['isRegistered'])

// data
export const address = createSelector([data], R.prop('addrStr'))
export const balance = getWallets(['data', 'balance'])
export const unconfirmedBalance = createSelector([data], R.prop('unconfirmedBalance'))

// status
export const status = getWallets(['status'])

export const isReady = createSelector([status], R.partialRight(R.contains, [['loaded', 'recovered', 'restoring-info-saved']]))