import { success, error } from 'react-notification-system-redux'

export default {
  unknownError: error({
    uid: 'unknownError',
    position: 'bl',
    title: 'An error occured',
    message: 'Sorry for inconvenience'
  }),
  facebookLoginSuccess: success({
    uid: 'facebook-login-success',
    position: 'bl',
    title: 'Facebook login success',
    message: 'You can now use the wallet and see your timeline'
  }),
  walletRestored: success({
    uid: 'wallet-restore-success',
    position: 'bl',
    title: 'Wallet restored',
    message: 'You can now support achievements!'
  }),
  walletGenerated: success({
    uid: 'wallet-generated-success',
    position: 'bl',
    title: 'Diadem Network QTUM wallet generated',
    message: 'Please safe mnemonic and privateKey somewhere safe'
  })
}
