import { createBaseSelector } from 'modules/utils'

const getUiGeneral = createBaseSelector(['ui', 'general'])

export const helpDisplay = getUiGeneral(['helpDisplay'])
