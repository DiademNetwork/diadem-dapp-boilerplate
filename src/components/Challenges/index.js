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
        author='qemomnWUuRLmX73j1J9KDMCxX5vpL6atWS'
        link='http://www.google.com'
      />
    ), 20)}
  </Container>
)

export default Challenges
