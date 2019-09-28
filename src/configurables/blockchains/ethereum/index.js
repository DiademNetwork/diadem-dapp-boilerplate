import Web3 from 'web3'
import axios from 'axios'
import { BigNumber } from 'bignumber.js'
import bip39 from '../bip39.english.js'
import logo from './ethereum.png'

const API_URL = 'https://api.blockchair.com/ethereum'

const metadata = {
  name: 'Ethereum',
  key: 'ethereum',
  symbol: 'ETH',
  logo: logo,
  fees: {
    convert: (fees) => fees,
    initial: 20*1e9,
    max: 100*1e9,
    min: 1*1e9
  }
}

export default (function ethereum() {
  let web3 = new Web3()

  let wallet = {
    privateKey: null,
    address: null
  }

  const generateWallet = () => {
    const mnemonic = bip39.generateMnemonic()
    initFromMnemonic(mnemonic)
    const { privateKey, address } = wallet
    return {
      mnemonic,
      privateKey,
      address
    }
  }

  const initFromMnemonic = (mnemonic) => {
    const entropy = bip39.mnemonicToEntropy(mnemonic)
    wallet = web3.eth.accounts.create(entropy)
    return wallet
  }

  const initFromPrivateKey = (privateKey) => {
    wallet = web3.eth.accounts.privateKeyToAccount(privateKey)
    return wallet
  }

  const registerWallet = () => ({ ok: true })

  const fetchWalletData = async () => {
    const walletAddress = wallet.address.toLowerCase()
    const response = await axios.get(`${API_URL}/dashboards/address/${walletAddress}`)
    const {
      data: {
        data: {
          [walletAddress]: {
            address: walletData
          }
        }
      }
    } = response
    return walletData
  }

  const getWalletData = async () => {
    const { balance: balanceWei } = await fetchWalletData()
    const balance = web3.utils.fromWei(Number(balanceWei).toString())
    return {
      address: wallet.address,
      balance: Number(balance)
    }
  }

  const signTransaction = async ({ address, weiAmount, fees }) => {
    const { privateKey } = wallet
    const { spending_call_count } = await fetchWalletData()
    const params = {
      to: address,
      value: weiAmount,
      gas: 21000,
      gasPrice: fees,
      nonce: spending_call_count,
      chainId: 1
    }
    const { rawTransaction } = await web3.eth.accounts.signTransaction(params, privateKey)
    return rawTransaction
  }

  const generateContractSendTx = async ({ address, amount }) => {
    const weiAmount = web3.utils.toWei(amount)
    const fees = metadata.fees.initial
    const rawTransaction = await signTransaction({ address, weiAmount, fees })
    return rawTransaction
  }

  const withdraw = async ({ address, amount, fees }) => {
    const weiAmount = web3.utils.toWei(amount)
    const rawTransaction = await signTransaction({ address, weiAmount, fees })
    const transactionHash = await broadcastTransaction(rawTransaction)
    return transactionHash
  }

  const broadcastTransaction = async (rawTransaction) => {
    const response = await axios.post(`${API_URL}/push/transaction`, {
      data: rawTransaction
    })
    const {
      data: {
        data: { transaction_hash }
      }
    } = response
    return transaction_hash
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
    generateContractSendTx,
    withdraw,
    ...metadata
  })
})()
