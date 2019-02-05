import * as U from './index'

describe('Utils - achievement', () => {
  const actor1 = { id: '1' }
  const actor2 = { id: '2' }
  const actor3 = { id: '3' }
  const achievement = {
    activities: [
      { verb: 'confirm' },
      { verb: 'create', actor: actor2 },
      { verb: 'confirm' },
      { verb: 'support', actor: actor3, amount: 2 },
      { verb: 'support', actor: actor1, amount: 1 }
    ],
    group: 'http://example.com'
  }

  it('getActivities', () => {
    expect(U.achievement.getActivities('confirm')(achievement)).toHaveLength(2)
  })

  it('getCreatorAddress', () => {
    expect(U.achievement.getCreatorAddress(achievement)).toEqual(actor2.id)
  })

  it('getLink', () => {
    expect(U.achievement.getLink(achievement)).toEqual('http://example.com')
  })

  it('hasAlready', () => {
    expect(U.achievement.hasAlready('2')('create')(achievement)).toEqual(true)
    expect(U.achievement.hasAlready('2')('support')(achievement)).toEqual(false)
  })

  it('firstActor', () => {
    expect(U.achievement.firstActor('support')(achievement)).toEqual(actor3)
  })

  it('isCreator', () => {
    expect(U.achievement.isCreator('2')(achievement)).toEqual(true)
    expect(U.achievement.isCreator(undefined)(achievement)).toEqual(false)
    expect(U.achievement.isCreator('3')(achievement)).toEqual(false)
  })

  it('getAmount', () => {
    expect(U.achievement.getAmount('support')(achievement)).toEqual(3)
  })
})
