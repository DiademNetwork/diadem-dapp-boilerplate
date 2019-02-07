import React, { Component } from 'react'
import { PropTypes as T } from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Hashtag from './Hashtag'
import LogoImage from './logo.png'
import withContainer from './container'

const styles = (theme) => ({
  github: {
    width: '32px',
    height: '32px'
  },
  help: {
    width: '37px',
    height: '37px'
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

class Nav extends Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  };

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  handleOpenHelp = () => {
    this.props.toggleHelp({ helpDisplay: 'help' })
  }

  render () {
    const { anchorEl } = this.state
    const { classes } = this.props
    return (
      <AppBar position="static" color="primary">
        <Toolbar>
          <img className={classes.logo} alt="Diadem Network logo" src={LogoImage} />
          <Typography variant="h6" color="inherit" className={classes.flex}>
            Diadem Network
          </Typography>
          <IconButton
            aria-label="Menu"
            aria-owns={anchorEl ? 'simple-menu' : null}
            aria-haspopup="true"
            color="inherit"
            onClick={this.handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
          >

            <MenuItem
              data-qa-id="nav-show-help"
              onClick={this.handleOpenHelp}
            >
              Help
            </MenuItem>
            <Hashtag mobile />
          </Menu>
        </Toolbar>
      </AppBar>
    )
  }
}

Nav.propTypes = {
  classes: T.object.isRequired,
  toggleHelp: T.func
}

export default withContainer(withStyles(styles)(Nav))
