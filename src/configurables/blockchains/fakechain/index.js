import logo from './logo.jpg'
import faker from 'faker'
import mocksController from '../../../mocks/controller'

export default (function fakeChain () {
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

  const generateWallet = () => {
    const mnemonic = 'Here is a mnemonic for Fakechain ... What did you expect?'
    const privateKey = 'PrIv4t3K3yF0rF4K3ch4In'
    return { mnemonic, privateKey }
  }

  const getWalletData = async () => {
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

  const initFromPrivateKey = () => {
    console.log('Fakechain initialized')
  }

  const initFromMnemonic = () => {
    console.log('Fakechain initialized')
  }

  const getPrivateKey = () => 'PrIv4t3K3yF0rF4K3ch4In'

  return Object.freeze({
    initFromMnemonic,
    initFromPrivateKey,
    key: 'fakechain',
    logo,
    name: 'Fakechain',
    getWalletData,
    generateWallet,
    getPrivateKey,
    symbol: 'FKC'
  })
})()
