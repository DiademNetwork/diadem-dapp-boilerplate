import qtum from './qtum'
import fakechain from './fakechain'

export default process.env.ENV === 'sandbox'
  ? Object.freeze({ fakechain })
  : Object.freeze({ qtum })
