import React from 'react'
import { PropTypes as T } from 'prop-types'
import Support from './components/Support'
import Confirm from './components/Confirm'
import { Card } from 'semantic-ui-react'

const Achievement = ({ confirms, target, title, wallet, link, rewards }) => (
  <Card raised fluid>
    <Card.Content>
      <Card.Header>{title}</Card.Header>
      <Card.Meta>Author: {wallet}</Card.Meta>
      {!!link &&
        <Card.Description>
          <a target='_blank' href={link}>Link to achievement</a><br />
          Rewards count: {rewards.length}<br />
          Confirms count: {confirms.length}
        </Card.Description>
      }
    </Card.Content>
    <Card.Content extra textAlign='right'>
      <Confirm target={target} />
      <Support author={wallet} title={title} />
    </Card.Content>
  </Card>
)

Achievement.propTypes = {
  confirms: T.array,
  rewards: T.array,
  target: T.string,
  title: T.string,
  link: T.string,
  wallet: T.string
}

export default Achievement
