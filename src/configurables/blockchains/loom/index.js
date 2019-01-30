import Web3 from 'web3'
import { Client, LocalAddress, CryptoUtils, LoomProvider } from 'loom-js'

import bip39 from './bip39.english.js'
import DiademCoin from './DiademCoin.json'
import Achievements from './Achievements.json'
import logo from './diadem.png'

const LOOM_URL = 'wss://diadem.host/loom'
const COIN_ADDRESS = '0x196BF6b1f68466121b99822cFde508fCc74ab3aB'
const ACHIEVEMENTS_ADDRESS = '0xaCc7bC52599Ec656AA66cE31d8915ad123E8A693'

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
    contracts.achievements = new web3.eth.Contract(Achievements.abi, ACHIEVEMENTS_ADDRESS, { from: wallet.address })
  }

  const getWalletData = async () => {
    const balanceWei = await contracts.token.methods.balanceOf(wallet.address).call()
    const balanceString = web3.utils.fromWei(balanceWei)
    const balance = Number.parseInt(balanceString)

    return {
      addrStr: wallet.address,
      balance: balance
    }
  }

  const withdraw = async ({ address, amount }) => {
    const weiAmount = web3.utils.toWei(amount)
    const receipt = await contracts.token.methods.transfer(address, weiAmount).send()
    return receipt
  }

  const supportAchievement = async ({ address, amount, link }) => {
    const weiAmount = web3.utils.toWei(amount)
    const receipt = await contracts.token.methods.supportAchievement(address, link, weiAmount).send()
    return receipt
  }

  const createAchievement = async ({ link, title }) => {
    await contracts.achievements.methods.create(link, title)
  }

  const confirmAchievement = async ({ creatorAddress, link }) => {
    await contracts.achievements.methods.confirmAchievement(creatorAddress, link)
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
    createAchievement: needsContracts(createAchievement),
    confirmAchievement: needsContracts(confirmAchievement),
    supportAchievement: needsContracts(supportAchievement),
    ...metadata
  })
})()
