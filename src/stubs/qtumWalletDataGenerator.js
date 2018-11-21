import faker from 'faker'
import mocksController from '../mocks/controller'

const balance = (function () {
  const initial = {
    balance: faker.random.number(),
    balanceSat: faker.random.number(),
    totalReceived: faker.random.number(),
    totalReceivedSat: faker.random.number(),
    totalSent: faker.random.number(),
    totalSentSat: faker.random.number(),
    unconfirmedBalance: 0,
    unconfirmedBalanceSat: 0
  }

  const get = () => initial
  const set = (name) => (value) => { initial[name] = value }

  return { get, set }
})()

const transactions = (function () {
  const initial = {
    unconfirmedTxApperances: 0,
    txApperances: 2,
    transactions: [
      faker.random.uuid(),
      faker.random.uuid()
    ]
  }
  const get = () => initial
  const set = (name) => (value) => { initial[name] = value }

  return { get, set }
})()

const base = Object.freeze({ addrStr: faker.random.uuid() })

export default () => {
  const { pendingTxID } = mocksController.get()
  if (pendingTxID !== '') {
    transactions.set('transactions', [
      transactions.get()[0],
      pendingTxID
    ])
  }
  return {
    ...base,
    ...balance.get(),
    ...transactions.get()
  }
}
