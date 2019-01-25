import Web3 from 'web3'
import { Client, LocalAddress, CryptoUtils, LoomProvider } from 'loom-js'

import bip39 from './bip39.english.js'
import DiademCoin from './Diadem.json'
import logo from './diadem.png'

const LOOM_URL = 'ws://diadem.host:46658'
const COIN_ADDRESS = '0xB681FBf4b36c49e0811Ee640CcA1933aB57Be81e'

const chainId = 'default'
const writeUrl = `${LOOM_URL}/websocket`
const readUrl = `${LOOM_URL}/queryws`

const metadata = {
  name: 'Diadem',
  key: 'loom',
  symbol: 'DDM',
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
    const privateKeyRaw = CryptoUtils.generatePrivateKeyFromSeed(seed)
    const privateKeyEncoded = CryptoUtils.Uint8ArrayToB64(privateKeyRaw)
    initFromPrivateKey(privateKeyEncoded)
    return {
      mnemonic,
      privateKey: privateKeyEncoded
    }
  }

  const initFromMnemonic = (mnemonic) => {
    const seed = bip39.mnemonicToSeed(mnemonic)
    const privateKeyRaw = CryptoUtils.generatePrivateKeyFromSeed(seed)
    const privateKeyEncoded = CryptoUtils.Uint8ArrayToB64(privateKeyRaw)
    initFromPrivateKey(privateKeyEncoded)
  }

  const initFromPrivateKey = (privateKeyEncoded) => {
    const privateKeyRaw = CryptoUtils.B64ToUint8Array(privateKeyEncoded)
    const publicKey = CryptoUtils.publicKeyFromPrivateKey(privateKeyRaw)
    const client = new Client(chainId, writeUrl, readUrl)
    wallet.privateKey = privateKeyEncoded
    wallet.address = LocalAddress.fromPublicKey(publicKey).toString()
    web3 = new Web3(new LoomProvider(client, privateKeyRaw))
    initContracts()
  }

  const registerWallet = () => ({ ok: true })

  const initContracts = async () => {
    contracts.token = new web3.eth.Contract(DiademCoin.abi, COIN_ADDRESS, { from: wallet.address })
  }

  const getWalletData = async () => {
    const balanceString = await contracts.token.methods.balanceOf(wallet.address).call({ from: wallet.address })
    const balance = Number.parseInt(balanceString)

    return {
      addrStr: wallet.address,
      balance: balance
    }
  }

  const withdraw = async ({ address, amount, fees = 0 }) => {
    await contracts.token.methods.transfer(address, new web3.utils.BN(amount)).send({ from: wallet.address })
  }

  const getPrivateKey = () => wallet.privateKey

  const needsWallet = fn => (...args) => {
    if (!wallet.address) {
      throw new Error('Wallet does not exist. Please initialize or generate it.')
    }
    return fn(...args)
  }

  const needsContracts = fn => (...args) => {
    if (!contracts.token) {
      throw new Error('Contracts do not exists. Please initialize it.')
    }
    return fn(...args)
  }

  return Object.freeze({
    generateWallet,
    registerWallet,
    initFromMnemonic,
    initFromPrivateKey,
    initContracts: needsWallet(initContracts),
    getPrivateKey: needsWallet(getPrivateKey),
    getWalletData: needsContracts(getWalletData),
    withdraw: needsContracts(withdraw),
    ...metadata
  })
})()
