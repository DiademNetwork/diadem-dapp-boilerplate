import facebookNetwork from './facebook'
import fakeNetwork from './fakeNetwork'

export default process.env.NODE_ENV === 'sandbox' ? fakeNetwork : facebookNetwork
