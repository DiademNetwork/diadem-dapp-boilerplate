import React from 'react'
import * as R from 'ramda'
import { Container } from 'semantic-ui-react'
import Challenge from '../Challenge'

const Challenges = () => (
  <Container>
    {R.times(i => (
      <Challenge
        key={i}
        title={`Lorem ipusm title - ${i}`}
        author='wyywu374627d29e20e9ej23e2oue9283e023'
        link='http://www.google.com'
      />
    ), 20)}
  </Container>
)

export default Challenges
