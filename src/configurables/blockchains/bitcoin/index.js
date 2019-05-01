import btc from 'bitcoinjs-lib'
import axios from 'axios'
import bip39 from '../bip39.english.js'

import logo from './bitcoin.png'

const metadata = {
  name: 'Bitcoin',
  key: 'bitcoin',
  symbol: 'BTC',
  logo: logo,
  fees: {
    convert: (fees) => fees,
    initial: 25000,
    max: 100000,
    min: 15000
  }
}

const NETWORK = btc.networks.bitcoin
const INSIGHT_URL = 'https://insight.bitpay.com/api'

export default (function bitcoin() {
  let wallet = {
    privateKey: null,
    address: null
  }

  const generateWallet = () => {
    const mnemonic = bip39.generateMnemonic()
    const seed = bip39.mnemonicToSeed(mnemonic)
    const hdMaster = btc.HDNode.fromSeedBuffer(Buffer.from(seed), NETWORK)
    const privateKeyRaw = hdMaster.derivePath('m/0')
    const privateKeyEncoded = privateKeyRaw.keyPair.toWIF()
    initFromPrivateKey(privateKeyEncoded)
    return {
      mnemonic,
      privateKey: privateKeyEncoded
    }
  }

  const initFromMnemonic = (mnemonic) => {
    const seed = bip39.mnemonicToSeed(mnemonic)
    const hdMaster = btc.HDNode.fromSeedBuffer(Buffer.from(seed), NETWORK)
    const privateKeyRaw = hdMaster.derivePath('m/0')
    const privateKeyEncoded = privateKeyRaw.keyPair.toWIF()
    initFromPrivateKey(privateKeyEncoded)
  }

  const initFromPrivateKey = (privateKey) => {
    const account = new btc.ECPair.fromWIF(privateKey, NETWORK)
    const address = account.getAddress()
    wallet = { privateKey, address }
  }

  const registerWallet = () => ({ ok: true })

  const getWalletData = async () => {
    const { address } = wallet
    const { balance, unconfirmedBalance } = await axios.get(`${INSIGHT_URL}/addr/${address}`)
    return {
      addrStr: address,
      balance,
      unconfirmedBalance
    }
  }

  const withdraw = async ({ address, amount, fees }) => {
    const { privateKey } = wallet
    const keyPair = btc.ECPair.fromWIF(privateKey, NETWORK)
    const rawTransaction = await buildTransaction({
      from: wallet.address,
      to: address,
      feeValue: fees,
      amount,
    })
    broadcastTransaction(rawTransaction.toHex())
  }

  const buildTransaction = async ({ from, to, amount, feeValue }) => {
    const { privateKey } = wallet
    const keyPair = btc.ECPair.fromWIF(privateKey, NETWORK)

    const tx = new btc.TransactionBuilder(NETWORK)
    const unspents = await fetchUnspents()

    const fundValue     = new BigNumber(String(amount)).multipliedBy(1e8).integerValue().toNumber()
    const totalUnspent  = unspents.reduce((summ, { satoshis }) => summ + satoshis, 0)
    const skipValue     = totalUnspent - fundValue - feeValue

    unspents.forEach(({ txid, vout }) => tx.addInput(txid, vout, 0xfffffffe))
    tx.addOutput(to, fundValue)

    if (skipValue > 546) {
      tx.addOutput(wallet.address, skipValue)
    }

    tx.inputs.forEach((input, index) => {
      tx.sign(index, keyPair)
    })

    const txRaw = tx.buildIncomplete()

    return txRaw
  }

  const generateContractSendTx = async ({ address, amount }) => {
    return buildTransaction({
      from: wallet.address,
      to: address,
      amount,
      feeValue: 15000
    })
  }

  const fetchUnspents = () => {
    const { address } = wallet
    return axios.get(`${INSIGHT_URL}/addr/${address}/utxo`)
  }

  const broadcastTransaction = (rawTransaction) => {
    return axios.post(`${INSIGHT_URL}/tx/send`, {
      rawTx: rawTransaction
    })
  }

  const needsWallet = fn => async (...args) => {
    if (!wallet.address) {
      throw new Error('Wallet does not exist. Please initialize or generate it.')
    }
    return fn(...args)
  }

  return Object.freeze({
    generateWallet,
    registerWallet,
    initFromMnemonic,
    initFromPrivateKey,
    generateContractSendTx,
    getWalletData: needsWallet(getWalletData),
    withdraw: needsWallet(withdraw),
    ...metadata
  })
})()