import React, { Component } from 'react'
import MerlinGif from './merlin.gif'
import { PropTypes as T } from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

const styles = (theme) => ({
  root: {
    height: '100vh',
    width: 'auto',
    margin: theme.spacing.unit * 4,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  link: {
    color: theme.palette.primary.light,
    textDecoration: 'none'
  },
  img: {
    marginBottom: theme.spacing.unit * 4
  }
})

class ErrorBoundary extends Component {
  constructor (props) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidCatch () {
    this.setState({ hasError: true }) // TODO: handle error properly
  }

  render () {
    const { classes } = this.props
    if (this.state.hasError) {
      return (
        <div className={classes.root}>
          <img className={classes.img} src={MerlinGif} />
          <Typography variant="subtitle1" paragraph>Something went wrong! Please retry later</Typography>
          <Typography color="textSecondary" paragraph>Diadem Network team is really sorry you experienced this. The platform is still very much under development.</Typography>
          <Typography color="textSecondary" paragraph>Don't worry, if you have any funds, YOU DID NOT LOST ANYTHING as long as you still have your precious privateKey</Typography>
          <Typography color="textSecondary" paragraph>To help us improving the platform, it would be wonderful to tell us how you encountered this error at <a className={classes.link} target="_blank" href={`mailto:${process.env.SUPPORT_CONTACT_EMAIL}`}>{process.env.SUPPORT_CONTACT_EMAIL}</a></Typography>
        </div>
      )
    }
    return this.props.children
  }
}

ErrorBoundary.propTypes = {
  classes: T.object,
  children: T.node
}

export default withStyles(styles)(ErrorBoundary)
