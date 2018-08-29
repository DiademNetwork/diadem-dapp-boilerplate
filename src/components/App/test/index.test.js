// Jest documentation https://facebook.github.io/jest/docs/en/getting-started.html
// Enzyme documentation http://airbnb.io/enzyme/docs/api/

import React from 'react'
import { shallow } from 'enzyme'
import { App } from '../'

describe('App', () => {
  it('Snapshot', () => {
    const component = shallow(<App />)
    expect(component).toMatchSnapshot()
  })
})
