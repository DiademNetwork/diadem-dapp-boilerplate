import React from 'react'
import * as R from 'ramda'
import AchievementsList from 'components/shared/AchievementsList'
import withContainer from './container'

const AllAchievementsList = (props) => (
  <AchievementsList {...props} noAchievementText='No achievements' />
)

export default R.compose(
  withContainer
)(AllAchievementsList)
