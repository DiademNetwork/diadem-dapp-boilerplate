import facebookNetwork from './facebook'
import fakeNetwork from './fakeNetwork'

export default process.env.ENV === 'sandbox' ? fakeNetwork : facebookNetwork
