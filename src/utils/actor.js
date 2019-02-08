import * as R from 'ramda'

export default (function actor () {
  const getAddress = R.prop('id')
  const getUserName = R.path(['data', 'userName'])

  const getUserNameOrAddress = R.ifElse(
    R.pathSatisfies(R.complement(R.isNil), ['data', 'userName']),
    getUserName,
    getAddress
  )

  const is = (userAddress) => R.ifElse(
    R.always(R.complement(R.isNil)(userAddress)),
    R.compose(
      R.equals(userAddress),
      getAddress
    ),
    R.F
  )

  return Object.freeze({
    getAddress,
    getUserName,
    getUserNameOrAddress,
    is
  })
})()
