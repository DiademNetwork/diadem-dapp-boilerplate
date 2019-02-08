import React from 'react'
import withRouter from 'components/hocs/withRouter'
import { PropTypes as T } from 'prop-types'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import AppBar from '@material-ui/core/AppBar'
import { makeStyles } from '@material-ui/styles'
import * as R from 'ramda'
import withMobileDialog from '@material-ui/core/withMobileDialog'

const useStyles = makeStyles(theme => ({
  root: {
    maxHeight: theme.spacing.unit * 6,
    position: 'fixed',
    bottom: '0',
    top: 'auto',
    [theme.breakpoints.up('md')]: {
      position: 'static'
    }
  }
}))

const AppTabs = ({ fullScreen, tabs, onChange, pathname }) => {
  const classes = useStyles()

  function handleChange (event, idx) {
    onChange && onChange(tabs[idx].path)
  }

  const idx = R.findIndex(R.propEq('path', pathname))(tabs)

  return (
    <AppBar color="default" className={classes.root}>
      <Tabs
        value={idx}
        onChange={handleChange}
        scrollButtons="off"
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        {R.map(({ label, icon }) => (
          <Tab
            data-qa-id={`tab-${label.toLowerCase()}`}
            key={label}
            label={fullScreen ? undefined : label}
            icon={fullScreen ? icon : undefined}
          />
        ), tabs)}
      </Tabs>
    </AppBar>
  )
}

AppTabs.propTypes = {
  fullScreen: T.bool,
  onChange: T.func,
  pathname: T.string,
  tabs: T.array
}

export default R.compose(
  withRouter,
  withMobileDialog()
)(AppTabs)
