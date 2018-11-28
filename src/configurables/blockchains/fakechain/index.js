import logo from './logo.jpg'
import faker from 'faker'

export default (function fakeChain () {
  const generateWallet = () => {
    const mnemonic = 'Here is a mnemonic for Fakechain ... What did you expect?'
    const privateKey = 'PrIv4t3K3yF0rF4K3ch4In'
    return { mnemonic, privateKey }
  }

  const getWalletBalanceData = async () => ({
    balance: faker.random.number(),
    balanceSat: faker.random.number(),
    totalReceived: faker.random.number(),
    totalReceivedSat: faker.random.number(),
    totalSent: faker.random.number(),
    totalSentSat: faker.random.number(),
    unconfirmedBalance: 0,
    unconfirmedBalanceSat: 0
  })

  return Object.freeze({
    key: 'fakechain',
    logo,
    name: 'Fakechain',
    getWalletBalanceData,
    generateWallet
  })
})()
