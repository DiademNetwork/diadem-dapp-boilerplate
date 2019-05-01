import credits from './credits'

export default (function blockchains () {
  // You can change blockchain for smart contracts here
  const primary = credits

  // You can add/change/remove blokchains for value transfers here
  const nonPrimary = process.env.NODE_ENV === 'sandbox' ? { fakechain2 } : { }

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
