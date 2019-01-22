import React from 'react'
import * as R from 'ramda'
import { PropTypes as T } from 'prop-types'
import withContainer from './container'
import User from './User'
import Button from './Button'
import network from 'configurables/network'
import { withStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

const styles = (theme) => ({
  img: {
    display: 'inline-block',
    marginRight: theme.spacing.unit * 2,
    verticalAlign: 'middle'
  }
})

const Network = ({ classes, isLogged, handleLoginSuccess }) => (
  <TableRow>
    <TableCell>
      <Avatar
        className={classes.img}
        alt={`${network.name} logo`}
        src={network.logo}
      />
      {network.name}
    </TableCell>
    <TableCell numeric>
      {isLogged ? (
        <User />
      ) : (
        <network.components.LoginButton
          onSuccess={(data) => {
            handleLoginSuccess({
              data: {
                userID: R.path(network.dataPaths.userID)(data),
                userName: R.path(network.dataPaths.userName)(data),
                userAccessToken: R.path(network.dataPaths.userAccessToken)(data),
                userPictureUrl: R.path(network.dataPaths.userPictureUrl)(data)
              }
            })
          }}
          buttonComponent={Button}
        />
      )}
    </TableCell>
  </TableRow>
)

Network.propTypes = {
  classes: T.object,
  handleLoginSuccess: T.func,
  isLogged: T.bool
}

export default R.compose(
  withStyles(styles),
  withContainer
)(Network)
