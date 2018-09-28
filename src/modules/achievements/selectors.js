import { createSelector } from 'reselect'
import * as R from 'ramda'
import mapSort from 'helpers/map-sort'

const getAchievements = (path) => R.path(['achievements', ...path])

export const list = createSelector([getAchievements(['list'])], R.filter(R.complement(R.propEq)('ban', true)))
export const hasUnread = getAchievements(['hasUnread'])
export const count = createSelector([list], R.length)

const groupedbyWallet = createSelector([list], R.groupBy(R.prop('wallet')))

export const wallets = createSelector([groupedbyWallet], R.keys)
export const processedList = createSelector([groupedbyWallet], R.mapObjIndexed((groupedAchievement) => {
  let result = R.compose(
    R.curry(mapSort)({ key: 'object', previousKey: 'previousLink' }),
    R.filter(R.compose(
      R.anyPass([R.equals('create'), R.equals('update')]),
      R.prop('verb')
    ))
  )(groupedAchievement)

  R.compose(
    R.forEach((item) => {
      const matchingItemIndex = R.findIndex(R.propEq('object', item.object))(result)
      const path = [matchingItemIndex, item.verb]
      const existingVerbItems = R.pathOr([], path, result)
      result = R.assocPath(path, [...existingVerbItems, item], result)
    }),
    R.filter(R.compose(
      R.anyPass([R.equals('confirm'), R.equals('support'), R.equals('deposit')]),
      R.prop('verb')
    ))
  )(groupedAchievement)
  return result
}))

export const getCurrentAchievementFromChain = R.compose(R.head, R.takeLast(1))
export const getPastAchievementsFromChain = R.compose(R.reverse, R.dropLast(1))
