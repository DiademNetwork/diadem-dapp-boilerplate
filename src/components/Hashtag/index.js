import React, { Component } from 'react'
import * as R from 'ramda'
import { PropTypes as T } from 'prop-types'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Avatar from '@material-ui/core/Avatar'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography'
import Link from '../Link'
import withMobileDialog from '@material-ui/core/withMobileDialog'
import { withStyles } from '@material-ui/core/styles'
import HashtagImg from './hashtag.png'
import SendIcon from '@material-ui/icons/SendOutlined'
import Hidden from '@material-ui/core/Hidden'
import MenuItem from '@material-ui/core/MenuItem'

const styles = (theme) => ({
  hastag: {
    width: '36px',
    height: '36px'
  },
  icon: {
    marginRight: theme.spacing.unit
  },
  link: {
    color: theme.palette.primary.light,
    textDecoration: 'none'
  }
})

class Hashtag extends Component {
  state = {
    modalOpen: false
  }

  handleClickOpen = () => {
    this.setState({ modalOpen: true })
  }

  handleClose = () => {
    this.setState({ modalOpen: false })
  }

  render () {
    const { classes, fullScreen, mobile } = this.props
    const { modalOpen } = this.state
    const openButton = mobile ? (
      <MenuItem
        key='hashtag-button'
        onClick={this.handleClickOpen}
      >
        #DiademNetwork
      </MenuItem>
    ) : (
      <IconButton
        aria-label="Hashtag"
        key='hashtag-button'
        onClick={this.handleClickOpen}
        variant="fab"
        color="primary"
      >
        <Avatar className={classes.hastag} alt="Hashtag logo" src={HashtagImg} />
      </IconButton>
    )
    return [
      openButton,
      <Dialog
        fullScreen={fullScreen}
        key='hashtag-modal'
        open={modalOpen}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Support the community with #diademnetwork!</DialogTitle>
        <DialogContent>
          <DialogContentText component="div">
            <Typography variant="body1">
              Help us spreading the love!
            </Typography>
            <Typography paragraph variant="body1">
              Use this hashtag in your achievements posts
            </Typography>
            <Typography paragraph variant="title">
              #diademnetwork
            </Typography>
            <Typography paragraph>
              <a className={classes.link} target="_blank" href="mailto:team@diadem.network">team@diadem.network</a>
            </Typography>
            <Typography paragraph>
              Together, we can build a better world!
            </Typography>
            <Link
              text="Wow, I want to see #diademnetwork community!"
              href="https://www.facebook.com/search/top/?q=%23diademnetwork"
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            aria-label="Go to application"
            color="secondary"
            onClick={this.handleClose}
            variant={fullScreen ? 'contained' : 'extendedFab'}
          >
            <Hidden smDown>
              <SendIcon className={classes.icon} />
            </Hidden>
            Go back to Diadem Network
          </Button>
        </DialogActions>
      </Dialog>
    ]
  }
}

Hashtag.propTypes = {
  classes: T.object,
  fullScreen: T.bool,
  mobile: T.bool
}

export default R.compose(
  withMobileDialog(),
  withStyles(styles)
)(Hashtag)
