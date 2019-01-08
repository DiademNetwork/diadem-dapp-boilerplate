import { Client, LocalAddress, CryptoUtils, LoomProvider } from "loom-js"

import bip39 from "./bip39.english.js"
import DiademCoin from './DiademCoin.json'
import logo from './logo.jpg'

const chainId = 'default'
const writeUrl = `${process.env.LOOM_URL}/websocket`
const readUrl = `${process.env.LOOM_URL}/queryws`

const metadata = {
  name: 'Loom',
  key: 'loom',
  symbol: 'LOOM',
  logo: logo,
  fees: {
    convert: (fees) => fees,
    initial: 0.1,
    max: 1,
    min: 0.001
  }
}

export default (function loom () {
  let web3 = null

  let wallet = {
    privateKey: null,
    address: null
  }

  let contracts = {
    token: null
  }

  const generateWallet = () => {
    const mnemonic = bip39.generateMnemonic()
    const seed = bip39.mnemonicToSeed(mnemonic)
    const privateKey = CryptoUtils.generatePrivateKeyFromSeed(mnemonic)
    return { mnemonic, privateKey }
  }

  const initFromMnemonic = async (mnemonic) => {
    const seed = bip39.mnemonicToSeed(mnemonic)
    const privateKey = CryptoUtils.generatePrivateKeyFromSeed(mnemonic)
    initFromPrivateKey(privateKey)
  }

  const initFromPrivateKey = async (privateKey) => {
    const publicKey = CryptoUtils.publicKeyFromPrivateKey(privateKey)
    const client = new Client(chainId, writeUrl, readUrl)
    wallet.privateKey = privateKey
    wallet.address = LocalAddress.fromPublicKey(publicKey).toString()
    web3 = new Web3(new LoomProvider(client, privateKey))
  }

  const initContracts = async () => {
    contracts.token = new web3.eth.Contract(DiademCoin.abi, { from: wallet.address })
  }

  const getWalletData = async () => {
    const balance = await token.methods.balanceOf(address).call({ from: wallet.address })

    return {
      addrStr: wallet.address,
      balance: balance
    }
  }

  const withdraw = async ({ address, amount, fees = 0 }) => {
    await contracts.token.methods.transfer(address, amount).send({ from: wallet.address })
  }

  const getPrivateKey = () => wallet.privateKey

  const needsWallet = fn => (...args) => {
    if (!wallet) {
      throw new Error('Wallet does not exist. Please initialize or generate it.')
    }
    fn(...args)
  }

  const needsContracts = fn => (...args) => {
    if (!contracts) {
      throw new Error('Contracts do not exists. Please initialize it.')
    }
    fn(...args)
  }

  return Object.freeze({
    generateWallet,
    initFromMnemonic,
    initFromPrivateKey,
    initContracts: needsWallet(initContracts),
    getPrivateKey: needsWallet(getPrivateKey),
    getWalletData: needsContracts(getWalletData),
    withdraw: needsContracts(withdraw),
    ...metadata
  })
})()
