import React, { Component, Fragment } from 'react'
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
import withMobileDialog from '@material-ui/core/withMobileDialog'
import { withStyles } from '@material-ui/core/styles'
import HashtagImg from './hashtag.png'
import SendIcon from '@material-ui/icons/SendOutlined'
import Hidden from '@material-ui/core/Hidden'
import MenuItem from '@material-ui/core/MenuItem'
import Link from 'components/shared/Link'
import network from 'configurables/network'

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
    const openButtonProps = {
      'aria-label': 'Hashtag',
      'data-qa-id': 'nav-show-hashtag-modal',
      key: 'hashtag-button',
      onClick: this.handleClickOpen
    }
    const openButton = mobile ? (
      <MenuItem {...openButtonProps}>
        #DiademNetwork
      </MenuItem>
    ) : (
      <IconButton
        {...openButtonProps}
        variant="fab"
        color="primary"
      >
        <Avatar className={classes.hastag} alt="Hashtag logo" src={HashtagImg} />
      </IconButton>
    )
    return (
      <Fragment>
        {openButton}
        <Dialog
          data-qa-id='hashtag-modal'
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
              <Link
                text="Wow, I want to see #diademnetwork community!"
                href={network.hastagUrl}
                typographyProps={{
                  paragraph: true
                }}
              />
              <Typography paragraph>
                Together, we can build a better world! If you have improvements ideas, share them with us at <a className={classes.link} target="_blank" href={`mailto:${process.env.SUPPORT_CONTACT_EMAIL}`}>{process.env.SUPPORT_CONTACT_EMAIL}</a>
              </Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              aria-label="Go to application"
              color="secondary"
              data-qa-id="close-hashtag-modal"
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
      </Fragment>
    )
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
