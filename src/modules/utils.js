import * as R from 'ramda'

export const merge = R.mergeDeepWith((state, object) => {
  switch (true) {
    case R.is(Array, state) && R.is(Array, object): return R.concat(state, object)
    case R.is(Object, state) && R.is(Object, object): return R.mergeDeepRight(state, object)
    default: return object
  }
})

export const createAsyncTypes = (base) => ({
  requested: `${base}_REQUESTED`,
  errored: `${base}_ERRORED`,
  failed: `${base}_FAILED`,
  succeeded: `${base}_SUCCEEDED`
})

export const createAction = (type, payload = {}) => ({ type, ...payload })

export const createAsyncActions = (asyncType) => ({
  requested: R.partial(createAction, [asyncType.requested]),
  errored: R.partial(createAction, [asyncType.errored]),
  succeeded: R.partial(createAction, [asyncType.succeeded]),
  failed: R.partial(createAction, [asyncType.failed])
})
