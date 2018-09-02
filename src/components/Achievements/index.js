import React, { Component } from 'react'
import { PropTypes as T } from 'prop-types'
import stream from 'getstream'
import { Container } from 'semantic-ui-react'
import Achievement from '../Achievement'
import withContainer from './container'

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

  render () {
    return (
      <Container>
        {this.props.achievements.map(achievement => {
          const { activities, id } = achievement
          const lastActivity = activities[activities.length - 1]
          return <Achievement key={id} {...lastActivity} />
        })}
      </Container>
    )
  }
}

Achievements.propTypes = {
  achievements: T.array.isRequired,
  fetchAchievements: T.func.isRequired
}

export default withContainer(Achievements)
