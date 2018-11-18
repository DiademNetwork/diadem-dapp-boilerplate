import * as R from 'ramda'
import { createSelector } from 'reselect'
import { createBaseSelector } from 'modules/utils'

const getDecent = createBaseSelector(['wallets', 'decent'])

export const data = getDecent(['data'])
export const util = getDecent(['util'])
export const loadFailReason = getDecent(['loadFailReason'])
export const recoverFailReason = getDecent(['recoverFailReason'])

// generation
export const mnemonic = getDecent(['mnemonic'])
export const privateKey = getDecent(['privateKey'])
export const infoSaved = getDecent(['infoSaved'])

// data
export const address = createSelector([data], R.prop('addrStr'))
export const balance = getDecent(['data', 'balance'])
export const unconfirmedBalance = createSelector([data], R.prop('unconfirmedBalance'))
export const hasPendingTx = createSelector([data], R.prop('hasPendingTx'))

// status
export const status = getDecent(['status'])

export const isReady = createSelector([status], R.partialRight(R.contains, [['loaded', 'recovered', 'restoring-info-saved']]))
