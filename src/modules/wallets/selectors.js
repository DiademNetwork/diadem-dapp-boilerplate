import * as R from 'ramda'
import * as U from 'utils'
import blockchains from 'configurables/blockchains'
import { createSelector } from 'reselect'
import { createBaseSelector } from 'modules/utils'

const getWallets = createBaseSelector(['wallets'])
const getWallet = name => createBaseSelector(['wallets', name])
const getWalletData = name => createBaseSelector(['wallets', name, 'data'])
const getAll = R.path(['wallets'])

export const loadFailReason = (name) => getWallets(name)(['loadFailReason'])
export const recoverFailReason = (name) => getWallet(name)(['recoverFailReason'])

// generation
export const mnemonic = (name) => getWallet(name)(['mnemonic'])
export const privateKey = (name) => getWallet(name)(['privateKey'])
export const infoSaved = (name) => getWallet(name)(['infoSaved'])

// registration
export const isRegistered = (name) => getWallet(name)(['isRegistered'])
export const isRegistrationPending = (name) => getWallet(name)(['isRegistrationPending'])

// data
export const primaryAddress = getWalletData(blockchains.primary.key)(['address'])
export const data = (name) => getWalletData(name)()
export const address = (name) => getWalletData(name)(['address'])
export const balance = (name) => getWalletData(name)(['balance'])
export const unconfirmedBalance = (name) => getWalletData(name)(['unconfirmedBalance'])
export const balances = createSelector([getAll], R.mapObjIndexed(R.pathOr(0, ['data', 'balance'])))

// status
export const status = (name) => getWallet(name)(['status'])
const isReadyStatus = U.oneOf(['loaded', 'recovered', 'recovery-info-saved'])
export const isReady = (name) => createSelector([status(name)], isReadyStatus)
export const isPrimaryReady = isReady(blockchains.primary.key)
export const getOnesReady = createSelector([getAll], R.pickBy(({ status }) => isReadyStatus(status)))
export const areAllReady = createSelector([getOnesReady, getAll], R.equals)
