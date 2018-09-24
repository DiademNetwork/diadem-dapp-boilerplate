import * as R from 'ramda'
import { createSelector } from 'reselect'

// Helpers
export const getFacebook = (path) => R.path(['facebook', ...path])
export const getFacebookData = (path) => createSelector([getFacebook(['data'])], R.path(path))
export const getFacebookMeta = (path) => createSelector([getFacebook(['meta'])], R.path(path))

// Simple targets
export const getFacebookUserID = getFacebookData(['userID'])
export const getFacebookName = getFacebookData(['name'])
export const getFacebookAccessToken = getFacebookData(['accessToken'])
export const getFacebookPictureUrl = getFacebookData(['picture', 'data', 'url'])

// Logic
export const isFacebookAuthenticated = createSelector([getFacebook(['authenticationStatus'])], R.equals('succeeded'))
