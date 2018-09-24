import * as R from 'ramda'
import { createSelector } from 'reselect'

// Helpers
export const getUi = (path) => R.path(['ui', ...path])
export const getUiData = (path) => createSelector([getUi(['data'])], R.path(path))
export const getUiMeta = (path) => createSelector([getUi(['meta'])], R.path(path))

// Simple targets
export const getUIisHelpedDisplayed = getUi(['isHelpDisplayed'])
