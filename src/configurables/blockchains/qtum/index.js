import logo from './logo.png'
import qtumJSWallet from 'services/qtumjs-wallet'
const { networks, generateMnemonic } = qtumJSWallet
const network = networks[process.env.ENV === 'mainnet' ? 'mainnet' : 'testnet']

export default (function qtum () {
  let walletUtil = null

  const generateWallet = () => {
    const mnemonic = generateMnemonic()
    walletUtil = network.fromMnemonic(mnemonic)
    const privateKey = walletUtil.toWIF()
    return { mnemonic, privateKey }
  }

  const initFromPrivateKey = (privateKey) => {
    walletUtil = network.fromWIF(privateKey)
  }

  const initFromMnemonic = (mnemonic) => {
    walletUtil = network.fromMnemonic(mnemonic)
  }

  const getPrivateKey = () => {
    if (!walletUtil) {
      throw new Error('Wallet does not exist. Please initialize or generate before getting privateKey')
    }
    return walletUtil.toWIF()
  }

  const getWalletData = async () => {
    if (!walletUtil) {
      throw new Error('Wallet does not exist. Please initialize or generate before getting data')
    }
    return walletUtil.getInfo()
  }

  return Object.freeze({
    initFromMnemonic,
    initFromPrivateKey,
    key: 'qtum',
    logo,
    name: 'Qtum',
    getWalletData,
    generateWallet,
    getPrivateKey,
    symbol: 'QTUM'
  })
})()
