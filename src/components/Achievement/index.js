import React from 'react'
import { PropTypes as T } from 'prop-types'
import Support from './components/Support'
import Confirm from './components/Confirm'
import { Card } from 'semantic-ui-react'

const Achievement = ({ target, title, author, link }) => (
  <Card raised fluid>
    <Card.Content>
      <Card.Header>{title}</Card.Header>
      <Card.Meta>Author: {author}</Card.Meta>
      {!!link &&
        <Card.Description><a target='_blank' href={link}>Link to achievement</a></Card.Description>
      }
    </Card.Content>
    <Card.Content extra textAlign='right'>
      <Confirm target={target} />
      <Support author={author} title={title} />
    </Card.Content>
  </Card>
)

Achievement.propTypes = {
  target: T.string,
  title: T.string,
  author: T.string,
  link: T.string
}

export default Achievement
