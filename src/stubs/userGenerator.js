import faker from 'faker'

export default () => Object.freeze({
  userAddress: faker.random.uuid(),
  userAccount: faker.random.number(),
  userName: faker.name.findName()
})
