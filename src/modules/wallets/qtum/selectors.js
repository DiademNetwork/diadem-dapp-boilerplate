import * as R from 'ramda'
import { createSelector } from 'reselect'

const getQtum = (path) => R.path(['wallets', 'qtum', ...path])

export const data = getQtum(['data'])
export const util = getQtum(['util'])
export const loadFailReason = getQtum(['loadFailReason'])
export const recoverFailReason = getQtum(['recoverFailReason'])

// generation
export const mnemonic = getQtum(['mnemonic'])
export const privateKey = getQtum(['privateKey'])
export const infoSaved = getQtum(['infoSaved'])

// data
export const address = createSelector([data], R.prop('addrStr'))
export const balance = getQtum(['data', 'balance'])
export const unconfirmedBalance = createSelector([data], R.prop('unconfirmedBalance'))
export const hasPendingTx = createSelector([data], R.prop('hasPendingTx'))

// status
export const status = getQtum(['status'])
