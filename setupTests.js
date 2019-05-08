import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

import crypto from 'crypto';

Object.defineProperty(global, 'crypto', {
  value: {
    ...crypto,
    getRandomValues: arr => crypto.randomBytes(arr.length)
  },
});