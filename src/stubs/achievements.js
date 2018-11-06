import achievementGenerator from './achievementGenerator'
import * as R from 'ramda'

export const INITIAL_ACHIEVEMENT_COUNT = 5

export default {
  results: R.range(0, INITIAL_ACHIEVEMENT_COUNT)
    .reduce((acc) => [...acc, ...achievementGenerator()], []),
  next: '',
  duration: '5ms'
}
