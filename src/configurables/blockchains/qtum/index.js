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

  const needsWallet = fn => (...args) => {
    if (!walletUtil) {
      throw new Error('Wallet does not exist. Please initialize or generate it.')
    }
    fn(...args)
  }

  const getPrivateKey = () => walletUtil.toWIF()

  const getWalletData = async () => walletUtil.getInfo()

  const withdraw = async ({ address, amount, fees = 0 }) => {
    walletUtil.send(address, amount * 1e8, { feeRate: Math.ceil(fees * 1e8 / 1024) })
  }

  return Object.freeze({
    initFromMnemonic,
    initFromPrivateKey,
    key: 'qtum',
    logo,
    name: 'Qtum',
    getWalletData: needsWallet(getWalletData),
    generateWallet,
    getPrivateKey: needsWallet(getPrivateKey),
    symbol: 'QTUM',
    withdraw: needsWallet(withdraw),
    fees: {
      initial: 0.008,
      max: 0.1,
      min: 0.004
    }
  })
})()
