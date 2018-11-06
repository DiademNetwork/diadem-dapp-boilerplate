import qtumWalletData from 'stubs/qtum-wallet-data'

export default (function stream () {
  const generateMnemonic = () => 'I am a fake mnemonic not even the right length'

  const networks = Object.freeze({
    mocked: (function mocked () {
      const walletUtil = Object.freeze({
        toWIF: () => 'IamAFakePrivateKeyFromMockedQtumJSWallet',
        getInfo: async () => ({
          ...qtumWalletData
        }),
        send: async () => 'ok'
      })

      return Object.freeze({
        fromWIF: () => walletUtil,
        fromMnemonic: () => walletUtil
      })
    })()
  })

  return Object.freeze({
    generateMnemonic,
    networks
  })
})()
