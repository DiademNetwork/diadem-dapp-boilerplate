// Jest documentation https://facebook.github.io/jest/docs/en/getting-started.html
// Enzyme documentation http://airbnb.io/enzyme/docs/api/

import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import { App } from '../'

describe('App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<App />, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it('renders right - Snapshot example', () => {
    const component = shallow(<App />)
    expect(component).toMatchSnapshot()
  })
})
