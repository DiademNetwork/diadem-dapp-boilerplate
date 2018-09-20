import * as R from 'ramda'
import { createSelector } from 'reselect'

// Helpers
export const getFacebook = (path) => R.path(['facebook', ...path])
export const getFacebookData = (path) => createSelector([getFacebook], R.path(['data', ...path]))
export const getFacebookMeta = (path) => createSelector([getFacebook], R.path(['meta', ...path]))

// Simple targets
export const getFacebookUserID = getFacebookData(['userID'])
export const getFacebookPictureUrl = getFacebookData(['picture', 'data', 'url'])

// Logic
export const isFacebookAuthenticated = createSelector([ getFacebook('authenticationStatus') ], R.equals('succeeded'))
