import * as R from 'ramda'

export default (function actor () {
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
    getUserName,
    getUserNameOrAddress,
    is
  })
})()
