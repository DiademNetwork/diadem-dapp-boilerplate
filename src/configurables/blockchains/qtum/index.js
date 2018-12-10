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

  const getWalletInfo = async () => {
    if (!walletUtil) {
      throw new Error('Wallet does not exist. Please load a generate before getting data')
    }
    return walletUtil.getInfo()
  }

  return Object.freeze({
    key: 'qtum',
    logo,
    name: 'Qtum',
    getWalletInfo,
    generateWallet,
    symbol: 'QTUM'
  })
})()
