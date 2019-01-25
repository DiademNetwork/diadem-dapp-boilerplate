import * as U from './index'

describe('Utils - achievement', () => {
  const actor = {
    id: '1'
  }

  it('getAddress', () => {
    expect(U.actor.getAddress(actor)).toEqual('1')
  })
})
