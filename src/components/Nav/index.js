import React, { Component } from 'react'
import Login from './components/Login'

import {
  Container,
  Menu
} from 'semantic-ui-react'

const fixedMenuStyle = {
  backgroundColor: '#fff',
  border: '1px solid #ddd',
  boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)'
}

export default class Nav extends Component {
  openWallet = () => {
    console.log('open wallet')
  }
  render () {
    return (
      <Menu
        borderless
        fixed='top'
        style={fixedMenuStyle}
        fluid
      >
        <Container>
          <Menu.Item header>Diadem network</Menu.Item>
          <Menu.Menu position='right'>
            <Menu.Item>
              <Login />
            </Menu.Item>
            {/* <Menu.Item position='right'>
              <Modal
                trigger={
                  <Button color='teal'>
                    Create a Achievement
                  </Button>
                }
              >
                <Modal.Header>Create an Achievement</Modal.Header>
                <Modal.Content>
                  <Modal.Description>
                    Create Achievement form here
                  </Modal.Description>
                </Modal.Content>
              </Modal>
            </Menu.Item> */}
          </Menu.Menu>
        </Container>
      </Menu>
    )
  }
}
