import logo from './logo.png'

import bip39 from './bip39.english.js'
import nacl from 'tweetnacl'
import Base58 from 'base-58'

const metadata = {
  name: 'Credits',
  key: 'credits',
  symbol: 'CS',
  logo: logo,
  fees: {
    convert: (fees) => fees,
    initial: 0.1,
    max: 1,
    min: 0.001
  }
}

export default (function credits () {
  let wallet = {
    privateKey: null,
    address: null
  }

  const registerWallet = () => ({ ok: true })

  const generateWallet = () => {
    const mnemonic = bip39.generateMnemonic()
    const seed = bip39.mnemonicToSeed(mnemonic)
    const keyPair = nacl.sign.keyPair.fromSeed(seed)
    const privateKey = Base58.encode(keyPair.secretKey)
    initFromPrivateKey(privateKey)
    return { mnemonic, privateKey }
  }

  const initFromMnemonic = (mnemonic) => {
    const seed = bip39.mnemonicToSeed(mnemonic)
    const keyPair = nacl.sign.keyPair.fromSeed(seed)
    const privateKey = Base58.encode(keyPair.secretKey)
    initFromPrivateKey(privateKey)
  }

  const initFromPrivateKey = (privateKey) => {
    const keyPair = nacl.sign.keyPair.fromSecretKey(Buffer.from(Base58.decode(privateKey), 'base64'))
    const publicKey = keyPair.publicKey
    const address = Base58.encode(publicKey)
    wallet = { privateKey, publicKey, address }
  }

  const getPrivateKey = () => wallet.privateKey

  const getWalletData = async () => {
    const balance = await getBalance()

    return {
      addrStr: wallet.address,
      balance: balance
    }
  }

  const needsWallet = fn => (...args) => {
    if (!wallet) {
      throw new Error('Wallet does not exist')
    }
    return fn(...args)
  }

  const withdraw = ({ address, amount }) => {
    const options = {
      address,
      amount,
      publicKey: wallet.publicKey,
      privateKey: Base58.decode(wallet.privateKey)
    }

    return new Promise((resolve) => {
      window.transferCredits(options, (err, result) => {
        console.log(result)
        resolve()
      })
    })
  }

  const supportAchievement = ({ creatorAddress, amount }) => {
    const options = {
      address: creatorAddress,
      amount,
      publicKey: wallet.publicKey,
      privateKey: Base58.decode(wallet.privateKey)
    }

    console.log('support', options)

    return new Promise((resolve) => {
      window.transferCredits(options, (err, result) => {
        console.log(result)
        resolve()
      })
    })
  }

  const createAchievement = async ({ link, title }) => {
    await contracts.achievements.methods.create(link, title).send()
  }

  const confirmAchievement = async ({ creatorAddress, link }) => {
    await contracts.achievements.methods.confirm(creatorAddress, link).send()
  }

  const getBalance = () => {
    return new Promise((resolve) => {
      window.getCreditsBalance(wallet.publicKey, (err, result) => {
        const amount = result.balance.integral + result.balance.fraction / 10**18
        resolve(amount)
      })
    })
  }

  return Object.freeze({
    generateWallet,
    registerWallet,
    initFromMnemonic,
    initFromPrivateKey,
    getPrivateKey: needsWallet(getPrivateKey),
    getWalletData: needsWallet(getWalletData),
    withdraw: needsWallet(withdraw),
    supportAchievement: needsWallet(supportAchievement),
    createAchievement: needsWallet(createAchievement),
    confirmAchievement: needsWallet(confirmAchievement),
    ...metadata
  })
})()
