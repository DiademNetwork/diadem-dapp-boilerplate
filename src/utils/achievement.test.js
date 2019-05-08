import * as U from './index'

describe('Utils - achievement', () => {
  const creator = '0x123'
  const witness = '0x456'
  const sponsor = '0x789'

  const achievement = {
    object: 'facebook.com/donate/object',
    actor: creator,
    verb: 'create',
    title: 'donation title',
    latest_reactions: {
      confirm: [{
        activity_id: '0e06202a-6b1a-11e9-9e42-02af563c44e0',
        kind: 'confirm',
        data: {actor: witness, time: 1},
        user_id: witness
      }],
      support: [{
        activity_id: '0e06202a-6b1a-11e9-9e42-02af563c44e0',
        kind: 'support',
        data: {actor: sponsor, amount: 10, time: 1},
        user_id: sponsor
      }, {
        activity_id: '0e06202a-6b1a-11e9-9e42-02af563c44e0',
        kind: 'support',
        data: {actor: sponsor, amount: 20, time: 1},
        user_id: sponsor
      }]
    }, reaction_counts: {confirm: 1, support: 2}
  }

  it('getReactions', () => {
    expect(U.achievement.getReactions('confirm')(achievement)).toHaveLength(1)
    expect(U.achievement.getReactions('support')(achievement)).toHaveLength(2)
  })

  it('getCreatorAddress', () => {
    expect(U.achievement.getCreatorAddress(achievement)).toEqual(creator)
  })

  it('getLink', () => {
    expect(U.achievement.getLink(achievement)).toEqual('facebook.com/donate/object')
  })

  it('hasAlready', () => {
    expect(U.achievement.hasAlready(witness)('confirm')(achievement)).toEqual(true)
    expect(U.achievement.hasAlready(sponsor)('support')(achievement)).toEqual(true)
    expect(U.achievement.hasAlready(sponsor)('confirm')(achievement)).toEqual(false)
    expect(U.achievement.hasAlready(witness)('support')(achievement)).toEqual(false)
  })

  it('firstActor', () => {
    expect(U.achievement.firstActor('support')(achievement)).toEqual(sponsor)
  })

  it('isCreator', () => {
    expect(U.achievement.isCreator(creator)(achievement)).toEqual(true)
    expect(U.achievement.isCreator(sponsor)(achievement)).toEqual(false)
    expect(U.achievement.isCreator(witness)(achievement)).toEqual(false)
  })

  it('getAmount', () => {
    expect(U.achievement.getAmount('support')(achievement)).toEqual(30)
  })
})
