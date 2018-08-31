import React from 'react'
import { PropTypes as T } from 'prop-types'
import Support from './components/Support'
import { Card } from 'semantic-ui-react'

const Challenge = ({ title, author, link }) => (
  <Card raised fluid>
    <Card.Content>
      <Card.Header>{title}</Card.Header>
      <Card.Meta>Author: {author}</Card.Meta>
      <Card.Description><a target='_blank' href={link}>{link}</a></Card.Description>
    </Card.Content>
    <Card.Content extra textAlign='right'>
      <Support author={author} title={title} />
    </Card.Content>
  </Card>
)

Challenge.propTypes = {
  title: T.string,
  author: T.string,
  link: T.string
}

export default Challenge
