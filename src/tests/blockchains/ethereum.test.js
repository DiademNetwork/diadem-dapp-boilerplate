import ethereum from '../../configurables/blockchains/ethereum'

describe('Ethereum blockchain', () => {
  it('should create new wallet', () => {
    const { mnemonic, privateKey } = ethereum.generateWallet()

    expect(mnemonic).toBeTruthy()
    expect(privateKey).toBeTruthy()
  })

  it('should recover wallet from mnemonic', () => {
    const mnemonic = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about'

    ethereum.initFromMnemonic(mnemonic)
  })

  it('should recover wallet from private key', () => {
    const privateKey = '0x02288d9f688a14104a5eba38b20910ae3a376d63d077d44d647ad4542ba52f23'

    ethereum.initFromPrivateKey(privateKey)
  })
})