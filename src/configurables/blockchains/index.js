import loom from './loom'
// import qtum from './qtum'
import fakechain from './fakechain'
import fakechain2 from './fakechain2'
import bitcoin from './bitcoin'

export default (function blockchains () {
  // You can change blockchain for smart contracts here
  const primary = process.env.NODE_ENV === 'sandbox' ? fakechain : loom

  // You can add/change/remove blokchains for value transfers here
  const nonPrimary = process.env.NODE_ENV === 'sandbox' ? { fakechain2 } : { bitcoin }

  const all = { [primary.key]: primary, ...nonPrimary }

  return Object.freeze({
    primary,
    nonPrimary,
    all,
    keys: Object.keys(all),
    get: (blockchainKey) => all[blockchainKey],
    isPrimary: blockchain => blockchain.name === primary.name
  })
})()
