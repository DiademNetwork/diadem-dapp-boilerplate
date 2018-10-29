import React from 'react'
import { shallow } from 'enzyme'
import { NackedComponent as Confirm } from './index'
import ReactDOM from 'react-dom'

describe('AchievementsChain > Confirm', () => {
  const div = document.createElement('div')
  let component
  let onConfirm = jest.fn()

  it('renders without crashing in DOM', () => {
    ReactDOM.render(<Confirm />, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it('button disabled when canUserConfirmCreateUpdateSupportDeposit is not specified', () => {
    component = shallow(<Confirm />)
    const button = component.find(`[data-qa-id='open-modal-button']`)
    expect(button.prop('disabled')).toEqual(true)
  })

  it('button disabled when actionAlreadyDone true', () => {
    component = shallow(<Confirm canUserConfirmCreateUpdateSupportDeposit actionAlreadyDone />)
    const button = component.find(`[data-qa-id='open-modal-button']`)
    expect(button.prop('disabled')).toEqual(true)
  })

  it('onConfirm called when confirm button is clicked', () => {
    component = shallow(<Confirm onConfirm={onConfirm} />)
    component.find(`[data-qa-id='confirm-button']`).simulate('click')
    expect(onConfirm).toHaveBeenCalledTimes(1)
  })

  it('modal closed when confirm button is clicked', () => {
    component = shallow(<Confirm onConfirm={onConfirm} />)
    component.setState({ modalOpen: true })
    component.find(`[data-qa-id='confirm-button']`).simulate('click')
    expect(component.state('modalOpen')).toEqual(false)
  })

  it('modal openned when open modal button is clicked', () => {
    component = shallow(<Confirm />)
    component.setState({ modalOpen: false })
    component.find(`[data-qa-id='open-modal-button']`).simulate('click')
    expect(component.state('modalOpen')).toEqual(true)
  })
})
