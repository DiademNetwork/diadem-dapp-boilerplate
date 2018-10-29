import React from 'react'
import { storiesOf } from '@storybook/react'
import Link from '.'

storiesOf('Link', module)
  .add('default', () => (
    <Link href="http://localhost:6006" text="I am a link (clicking me open a new tab)" />
  ))
