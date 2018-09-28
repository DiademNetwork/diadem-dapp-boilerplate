import React, { Component } from 'react'
import { PropTypes as T } from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Hidden from '@material-ui/core/Hidden'
import { withStyles } from '@material-ui/core/styles'
import FacebookLogin from '../FacebookLogin'
import Hashtag from '../Hashtag'
import LogoImage from './logo.png'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import GithubImg from './github-logo.png'
import HelpImg from './help-logo.png'
import withContainer from './container'
import MenuIcon from '@material-ui/icons/Menu'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

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
    this.props.toggleHelp()
  }

  render () {
    const { anchorEl } = this.state
    const { classes } = this.props
    return (
      <AppBar position="static" color="primary">
        <Toolbar>
          <img className={classes.logo} alt="Diadem Network logo" src={LogoImage} />
          <Typography variant="title" color="inherit" className={classes.flex}>
            Diadem Network
          </Typography>
          <FacebookLogin />
          <Hidden mdUp>
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

              <MenuItem onClick={this.handleOpenHelp}>Show help</MenuItem>
              <MenuItem component="a" target="_blank" href="https://github.com/DiademNetwork/qtum-dapp-documentation/blob/master/README.md">See on Github</MenuItem>
              <Hashtag mobile />
            </Menu>
          </Hidden>
          <Hidden smDown>
            <IconButton component="a" target="_blank" href="https://github.com/DiademNetwork/qtum-dapp-documentation/blob/master/README.md" variant="fab" color="primary" className={classes.button}>
              <Avatar className={classes.github} alt="Github logo" src={GithubImg} />
            </IconButton>
            <IconButton onClick={this.handleOpenHelp} variant="fab" color="primary">
              <Avatar className={classes.help} alt="Help logo" src={HelpImg} />
            </IconButton>
            <Hashtag />
          </Hidden>
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
