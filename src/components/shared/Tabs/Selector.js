import React from 'react'
import { PropTypes as T } from 'prop-types'
import Tab from '@material-ui/core/Tab'
import Badge from '@material-ui/core/Badge'
import { withStyles } from '@material-ui/core/styles'

const styles = (theme) => ({
  tabs: {
    marginBottom: theme.spacing.unit * 2
  },
  tabBadge: {
    padding: `0 ${theme.spacing.unit * 2}px`
  }
})

const TabSelector = ({ classes, badgeContent, label }) => (
  <Tab key={label} label={
    <Badge className={classes.tabBadge} color="secondary" badgeContent={badgeContent}>
      {label}
    </Badge>
  } />
)

TabSelector.propTypes = {
  classes: T.object,
  badgeContent: T.number,
  label: T.string
}

export default withStyles(styles)(TabSelector)
