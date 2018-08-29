import React, { Component } from 'react'
import styled from 'styled-components'
import stream from 'getstream'
import { Contract, QtumRPC } from 'qtumjs'
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
    const rpc = new QtumRPC('http://localhost:9888')
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

  render () {
    return (
      <Wrapper>
        <p>
          GetStream status: {this.client ? 'connected' : 'pending'}<br />
          Message from contract: {this.state.message}
        </p>
      </Wrapper>
    )
  }
}

App.defaultProps = {
  message: ''
}

export default App
