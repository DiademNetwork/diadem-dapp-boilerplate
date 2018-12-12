import qtum from './qtum'
import fakechain from './fakechain'
import fakechain2 from './fakechain2'

export default process.env.ENV === 'sandbox'
  ? Object.freeze({ fakechain, fakechain2 })
  : Object.freeze({
    // You can configure here all blokchain you desire
    // Note that each blokchain object must respect interface (check examples)
    qtum
  })
