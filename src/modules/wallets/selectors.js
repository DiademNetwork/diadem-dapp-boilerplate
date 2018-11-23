import * as R from 'ramda'
import { createSelector } from 'reselect'
import { createBaseSelector } from 'modules/utils'

const getQtum = createBaseSelector(['wallets'])

export const data = getQtum(['data'])
export const util = getQtum(['util'])
export const loadFailReason = getQtum(['loadFailReason'])
export const recoverFailReason = getQtum(['recoverFailReason'])

// generation
export const mnemonic = getQtum(['mnemonic'])
export const privateKey = getQtum(['privateKey'])
export const infoSaved = getQtum(['infoSaved'])
export const hasPendingTx = getQtum(['hasPendingTx'])

// registration

export const isRegistered = getQtum(['isRegistered'])

// data
export const address = createSelector([data], R.prop('addrStr'))
export const balance = getQtum(['data', 'balance'])
export const unconfirmedBalance = createSelector([data], R.prop('unconfirmedBalance'))

// status
export const status = getQtum(['status'])

export const isReady = createSelector([status], R.partialRight(R.contains, [['loaded', 'recovered', 'restoring-info-saved']]))
