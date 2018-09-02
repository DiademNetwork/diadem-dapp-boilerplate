import React, { Component } from 'react'
import Login from '../Login'

import {
  Container,
  // Button,
  Menu,
  Visibility
  // Modal
} from 'semantic-ui-react'

const menuStyle = {
  border: 'none',
  borderRadius: 0,
  boxShadow: 'none',
  marginBottom: '1em',
  marginTop: '4em',
  transition: 'box-shadow 0.5s ease, padding 0.5s ease'
}

const fixedMenuStyle = {
  backgroundColor: '#fff',
  border: '1px solid #ddd',
  boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)'
}

export default class Nav extends Component {
  state = {
    menuFixed: false,
    overlayFixed: false
  }

  stickTopMenu = () => this.setState({ menuFixed: true })

  unStickTopMenu = () => this.setState({ menuFixed: false })

  render () {
    const { menuFixed } = this.state

    return (
      <div>
        <Visibility
          onBottomPassed={this.stickTopMenu}
          onBottomVisible={this.unStickTopMenu}
          once={false}
        >
          <Menu
            borderless
            fixed={menuFixed ? 'top' : null}
            style={menuFixed ? fixedMenuStyle : menuStyle}
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
        </Visibility>
      </div>
    )
  }
}
