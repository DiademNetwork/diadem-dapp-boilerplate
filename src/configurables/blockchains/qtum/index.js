import logo from './logo.png'
import qtumJSWallet from './qtumjs-wallet'
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

  const registerWallet = () => ({ ok: true })

  const initFromPrivateKey = async (privateKey) => {
    walletUtil = await network.fromWIF(privateKey)
  }

  const initFromMnemonic = async (mnemonic) => {
    walletUtil = await network.fromMnemonic(mnemonic)
  }

  const needsWallet = fn => async (...args) => {
    if (!walletUtil) {
      throw new Error('Wallet does not exist. Please initialize or generate it.')
    }
    const result = await fn(...args)
    return result
  }

  const getPrivateKey = () => walletUtil.toWIF()

  const getWalletData = async () => {
    const data = await walletUtil.getInfo()
    return data
  }

  const withdraw = async ({ address, amount, fees = 0 }) => {
    walletUtil.send(address, amount * 1e8, { feeRate: Math.ceil(fees * 1e8 / 1024) })
  }

  const generateContractSendTx = ({
    address,
    encodedData,
    amount,
    feeRate: fees
  }) => walletUtil.generateContractSendTx(address, encodedData, {
    amount: amount * 1e8,
    feeRate: fees
  })

  return Object.freeze({
    initFromMnemonic,
    initFromPrivateKey,
    key: 'qtum',
    logo,
    name: 'Qtum',
    generateContractSendTx,
    getWalletData: needsWallet(getWalletData),
    generateWallet,
    registerWallet,
    getPrivateKey: needsWallet(getPrivateKey),
    symbol: 'QTUM',
    withdraw: needsWallet(withdraw),
    fees: {
      convert: (fees) => Math.ceil(fees * 1e8 / 1024),
      initial: 0.008,
      max: 0.1,
      min: 0.004
    }
  })
})()
