import { configure, addDecorator } from '@storybook/react'
import { muiTheme } from 'storybook-addon-material-ui'
import theme from '../src/mui-theme'
import { configure as enzymeConfigure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

enzymeConfigure({ adapter: new Adapter() })

// automatically import all files ending in *.stories.js
const req = require.context('../src/', true, /.stories.js$/)

function loadStories() {
  addDecorator(muiTheme([theme]))
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
