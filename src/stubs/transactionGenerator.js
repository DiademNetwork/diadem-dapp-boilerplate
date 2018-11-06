import faker from 'faker'

const getRandomInt = max => Math.floor(Math.random() * Math.floor(max))

const register = () => Object.freeze({
  actor: faker.random.uuid(),
  foreign_id: '',
  id: faker.random.uuid(),
  name: faker.name.findName(),
  object: faker.random.uuid(),
  origin: null,
  target: faker.random.uuid(),
  time: `${faker.date.past()}`,
  verb: 'register'
})

const create = () => Object.freeze({
  ...register(),
  object: faker.internet.url(),
  verb: 'create'
})

const update = () => Object.freeze({
  ...register(),
  object: faker.internet.url(),
  verb: 'update'
})

const confirm = () => Object.freeze({
  ...register(),
  object: faker.internet.url(),
  verb: 'confirm'
})

const support = () => Object.freeze({
  ...register(),
  object: faker.internet.url(),
  verb: 'support'
})

const deposit = () => Object.freeze({
  ...register(),
  object: faker.internet.url(),
  verb: 'deposit',
  witness: `${faker.random.number()}`,
  witnessName: faker.name.findName()
})

export default () => {
  const random = getRandomInt(6)
  switch (random) {
    case 0: return register()
    case 1: return create()
    case 2: return update()
    case 3: return confirm()
    case 4: return support()
    case 5: return deposit()
  }
}
