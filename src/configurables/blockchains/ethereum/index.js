import Web3 from 'web3'

import bip39 from '../bip39.english.js'
import logo from './ethereum.png'

const PROVIDER_URL = 'https://mainnet.infura.io/v3/cd8401520b5e4bce93716ee0eebf277a'

const metadata = {
  name: 'Ethereum',
  key: 'ethereum',
  symbol: 'ETH',
  logo: logo,
  fees: {
    convert: (fees) => fees,
    initial: 2*1e9,
    max: 10*1e9,
    min: 0.1*1e9
  }
}

export default (function ethereum() {
  let web3 = null

  let wallet = {
    privateKey: null,
    address: null
  }

  const generateWallet = () => {
    web3 = new Web3(new Web3.providers.HttpProvider(PROVIDER_URL))
    const mnemonic = bip39.generateMnemonic()
    initFromMnemonic(mnemonic)
    const { privateKey } = wallet
    return {
      mnemonic,
      privateKey
    }
  }

  const initFromMnemonic = (mnemonic) => {
    const entropy = bip39.mnemonicToEntropy(mnemonic)
    wallet = web3.eth.accounts.create(entropy)
  }

  const initFromPrivateKey = (privateKey) => {
    wallet = web3.eth.accounts.privateKeyToAccount(privateKey)
  }

  const registerWallet = () => ({ ok: true })

  const getWalletData = async () => {
    const { address } = wallet
    const balanceWei = await web3.eth.getBalance(address)
    const balance = web3.utils.fromWei(balanceWei)

    return {
      addrStr: address,
      balance: balance
    }
  }

  const withdraw = async ({ address, amount, fees }) => {
    const { privateKey } = wallet
    const weiAmount = web3.utils.toWei(amount)
    const params = {
      to: address,
      value: weiAmount,
      gasPrice: fees,
      gas: 21000
    }
    const { rawTransaction } = await web3.eth.accounts.signTransaction(params, privateKey)
    const receipt = await web3.eth.sendSignedTransaction(rawTransaction)
    return receipt
  }

  const needsWallet = fn => async (...args) => {
    if (!web3.eth.defaultAccount) {
      throw new Error('Wallet does not exist. Please initialize or generate it.')
    }
    return fn(...args)
  }

  return Object.freeze({
    generateWallet,
    registerWallet,
    initFromMnemonic,
    initFromPrivateKey,
    getWalletData,
    withdraw,
    ...metadata
  })
})()