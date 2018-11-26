import { createSelector } from 'reselect'
import * as R from 'ramda'
import mapSort from 'helpers/map-sort'
import { createBaseSelector } from 'modules/utils'

const getAchievementsList = createBaseSelector(['achievements', 'list'])

export const fetchStatus = getAchievementsList(['fetchStatus'])
export const list = createSelector([getAchievementsList(['list'])], R.filter(R.complement(R.propEq)('ban', true)))
export const count = createSelector([list], R.length)
export const hasUnread = getAchievementsList(['hasUnread'])

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

export const lastLinkOfUserAchievementOrNull = (userQtumAddress) => (state) => {
  const walletsAddresses = wallets(state)
  const achievementsList = processedList(state)
  if (!userQtumAddress || !R.is(Array)(walletsAddresses) || achievementsList === {}) {
    return null
  }
  if (!R.contains(userQtumAddress, walletsAddresses)) {
    return null
  } else {
    const userAchievementsChain = R.propOr([], userQtumAddress, achievementsList)
    const updates = R.filter(R.propEq('verb', 'update'), userAchievementsChain)
    const create = R.find(R.propEq('verb', 'create'), userAchievementsChain)
    return R.compose(
      R.prop('object'),
      R.head,
      R.takeLast(1)
    )([ create, ...updates ])
  }
}
