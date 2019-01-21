import * as U from './index'

describe('Utils - achievement', () => {
  const achievement = {
    activities: [
      { verb: 'confirm' },
      { verb: 'create', actor: { id: '2' } },
      { verb: 'confirm' },
      { verb: 'support', actor: { id: '1' } }
    ],
    group: 'http://example.com'
  }

  it('getActivities', () => {
    expect(U.achievement.getActivities('confirm')(achievement)).toHaveLength(2)
  })

  it('getCreatorAddress', () => {
    expect(U.achievement.getCreatorAddress(achievement)).toEqual('2')
  })

  it('getLink', () => {
    expect(U.achievement.getLink(achievement)).toEqual('http://example.com')
  })
})
