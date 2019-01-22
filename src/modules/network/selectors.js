import * as R from 'ramda'
import { createSelector } from 'reselect'
import { createBaseSelector } from 'modules/utils'

const getData = createBaseSelector(['login', 'data'])

// Simple targets
export const data = getData()
export const userID = getData(['userID'])
export const userName = getData(['userName'])
export const userAccessToken = getData(['userAccessToken'])
export const userPictureUrl = getData(['userPictureUrl'])

// Logic
export const isLogged = createSelector([userID], R.is(String))
