import faker from 'faker'

export default {
  addrStr: faker.random.uuid(),
  balance: faker.random.number(),
  balanceSat: faker.random.number(),
  totalReceived: faker.random.number(),
  totalReceivedSat: faker.random.number(),
  totalSent: faker.random.number(),
  totalSentSat: faker.random.number(),
  unconfirmedBalance: 0,
  unconfirmedBalanceSat: 0,
  unconfirmedTxApperances: 0,
  txApperances: 2,
  transactions: [
    faker.random.uuid(),
    faker.random.uuid()
  ]
}
