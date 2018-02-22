import React from 'react'
// styled-components documentation: https://www.styled-components.com/docs
import styled from 'styled-components'
import withContainer from './container'
import { PropTypes as T } from 'prop-types'

const Wrapper = styled.div`
  align-items: center;
  color: #333;
  display: flex;
  font-family: monospace;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  line-height: 1.8;
  margin: 0 1em;
  text-align: center;

  > * {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    outline: none;
    user-select: none;
  }
`

export const App = ({ clickCount, incrementClickCount }) => {
  return (
    <Wrapper onClick={incrementClickCount}>
      <h1>Modern React boilerplate</h1>
      <p>
        React 16, Redux, Storybook 3, Jest & Enzyme, Webpack 3, Babel, Eslint,
        Styled-components
      </p>
      <p>Example Redux click counter: {clickCount}</p>
      <p>
        <a
          target="_blank"
          href="https://github.com/Clement-Bresson/react-modern-boilerplate"
        >
          View on Github
        </a>
      </p>
    </Wrapper>
  )
}

App.defaultProps = {
  clickCount: 0
}

App.propTypes = {
  clickCount: T.number,
  incrementClickCount: T.func
}

export default withContainer(App)
