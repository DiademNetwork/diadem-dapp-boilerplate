import logo from './logo.png'
import qtumJSWallet from './qtumjs-wallet'
const { networks, generateMnemonic } = qtumJSWallet
const network = networks[process.env.NODE_ENV === 'production' ? 'mainnet' : 'testnet']

export default (function qtum () {
  let walletUtil = null

  const getPrivateKey = () => walletUtil.toWIF()

  const generateWallet = () => {
    const mnemonic = generateMnemonic()
    walletUtil = network.fromMnemonic(mnemonic)
    const privateKey = getPrivateKey()
    const address = walletUtil.addrStr
    return { mnemonic, privateKey, address }
  }

  const registerWallet = () => ({ ok: true })

  const initFromPrivateKey = async (privateKey) => {
    walletUtil = await network.fromWIF(privateKey)
    return {
      privateKey: getPrivateKey(),
      address: walletUtil.addrStr
    }
  }

  const initFromMnemonic = async (mnemonic) => {
    walletUtil = await network.fromMnemonic(mnemonic)
    return {
      privateKey: getPrivateKey(),
      address: walletUtil.addrStr
    }
  }

  const needsWallet = fn => async (...args) => {
    if (!walletUtil) {
      throw new Error('Wallet does not exist. Please initialize or generate it.')
    }
    return fn(...args)
  }

  const getWalletData = async () => walletUtil.getInfo()

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
