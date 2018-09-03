import React, { Component } from 'react'
import { PropTypes as T } from 'prop-types'
import stream from 'getstream'
import { Container } from 'semantic-ui-react'
import Achievement from './components/Achievement'
import withContainer from './container'
import * as R from 'ramda'

class Achievements extends Component {
  state = {
    client: null
  }

  async fetchAchievements () {
    const client = this.state.client || stream.connect(process.env.STREAM_KEY, null, process.env.STREAM_APPID)
    this.props.fetchAchievements({ client })
  }

  componentDidMount () {
    this.fetchAchievements()
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
    console.log(achievementsData)
    const achievements = R.compose(
      this.aggregate('confirm', 'confirms')(achievementsData),
      this.aggregate('reward', 'rewards')(achievementsData),
      this.extractCreatedAchievements
    )(achievementsData)
    console.log(achievements)
    return (
      <Container>
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
