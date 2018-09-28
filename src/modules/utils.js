import * as R from 'ramda'

export const merge = R.mergeDeepWith((state, object) => {
  switch (true) {
    case R.is(Array, state) && R.is(Array, object): return R.concat(state, object)
    case R.is(Object, state) && R.is(Object, object): return R.mergeDeepRight(state, object)
    default: return object
  }
})

const ASYNC_STATES = ['requested', 'errored', 'failed', 'succeeded']

export const createAsyncTypes = (base) =>
  R.reduce((acc, curr) => R.merge(acc, { [curr]: `${base}_${curr.toUpperCase()}` }), {}, ASYNC_STATES)

export const createAction = type => payload => ({ type, ...payload })

export const createAsyncActions = R.mapObjIndexed(createAction)
