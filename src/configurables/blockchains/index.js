import qtum from './qtum'
import fakechain from './fakechain'
import fakechain2 from './fakechain2'

export default (function blockchains () {
  // You can change blockchain for smart contracts here
  const primary = process.env.ENV === 'sandbox' ? fakechain : qtum

  // You can add/change/remove blokchains for value transfers here
  const others = process.env.ENV === 'sandbox' ? { fakechain2 } : {}

  const all = { [primary.key]: primary, ...others }

  return Object.freeze({
    primary,
    all,
    keys: Object.keys(all),
    get: (blockchainKey) => all[blockchainKey]
  })
})()
