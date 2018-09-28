import * as R from 'ramda'
import { createSelector } from 'reselect'

const getData = (path) => R.path(['facebook', 'login', 'data', ...path])

// Simple targets
export const userID = getData(['userID'])
export const name = getData(['name'])
export const accessToken = getData(['accessToken'])
export const pictureUrl = getData(['picture', 'data', 'url'])

// Logic
export const isLogged = createSelector([userID], R.is(String))
