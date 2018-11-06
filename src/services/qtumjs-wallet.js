import qtumJS from 'qtumjs-wallet'
import qtumJSWalletMock from '../mocks/qtumjs-wallet'

export default process.env.ENV === 'sandbox' ? qtumJSWalletMock : qtumJS
