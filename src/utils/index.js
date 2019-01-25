import * as R from 'ramda'
import achievementUtil from './achievement'
import actorUtil from './actor'

export const mapObj = fn => obj => R.compose(
  R.addIndex(R.map)((key, idx) => fn(obj[key], idx)),
  R.keys
)(obj)

export const mapKeys = fn => obj => R.compose(
  R.map(fn),
  R.keys
)(obj)

export const oneOf = array => R.partialRight(R.contains, [array])

export const achievement = achievementUtil

export const actor = actorUtil
