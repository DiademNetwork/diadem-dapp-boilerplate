import faker from 'faker'
import mocksController from '../mocks/controller'

const getRandomInt = max => Math.floor(Math.random() * Math.floor(max))

const base = (opts = {}) => {
  const { userID, pendingTxID } = mocksController.get()
  return Object.freeze({
    actor: pendingTxID !== '' ? userID : faker.random.uuid(),
    foreign_id: '',
    id: faker.random.uuid(),
    name: faker.name.findName(),
    origin: null,
    target: pendingTxID !== '' ? pendingTxID : faker.random.uuid(),
    time: opts.recent ? `${new Date()}` : `${faker.date.past()}`
  })
}

const register = (opts = {}) => Object.freeze({
  ...base(opts),
  object: faker.random.uuid(),
  verb: 'register'
})

const create = (opts = {}) => Object.freeze({
  ...base(opts),
  object: faker.internet.url(),
  verb: 'create'
})

const update = (opts = {}) => Object.freeze({
  ...base(opts),
  object: faker.internet.url(),
  verb: 'update'
})

const confirm = (opts = {}) => Object.freeze({
  ...base(opts),
  object: faker.internet.url(),
  verb: 'confirm'
})

const support = (opts = {}) => Object.freeze({
  ...base(opts),
  object: faker.internet.url(),
  verb: 'support'
})

const deposit = (opts = {}) => Object.freeze({
  ...base(opts),
  object: faker.internet.url(),
  verb: 'deposit',
  witness: `${faker.random.number()}`,
  witnessName: faker.name.findName()
})

export default (opts) => {
  const random = getRandomInt(6)
  switch (random) {
    case 0: return register(opts)
    case 1: return create(opts)
    case 2: return update(opts)
    case 3: return confirm(opts)
    case 4: return support(opts)
    case 5: return deposit(opts)
  }
}
