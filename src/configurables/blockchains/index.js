import qtum from './qtum'
import fakechain from './fakechain'

export default process.env.ENV === 'sandbox'
  ? Object.freeze({ fakechain })
  : Object.freeze({
    // You can configure here all blokchain you desire
    // Note that each blokchain object must respect interface (check examples)
    qtum
  })
