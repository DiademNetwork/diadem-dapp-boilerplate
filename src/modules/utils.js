import * as R from 'ramda'
import blockchains from 'configurables/blockchains'
import * as U from 'utils'
import { all, call } from 'redux-saga/effects'

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

export const createBaseSelector = (basePath) => (path) => R.path([...basePath, ...path])

export const oneOfTypes = (types) => R.compose(
  R.partialRight(R.contains, [types]),
  R.prop('type')
)

export const callForEachBlockchain = function * (apiFn, payload, responseTransformer = R.identity) {
  const results = yield all(U.mapKeys(name => call(apiFn(name), payload))(blockchains))
  return R.compose(
    R.zipObj(R.keys(blockchains)),
    R.map(responseTransformer)
  )(results)
}
