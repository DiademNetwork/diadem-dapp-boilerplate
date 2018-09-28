import * as R from 'ramda'
import { createSelector } from 'reselect'

const mainPath = ['wallet', 'qtum']

export const data = R.path([...mainPath, 'data'])
export const util = R.path([...mainPath, 'util'])
export const loadFailReason = R.path([...mainPath, 'loadFailReason'])
export const recoverFailReason = R.path([...mainPath, 'loadFailReason'])

export const address = createSelector([data], R.prop('addrStr'))
export const balance = createSelector([data], R.prop('balance'))
export const unconfirmedBalance = createSelector([data], R.prop('unconfirmedBalance'))
