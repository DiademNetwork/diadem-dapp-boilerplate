import React, { Component } from 'react'
import { PropTypes as T } from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import copyToClipboard from '../../services/copy-to-clipboard'
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined'

class WalletCopyToClipBoardButton extends Component {
  handleCopy = () => {
    copyToClipboard(this.props.text)
  }

  render () {
    return (
      <IconButton
        onClick={this.handleCopy}
        aria-label="Copy"
        color="primary"
      >
        <FileCopyIcon />
      </IconButton>
    )
  }
}

WalletCopyToClipBoardButton.propTypes = {
  text: T.string
}

export default WalletCopyToClipBoardButton
