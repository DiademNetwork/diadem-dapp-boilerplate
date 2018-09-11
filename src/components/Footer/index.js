import React from 'react'
import { PropTypes as T } from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import GithubImg from './github-logo.png'
import HelpImg from './help-logo.png'
import withContainer from './container'

const styles = (theme) => ({
  root: {
    opacity: '0.5',
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  },
  helpIcon: {
    position: 'relative',
    left: '5px',
    top: '3px',
    transform: 'scale(1.05)'
  }
})

const Footer = ({ classes, showHelp }) => (
  <div className={classes.root}>
    <a
      href="https://github.com/DiademNetwork"
      target="_blank"
    >
      <img
        alt="github logo"
        src={GithubImg}
      />
    </a>
    <a
      onClick={showHelp}
      className={classes.helpIcon}
      href="#"
    >
      <img
        alt="help icon"
        src={HelpImg}
      />
    </a>
  </div>
)

Footer.propTypes = {
  classes: T.object,
  showHelp: T.func
}

export default withContainer(withStyles(styles)(Footer))
