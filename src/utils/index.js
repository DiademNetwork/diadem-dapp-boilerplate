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
    R.ifElse(
      R.compose(R.equals(1), R.length),
      R.head,
      R.identity
    ),
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
    R.tap((x) => console.log('Yo man', x, userAddress)),
    R.filter(
      R.pathEq(['actor', 'id'], userAddress)
    ),
    R.tap((x) => console.log('Yo man 2', x)),
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

  return Object.freeze({
    firstActor,
    getActivities,
    getCreatorAddress,
    getLink,
    hasAlready,
    isCreator
  })
})()

export const actor = (function actor () {
  const getUserName = R.path(['data', 'userName'])

  const getAddress = R.prop('id')

  const is = (userAddress) => R.compose(
    R.equals(userAddress),
    getAddress
  )

  return Object.freeze({
    getAddress,
    getUserName,
    is
  })
})()
