export default (function mockConfig () {
  const config = {
    pendingTx: 0,
    isUserRegistered: true,
    isUserPendingRegistration: false
  }

  const set = (name) => (value) => { config[name] = value }
  const get = (name) => name ? config[name] : config

  return Object.freeze({
    get,
    set
  })
})()
