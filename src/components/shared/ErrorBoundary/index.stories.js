import React from 'react'
import { storiesOf } from '@storybook/react'
import ErrorBoundary from '.'

const ThrowingComponent = () => {
  throw new Error('I am a bad Component')
  return <div>Error</div>; // eslint-disable-line
}

storiesOf('ErrorBoundary', module)
  .add('no error', () => (
    <ErrorBoundary>
      No error! I display child
    </ErrorBoundary>
  ))
  .add('error', () => (
    <ErrorBoundary>
      <ThrowingComponent />
    </ErrorBoundary>
  ))
