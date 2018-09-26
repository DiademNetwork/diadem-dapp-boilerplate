import * as R from 'ramda'
import { createSelector } from 'reselect'
import mapSort from '../helpers/map-sort'

// Helpers
export const getAchievements = (path) => R.path(['achievements', ...path])
export const getAchievementsData = (path) => createSelector([getAchievements(['data'])], R.path(path))
export const getAchievementsMeta = (path) => createSelector([getAchievements(['meta'])], R.path(path))

// Simple targets
export const getAchievementCreateStatus = getAchievements(['createStatus'])
export const getAchievementsFetchStatus = getAchievements(['fetchStatus'])

// Logic
export const getAchievementsItems = createSelector([getAchievementsData(['items'])], R.filter(R.complement(R.propEq)('ban', true)))
export const getAchievementsItemsCount = createSelector([getAchievementsItems], R.length)
export const getAchievementsItemsGroupedByWallet = createSelector([getAchievementsItems], R.groupBy(R.prop('wallet')))
export const getAllAchievementsWallets = createSelector([getAchievementsItemsGroupedByWallet], R.keys)
export const getProcessedAchievementsChains = createSelector([getAchievementsItemsGroupedByWallet], R.mapObjIndexed((groupedAchievement) => {
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
