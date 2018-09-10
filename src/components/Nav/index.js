import React from 'react'
import { PropTypes as T } from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import LoginButton from '../LoginButton'
import LogoImage from './logo.png'

const styles = (theme) => ({
  logo: {
    marginRight: theme.spacing.unit * 2,
    width: '50px'
  },
  flex: {
    flexGrow: 1
  }
})

const Nav = ({ classes }) => (
  <AppBar position="static" color="primary">
    <Toolbar>
      <img className={classes.logo} alt="Diadem Network logo" src={LogoImage} />
      <Typography variant="title" color="inherit" className={classes.flex}>
        Diadem Network
      </Typography>
      <LoginButton />
    </Toolbar>
  </AppBar>
)

Nav.propTypes = {
  classes: T.object.isRequired
}

export default withStyles(styles)(Nav)