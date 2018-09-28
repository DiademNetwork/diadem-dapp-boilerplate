import * as R from 'ramda'

const getUiGeneral = (path) => R.path(['ui', 'general', ...path])

export const isHelpDisplayed = getUiGeneral(['isHelpDisplayed'])
