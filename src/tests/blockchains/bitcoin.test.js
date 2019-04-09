import bitcoin from '../../configurables/blockchains/bitcoin'

describe('Bitcoin wallet', () => {
  it('should generate new wallet', () => {
    const { privateKey, mnemonic } = bitcoin.generateWallet()

    expect(privateKey).toBeTruthy()
    expect(mnemonic).toBeTruthy()
  })

  it('should recover wallet from mnemonic', () => {
    const mnemonic = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about'

    bitcoin.initFromMnemonic(mnemonic)
  })

  it('should generate wallet from private key', () => {
    const privateKey = 'KxnxjGKwTFZ9FU1QJtNU2gN3PpZhxSLVGuMbwqHr2w4uCwasyv1d'

    bitcoin.initFromPrivateKey(privateKey)
  })
})