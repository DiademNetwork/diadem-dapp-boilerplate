import React from 'react'
import { storiesOf } from '@storybook/react'
import { App } from '../'

storiesOf('App', module)
  .add('default', () => <App />)
  .add('help ?', () => (
    <a
      rel="noopener noreferrer"
      target="_blank"
      href="https://storybook.js.org/basics/guide-react/"
    >
      See Storybook documentation
    </a>
  ))
