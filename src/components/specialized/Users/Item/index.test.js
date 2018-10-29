import React from 'react'
import UserItem from './index'
import ReactDOM from 'react-dom'

describe('UserItem', () => {
  const div = document.createElement('div')

  it('renders without crashing in DOM', () => {
    ReactDOM.render(<UserItem />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
})
