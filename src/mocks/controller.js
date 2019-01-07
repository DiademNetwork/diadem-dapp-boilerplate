import blockchains from 'configurables/blockchains'
import * as R from 'ramda'

const initalFakechainsValues = {
  isRegistered: true,
  isPendingRegistration: false,
  isAddressMatchingTheOneRegistered: true,
  isRegistrationSuccess: true,
  pendingTxID: ''
}

const fakechains = blockchains.keys

export default (function mocksController () {
  let config = {
    userID: '',
    ...R.zipObj(fakechains)(fakechains.map(x => initalFakechainsValues))
  }

  const set = (path) => (value) => { config = R.set(R.lensPath(path), value, config) }
  const get = (path) => path ? R.path(path, config) : config

  return Object.freeze({
    get,
    set
  })
})()
