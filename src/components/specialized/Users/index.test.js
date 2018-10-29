import React from 'react'
import { shallow } from 'enzyme'
import { NackedComponent as Users } from './index'
import Item from './Item'
import ReactDOM from 'react-dom'

const users = [{ userName: 'A' }, { userName: 'B' }]

describe('Users', () => {
  const div = document.createElement('div')

  describe('With users', () => {
    it('renders without crashing in DOM', () => {
      ReactDOM.render(<Users users={users} />, div)
      ReactDOM.unmountComponentAtNode(div)
    })

    it('snapshot', () => {
      const component = shallow(<Users users={users} />)
      expect(component).toMatchSnapshot()
    })

    it('As many Users items as users in list rendered', () => {
      const component = shallow(<Users users={users} />)
      expect(component.find(Item).length).toEqual(users.length)
    })
  })

  describe('Without users', () => {
    it('renders without crashing in DOM', () => {
      ReactDOM.render(<Users users={[]} />, div)
      ReactDOM.unmountComponentAtNode(div)
    })

    it('snapshot', () => {
      const component = shallow(<Users users={[]} />)
      expect(component).toMatchSnapshot()
    })

    it('Loading when no users and users being requested', () => {
      const component = shallow(<Users fetchStatus='requested' users={[]} />)
      expect(component.find(`[data-qa-id='no-user-text']`).text()).toEqual('Loading...')
    })

    it('No user text when no users and users not being requested', () => {
      const component = shallow(<Users users={[]} />)
      expect(component.find(`[data-qa-id='no-user-text']`).text()).toEqual('No user registered')
    })
  })
})
