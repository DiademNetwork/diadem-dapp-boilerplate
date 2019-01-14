import logo from './logo.png'

const nacl = require('tweetnacl')
const Base58 = require('base-58')
const Axios = require('axios-observable').Axios

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

  const generateWallet = () => {
    const mnemonic = bip39.generateMnemonic()
    const seed = bip39.mnemonicToSeed(mnemonic)
    const keyPair = nacl.sign.keyPair.fromSeed(seed)
    const privateKey = Base58.encode(keyPair.secretKey)
    return { mnemonic, privateKey }
  }

  const initFromMnemonic = (mnemonic) => {
    const seed = bip39.mnemonicToSeed(mnemonic)
    const keyPair = nacl.sign.keyPair.fromSeed(seed)
    const privateKey = Base58.encode(keyPair.secretKey)
    initFromPrivateKey(privateKey)
  }

  const initFromPrivateKey = (privateKey) => {
    const keyPair = nacl.sign.fromSecretKey(privateKey)
    const address = Base58.encode(keyPair.publicKey)
    wallet = { privateKey, address }
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
    fn(...args)
  }

  const withdraw = ({ address, amount, fees }) => {
    console.log(`withdraw ${amount} from ${address} with fees ${fees}`)
  }

  const getBalance = (publicKey) => {
    const params = [1,"WalletBalanceGet",1,0,{"1":{"str":publicKey}}]

    return new Promise((resolve, reject) => {
      Axios.post('http://169.50.169.11:8081/thrift/service/Api/', params)
        .subscribe(
          (response) => {
            resolve(response)
          },
          (error) => {
            reject(error)
          }
        );
    }).then((response) => {
      const balance = response.data["4"]["0"].rec["2"].rec["1"].i32

      return balance
    })
  }

  return Object.freeze({
    generateWallet,
    initFromMnemonic,
    initFromPrivateKey,
    getPrivateKey: needsWallet(getPrivateKey),
    getWalletData: needsWallet(getWalletData),
    withdraw: needsWallet(withdraw),
    ...metadata
  })
})()
