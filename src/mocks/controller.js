export default (function mocksController () {
  const config = {
    isUserRegistered: true,
    isUserPendingRegistration: false,
    userID: '',
    pendingTxID: ''
  }

  const set = (name) => (value) => { config[name] = value }
  const get = (name) => name ? config[name] : config

  return Object.freeze({
    get,
    set
  })
})()
