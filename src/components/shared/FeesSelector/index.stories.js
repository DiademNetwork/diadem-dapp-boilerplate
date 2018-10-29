import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { specs, describe, it } from 'storybook-addon-specifications'
import { mount } from 'enzyme'
import expect from 'expect'
import FeesSelector, { FeesSelector as BareComponent } from '.'

storiesOf('FeesSelector', module)
  .add('unchecked', () => {
    const story = <FeesSelector onChange={action('change')} />

    specs(() => describe('unchecked', () => {
      it('Input should not be present', () => {
        const output = mount(<BareComponent />)
        expect(output.state('useCustomFees')).toEqual(false)
      })
    }))

    return story
  })
