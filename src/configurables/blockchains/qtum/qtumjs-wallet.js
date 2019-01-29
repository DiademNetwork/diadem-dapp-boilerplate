import * as qtumJS from 'qtumjs-wallet'
import qtumJSWalletMock from './qtumjs-wallet-mock'

export default process.env.NODE_ENV === 'sandbox' ? qtumJSWalletMock : qtumJS
