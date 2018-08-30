import React from 'react'
import { PropTypes as T } from 'prop-types'
import { Button, Card, Modal, Form } from 'semantic-ui-react'

const Challenge = ({ title, author, link }) => (
  <Card raised fluid>
    <Card.Content>
      <Card.Header>{title}</Card.Header>
      <Card.Meta>Author: {author}</Card.Meta>
      <Card.Description><a target='_blank' href={link}>{link}</a></Card.Description>
    </Card.Content>
    <Card.Content extra textAlign='right'>
      <Modal
        trigger={
          <Button basic color='green'>
            Support
          </Button>
        }
      >
        <Modal.Header>Support - {title}</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form>
              <Form.Field>
                <label>Please enter an amount</label>
                <input placeholder='Amount' />
              </Form.Field>
              <Button type='submit'>Submit</Button>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    </Card.Content>
  </Card>
)

Challenge.propTypes = {
  title: T.string,
  author: T.string,
  link: T.string
}

export default Challenge
