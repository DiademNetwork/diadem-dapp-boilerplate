import * as R from 'ramda'
import { createBaseSelector } from 'modules/utils'

const getAchievementsChain = createBaseSelector(['achievements', 'chain'])

export const createStatus = getAchievementsChain(['createStatus'])

export const currentFrom = R.compose(R.head, R.takeLast(1))
export const pastFrom = R.compose(R.reverse, R.dropLast(1))
