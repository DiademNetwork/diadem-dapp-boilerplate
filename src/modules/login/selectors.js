import * as R from 'ramda'
import { createSelector } from 'reselect'
import { createBaseSelector } from 'modules/utils'
import network from 'configurables/network'
const { dataPaths } = network

const getData = createBaseSelector(['login', 'data'])

// Simple targets
export const userID = getData(dataPaths.userID)
export const userName = getData(dataPaths.userName)
export const userAccessToken = getData(dataPaths.userAccessToken)
export const userPictureUrl = getData(dataPaths.userPictureUrl)

// Logic
export const isLogged = createSelector([userID], R.is(String))
