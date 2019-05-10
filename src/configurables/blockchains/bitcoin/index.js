import btc from 'bitcoinjs-lib'
import axios from 'axios'
import { BigNumber } from 'bignumber.js'
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
const API_URL = 'https://chain.so/api/v2'

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
    const { address } = wallet
    return {
      mnemonic,
      privateKey: privateKeyEncoded,
      address
    }
  }

  const initFromMnemonic = (mnemonic) => {
    const seed = bip39.mnemonicToSeed(mnemonic)
    const hdMaster = btc.HDNode.fromSeedBuffer(Buffer.from(seed), NETWORK)
    const privateKeyRaw = hdMaster.derivePath('m/0')
    const privateKeyEncoded = privateKeyRaw.keyPair.toWIF()
    return initFromPrivateKey(privateKeyEncoded)
  }

  const initFromPrivateKey = (privateKey) => {
    const account = new btc.ECPair.fromWIF(privateKey, NETWORK)
    const address = account.getAddress()
    wallet = { privateKey, address }
    return wallet
  }

  const registerWallet = () => ({ ok: true })

  const getWalletData = async () => {
    const { address } = wallet
    const { data: { status, data } } = await axios.get(`${API_URL}/get_address_balance/BTC/${address}`)
    if (status === 'success') {
      return {
        address,
        balance: Number.parseFloat(data.confirmed_balance),
        unconfirmedBalance: Number.parseFloat(data.unconfirmed_balance)
      }
    } else {
      return null
    }
  }

  const withdraw = async ({ address, amount, fees }) => {
    const { privateKey } = wallet
    const keyPair = btc.ECPair.fromWIF(privateKey, NETWORK)
    const rawTransaction = await buildTransaction({
      from: wallet.address,
      to: address,
      feeValue: fees,
      amount
    })
    return broadcastTransaction(rawTransaction.toHex())
  }

  const buildTransaction = async ({ from, to, amount, feeValue }) => {
    const { privateKey } = wallet
    const keyPair = btc.ECPair.fromWIF(privateKey, NETWORK)

    const tx = new btc.TransactionBuilder(NETWORK)

    const unspents = await fetchUnspents()

    const fundValue     = new BigNumber(String(amount)).multipliedBy(1e8).integerValue().toNumber()
    const totalUnspent  = unspents.reduce((summ, { value }) => new BigNumber(String(value)).multipliedBy(1e8).plus(summ), 0)
    const skipValue     = totalUnspent.minus(fundValue).minus(feeValue).integerValue().toNumber()

    unspents.forEach(({ txid, output_no }) => tx.addInput(txid, output_no, 0xfffffffe))
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
      feeValue: metadata.fees.initial
    })
  }

  const fetchUnspents = async () => {
    const { address } = wallet
    const { data: { data: { txs } }} = await axios.get(`${API_URL}/get_tx_unspent/BTC/${address}`)
    return txs
  }

  const broadcastTransaction = async (rawTransaction) => {
    const response = await axios.post(`${API_URL}/send_tx/BTC`, {
      tx_hex: rawTransaction
    })
    const { txid } = response
    return txid
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
