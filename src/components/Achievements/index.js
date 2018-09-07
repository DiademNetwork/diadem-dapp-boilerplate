import React, { Component } from 'react'
import { PropTypes as T } from 'prop-types'
import { Container } from 'semantic-ui-react'
import Achievement from './components/Achievement'
import Create from './components/Create'
import withContainer from './container'
import * as R from 'ramda'

class Achievements extends Component {
  componentDidMount () {
    this.props.fetchAchievements()
  }

  extractCreatedAchievements = R.compose(
    R.reduce((acc, curr) => ({ ...acc, [curr.object]: curr }), {}),
    R.reduce(R.concat, []),
    R.map(R.prop('activities')),
    R.filter(R.propEq('group', 'create'))
  )

  aggregate = (singular, plural) => achievementsData => createdAchievements => {
    return R.keys(createdAchievements).reduce((acc, curr) => {
      const actions = R.compose(
        R.reduce(R.concat, []),
        R.map(R.prop('activities')),
        R.filter(R.propEq('group', `${singular}_${curr}`))
      )(achievementsData)
      return {
        ...acc,
        [curr]: {
          ...createdAchievements[curr],
          [plural]: actions
        }
      }
    }, {})
  }

  render () {
    const { achievementsData } = this.props
    const achievements = R.compose(
      this.aggregate('confirm', 'confirms')(achievementsData),
      this.aggregate('reward', 'rewards')(achievementsData),
      this.extractCreatedAchievements
    )(achievementsData)
    return (
      <Container>
        <Create />
        {R.keys(achievements).map(name => (
          <Achievement key={name} {...achievements[name]} />
        ))}
      </Container>
    )
  }
}

Achievements.propTypes = {
  achievementsData: T.array.isRequired,
  fetchAchievements: T.func.isRequired
}

export default withContainer(Achievements)
