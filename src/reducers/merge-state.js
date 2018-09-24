import * as R from 'ramda'

export default R.mergeDeepWith((l, r) => {
  switch (true) {
    case R.is(Array, l) && R.is(Array, r):
      return R.concat(l, r)
    case R.is(Object, l) && R.is(Object, r):
      return R.mergeDeepRight(l, r)
    default:
      return r
  }
})
