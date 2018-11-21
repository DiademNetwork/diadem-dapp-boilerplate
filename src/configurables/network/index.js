import facebookNetwork from './facebook'
import fakeNetwork from './fake'

export default process.env.ENV === 'sandbox' ? fakeNetwork : facebookNetwork
