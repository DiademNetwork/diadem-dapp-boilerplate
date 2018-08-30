import React, { Component } from 'react'
import styled from 'styled-components'
import stream from 'getstream'
import { Contract, QtumRPC } from 'qtumjs'
import FacebookLogin from 'react-facebook-login'
import repoData from '../../../solar.development.json'

const Wrapper = styled.div`
  align-items: center;
  color: #333;
  display: flex;
  font-family: monospace;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  line-height: 1.8;
  margin: 0 1em;
  text-align: center;

  > * {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    outline: none;
    user-select: none;
  }
`

export class App extends Component {
  state = {}

  initGetStreamClient () {
    this.client = stream.connect('96ejuzcvn842') // API secret of GetStream testapp
  }

  initQtum () {
    const rpc = new QtumRPC('https://qtum-testnet.iame.io/qtum-rpc/?apiKey=1073fc8109d1f784d6f6ed203c961fbf')
    const contract = new Contract(rpc, repoData.contracts.helloworld)
    this.rpc = rpc
    this.contract = contract
  }

  componentDidMount () {
    this.initGetStreamClient()
    this.initQtum()
    this.getContractMessage()
  }

  getContractMessage = async () => {
    const tx = await this.contract.call('message')
    const message = tx.outputs[0]
    this.setState({ message })
  }

  onLogin = ({ name }) => { // accessToken can be found here too if needed
    this.setState({ user: name })
  }

  render () {
    return (
      <Wrapper>
        <p>
          GetStream status: {this.client ? 'connected' : 'pending'}<br />
          Message from contract: {this.state.message}
          <br />
          <br />
          <FacebookLogin
            appId="2107292709536080"
            autoLoad
            fields="name,email,picture"
            callback={this.onLogin} />
        </p>
        <br />
        <br />
        User logged: {this.state.user}
      </Wrapper>
    )
  }
}

App.defaultProps = {
  message: '',
  user: 'nobody'
}

export default App
