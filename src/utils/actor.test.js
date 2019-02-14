import * as U from './index'

describe('Utils - achievement', () => {
  const actorA = {
    data: {
      userName: 'john'
    },
    id: '1'
  }

  const actorB = {
    id: '2'
  }

  it('getAddress', () => {
    expect(U.actor.getAddress(actorA)).toEqual('1')
  })

  it('getUserNameOrAddress', () => {
    expect(U.actor.getUserNameOrAddress(actorA)).toEqual('john')
    expect(U.actor.getUserNameOrAddress(actorB)).toEqual('2')
  })

  it('is', () => {
    expect(U.actor.is('2')(actorA)).toEqual(false)
    expect(U.actor.is('1')(actorA)).toEqual(true)
    expect(U.actor.is(undefined)({})).toEqual(false)
  })
})
