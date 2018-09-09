import React, { Component } from 'react'
import { PropTypes as T } from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import withContainer from './container'

const styles = (theme) => ({
  img: {
    marginRight: theme.spacing.unit * 2
  }
})

class LoginButton extends Component {
  onFacebookLogin = (facebookData) => {
    if (!facebookData.userID) { // facebookLogin failed
      return
    }
    this.props.handleFacebookLogin(facebookData)
  }

  render () {
    const {
      classes,
      facebookName,
      facebookPictureUrl,
      isFacebookAuthenticated
    } = this.props
    if (isFacebookAuthenticated) {
      return [
        <Avatar className={classes.img} key="avatar" alt="Facebook profile picture" src={facebookPictureUrl} />,
        <Typography key="username" variant="title" color="inherit">{facebookName}</Typography>
      ]
    }
    return (
      <FacebookLogin
        appId={process.env.FACEBOOK_APP_ID}
        fields="name,email,picture"
        callback={this.onFacebookLogin}
        version="3.1"
        render={renderProps => (
          <Button
            color="secondary"
            onClick={renderProps.onClick}
            variant="contained"
          >
            Facebook Login
          </Button>
        )}
      />
    )
  }
}

LoginButton.propTypes = {
  classes: T.object,
  facebookName: T.string,
  facebookPictureUrl: T.string,
  handleFacebookLogin: T.func,
  isFacebookAuthenticated: T.bool
}

export default withContainer(withStyles(styles)(LoginButton))
