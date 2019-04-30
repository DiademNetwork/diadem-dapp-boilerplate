import * as R from 'ramda'

export default (function achievement () {
  const getReactions = (kind) => R.path(['latest_reactions', kind])

  const getCreatorAddress = R.prop('actor')

  const getLink = R.prop('object')

  const hasAlready = (userAddress) => (kind) => R.compose(
    R.complement(R.isEmpty),
    R.filter(
      R.pathEq(['data', 'actor'], userAddress)
    ),
    getReactions(kind)
  )

  const firstActor = (kind) => R.compose(
    R.path(['data', 'actor']),
    R.head,
    getReactions(kind)
  )

  const isCreator = (userAddress) => R.ifElse(
    R.always(R.isNil(userAddress)),
    R.F,
    R.compose(
      R.equals(userAddress),
      R.prop('actor')
    )
  )

  const getAmount = kind => R.compose(
    R.sum,
    R.map(R.path(['data','amount'])),
    getReactions(kind)
  )

  return Object.freeze({
    getReactions,
    firstActor,
    getAmount,
    getCreatorAddress,
    getLink,
    hasAlready,
    isCreator
  })
})()
