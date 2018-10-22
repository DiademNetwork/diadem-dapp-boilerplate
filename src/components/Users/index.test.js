import React from 'react'
import { shallow } from 'enzyme'
import { Component as Users } from './index'
import Item from './Item'

const users = [{ userName: 'A' }, { userName: 'B' }]

describe('Users', () => {
  describe('With users', () => {
    it('renders without crashing', () => {
      const component = shallow(<Users users={users} />)
      expect(component).toMatchSnapshot()
    })

    it('As many Users items as users in list rendered', () => {
      const component = shallow(<Users users={users} />)
      expect(component.find(Item).length).toEqual(users.length)
    })
  })
  describe('Without users', () => {
    it('renders without crashing', () => {
      const component = shallow(<Users />)
      expect(component).toMatchSnapshot()
    })

    it('Loading when no users and users being requested', () => {
      const component = shallow(<Users fetchStatus='requested' users={[]} />)
      expect(component.find(`[data-qa-id='no-user-text']`).text()).toEqual('Loading...')
    })

    it('No user tecxt when no users and users not being requested', () => {
      const component = shallow(<Users users={[]} />)
      expect(component.find(`[data-qa-id='no-user-text']`).text()).toEqual('No user registered')
    })
  })
})
