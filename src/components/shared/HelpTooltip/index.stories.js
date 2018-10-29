import React from 'react'
import { storiesOf } from '@storybook/react'
import HelpTooltip from '.'

storiesOf('HelpTooltip', module)
  .add('default', () => (
    <HelpTooltip
      text='Hello there!'
    />
  ))
