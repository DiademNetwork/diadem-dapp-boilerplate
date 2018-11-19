export default (function mockConfig () {
  const config = {
    isUserRegistered: true,
    isUserPendingRegistration: false,
    facebookUserID: '',
    pendingTxID: ''
  }

  const set = (name) => (value) => { config[name] = value }
  const get = (name) => name ? config[name] : config

  return Object.freeze({
    get,
    set
  })
})()
