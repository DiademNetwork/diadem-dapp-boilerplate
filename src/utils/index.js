import * as R from 'ramda'

export const mapObj = fn => obj => R.compose(
  R.map(key => fn(obj[key])),
  R.keys
)(obj)

export const mapKeys = fn => obj => R.compose(
  R.map(fn),
  R.keys
)(obj)
