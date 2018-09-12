import React from 'react'
import { PropTypes as T } from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Hidden from '@material-ui/core/Hidden'
import { withStyles } from '@material-ui/core/styles'
import LoginButton from '../LoginButton'
import LogoImage from './logo.png'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import GithubImg from './github-logo.png'
import HelpImg from './help-logo.png'
import withContainer from './container'

const styles = (theme) => ({
  avatar: {
    width: '32px',
    height: '32px'
  },
  button: {
    marginLeft: theme.spacing.unit
  },
  logo: {
    marginRight: theme.spacing.unit * 2,
    width: '40px'
  },
  flex: {
    flexGrow: 1
  }
})

const Nav = ({ classes, showHelp }) => (
  <AppBar position="static" color="primary">
    <Toolbar>
      <img className={classes.logo} alt="Diadem Network logo" src={LogoImage} />
      <Typography variant="title" color="inherit" className={classes.flex}>
        Diadem <Hidden smDown>Network</Hidden>
      </Typography>
      <LoginButton />
      <IconButton component="a" target="_blank" href="https://github.com/DiademNetwork" variant="fab" color="primary" className={classes.button}>
        <Avatar className={classes.avatar} alt="Github logo" src={GithubImg} />
      </IconButton>
      <IconButton onClick={showHelp} variant="fab" color="primary" className={classes.button}>
        <Avatar className={classes.avatar} alt="Help logo" src={HelpImg} />
      </IconButton>
    </Toolbar>
  </AppBar>
)

Nav.propTypes = {
  classes: T.object.isRequired,
  showHelp: T.func
}

export default withContainer(withStyles(styles)(Nav))
