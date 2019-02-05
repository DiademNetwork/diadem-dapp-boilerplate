import * as R from 'ramda'

export default (function achievement () {
  const getActivities = (verb) => R.compose(
    R.filter(R.propEq('verb', verb)),
    R.prop('activities')
  )

  const getCreatorAddress = R.compose(
    R.path(['actor', 'id']),
    R.head,
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

  const isCreator = (userAddress) => R.ifElse(
    R.always(R.isNil(userAddress)),
    R.F,
    R.compose(
      R.equals(userAddress),
      R.prop('id'),
      firstActor('create')
    )
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
