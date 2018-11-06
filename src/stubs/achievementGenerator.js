import faker from 'faker'
import * as R from 'ramda'

const getRandomInt = max => Math.floor(Math.random() * Math.floor(max))
const getRandomRange = max => R.range(0, getRandomInt(max))

const create = () => {
  const link = faker.internet.url()
  return Object.freeze({
    actor: `${faker.random.number()}`,
    contentHash: faker.random.alphaNumeric(),
    foreign_id: `create_${link}`,
    id: faker.random.uuid(),
    name: faker.name.findName(),
    object: link,
    origin: null,
    target: faker.random.uuid(),
    time: `${faker.date.past()}`,
    title: faker.name.title(),
    verb: 'create',
    wallet: faker.random.uuid() // Dev QTUM address better
  })
}

const update = (base) => Object.freeze({
  ...base,
  contentHash: faker.random.alphaNumeric(),
  creatorAccount: faker.random.number(),
  creatorName: faker.name.findName(),
  foreign_id: `update_${faker.internet.url()}`,
  title: faker.name.title(),
  time: `${faker.date.past()}`,
  previousLink: base.object,
  verb: 'update'
})

const confirm = (base) => Object.freeze({
  ...base,
  actor: `${faker.random.number()}`,
  address: faker.random.uuid(),
  creatorAccount: `${faker.random.number()}`,
  creatorName: faker.name.findName(),
  foreign_id: `confirm_${base.object}`,
  time: `${faker.date.past()}`,
  verb: 'confirm',
  witness: `${faker.random.number()}`,
  witnessAddress: faker.random.uuid(), // Dev QTUM address better
  witnessName: faker.name.findName()
})

const support = (base) => Object.freeze({
  ...base,
  actor: `${faker.random.number()}`,
  amount: faker.random.number(),
  creatorAccount: `${faker.random.number()}`,
  creatorName: faker.name.findName(),
  foreign_id: `support_${base.object}`,
  time: `${faker.date.past()}`,
  verb: 'support'
})

const deposit = (base) => Object.freeze({
  ...base,
  actor: `${faker.random.number()}`,
  amount: faker.random.number(),
  creatorAccount: `${faker.random.number()}`,
  foreign_id: `deposit_${base.object}`,
  time: `${faker.date.past()}`,
  witness: `${faker.random.number()}`,
  witnessAddress: faker.random.uuid(), // Dev QTUM address better
  witnessName: faker.name.findName()
})

const actions = base => [
  ...getRandomRange(5).map(() => confirm(base)),
  ...getRandomRange(3).map(() => support(base)),
  ...getRandomRange(2).map(() => deposit(base))
]

export default () => {
  const base = create()
  const baseActions = actions(base)
  const firstUpdate = getRandomInt(2) === 1 ? [ update(base) ] : []
  const firstUpdateActions = firstUpdate.length > 0 ? actions(firstUpdate[0]) : []
  return [
    base,
    ...firstUpdate,
    ...baseActions,
    ...firstUpdateActions
  ]
}
