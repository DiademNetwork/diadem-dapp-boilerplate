import React from 'react'
import { shallow } from 'enzyme'
import UserItem from './index'

describe('UserItem', () => {
  it('renders without crashing', () => {
    const component = shallow(<UserItem />)
    expect(component).toMatchSnapshot()
  })
})
