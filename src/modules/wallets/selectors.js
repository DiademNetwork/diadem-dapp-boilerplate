import * as R from 'ramda'
import * as U from 'utils'
import blockchains from 'configurables/blockchains'
import { createSelector } from 'reselect'
import { createBaseSelector } from 'modules/utils'

const getWallets = createBaseSelector(['wallets'])
const getWallet = name => createBaseSelector(['wallets', name])
const getAll = R.path(['wallets'])

export const getstreamUserToken = getWallet('getstreamUserToken')

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
export const primaryAddress = getWallet(blockchains.primary.key)(['addrStr'])
export const address = (name) => getWallet(name)(['addrStr'])
export const balance = (name) => getWallet(name)(['balance'])
export const unconfirmedBalance = (name) => getWallet(name)(['unconfirmedBalance'])
export const balances = createSelector([getAll], R.mapObjIndexed(R.propOr(0, 'balance')))

// status
export const status = (name) => getWallet(name)(['status'])
const isReadyStatus = U.oneOf(['loaded', 'recovered', 'recovery-info-saved'])
export const isReady = (name) => createSelector([status(name)], isReadyStatus(status))
export const getOnesReady = createSelector([getAll], R.pickBy(({ status }) => isReadyStatus(status)))
export const areAllReady = createSelector([getOnesReady, getAll], R.equals)
