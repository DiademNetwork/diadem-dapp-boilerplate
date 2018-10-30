import React, { Fragment, Component } from 'react'
import { PropTypes as T } from 'prop-types'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import withComponentDidMountHook from 'components/hocs/withComponentDidMountHook'
import Badge from '@material-ui/core/Badge'
import { withStyles } from '@material-ui/core/styles'
import * as R from 'ramda'

const styles = (theme) => ({
  tabs: {
    marginBottom: theme.spacing.unit * 2
  },
  tabBadge: {
    padding: `0 ${theme.spacing.unit * 2}px`
  }
})

class AppTabs extends Component {
  state = {
    tabIdx: 0
  }

  handleChange = (e, tabIdx) => this.setState({ tabIdx })

  render () {
    const { tabIdx } = this.state
    const { classes, tabs } = this.props
    const TabItem = withComponentDidMountHook(
      ({ children }) => children,
      tabs[tabIdx].onOpen
    )
    return (
      <Fragment>
        <Tabs
          className={classes.tabs}
          key='tabs'
          value={tabIdx}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          {R.map(({ badgeContent, label }) => (
            <Tab
              data-qa-id={`tab-${label.toLowerCase()}`}
              key={label}
              label={
                badgeContent ? (
                  <Badge className={classes.tabBadge} color="secondary" badgeContent={badgeContent}>
                    {label}
                  </Badge>
                ) : (
                  label
                )
              } />
          ), tabs)}
        </Tabs>
        <TabItem key='tab'>
          {tabs[tabIdx].component}
        </TabItem>
      </Fragment>
    )
  }
}

AppTabs.propTypes = {
  classes: T.object,
  tabs: T.array
}

export default withStyles(styles)(AppTabs)
