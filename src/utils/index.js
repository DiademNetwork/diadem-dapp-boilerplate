import * as R from 'ramda'

export const mapObj = fn => obj => R.compose(
  R.addIndex(R.map)((key, idx) => fn(obj[key], idx)),
  R.keys
)(obj)

export const mapKeys = fn => obj => R.compose(
  R.map(fn),
  R.keys
)(obj)

export const oneOf = array => R.partialRight(R.contains, [array])

export const achievement = (function achievement () {
  const getActivities = (verb) => R.compose(
    R.filter(R.propEq('verb', verb)),
    R.prop('activities')
  )

  const getCreatorAddress = () => R.compose(
    R.path(['actor', 'id']),
    getActivities('create')
  )

  const getLink = R.prop('group')

  const hasAlready = (userAddress) => (verb) => R.compose(
    R.complement(R.isEmpty),
    R.filter(
      R.pathEq(['actor', 'id'], userAddress)
    ),
    getActivities(verb)
  )

  const firstActor = (verb) => R.compose(
    R.prop('actor'),
    R.ifElse(R.is(Array), R.head, R.identity),
    getActivities(verb)
  )

  const isCreator = (userAddress) => R.compose(
    R.equals(userAddress),
    R.prop('id'),
    firstActor('create')
  )

  const getAmount = verb => R.compose(
    R.sum,
    R.map(R.prop('amount')),
    getActivities(verb)
  )

  return Object.freeze({
    firstActor,
    getAmount,
    getActivities,
    getCreatorAddress,
    getLink,
    hasAlready,
    isCreator
  })
})()

export const actor = (function actor () {
  const getAddress = R.prop('id')
  const getUserName = R.path(['data', 'userName'])

  const getUserNameOrAddress = R.ifElse(
    R.pathSatisfies(R.complement(R.isNil), ['data', 'userName']),
    getUserName,
    getAddress
  )

  const is = (userAddress) => R.compose(
    R.equals(userAddress),
    getAddress
  )

  return Object.freeze({
    getAddress,
    getUserNameOrAddress,
    is
  })
})()
