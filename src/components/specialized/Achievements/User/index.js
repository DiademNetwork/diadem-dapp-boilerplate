import React, { Fragment } from 'react'
import List from './List'
import Create from './Create'

const UserAchievements = () => (
  <Fragment>
    <Create key="create-achievement" />
    <List />
  </Fragment>
)
export default UserAchievements
