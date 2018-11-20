import * as R from 'ramda'
import { createSelector } from 'reselect'
import { createBaseSelector } from 'modules/utils'

const getData = createBaseSelector(['login', 'data'])

// Simple targets
export const userID = getData(['userID'])
export const name = getData(['name'])
export const accessToken = getData(['accessToken'])
export const pictureUrl = getData(['picture', 'data', 'url'])

// Logic
export const isLogged = createSelector([userID], R.is(String))
