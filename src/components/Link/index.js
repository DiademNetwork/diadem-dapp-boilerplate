import React from 'react'
import { PropTypes as T } from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

const styles = (theme) => ({
  link: {
    color: theme.palette.primary.light,
    textDecoration: 'none'
  }
})

const Link = ({ classes, href, text, typographyProps }) => (
  <Typography
    className={classes.link}
    color="primary"
    component="a"
    href={href}
    target="_blank"
    variant="body2"
    {...typographyProps}
  >
    {text}
  </Typography>
)

Link.propTypes = {
  href: T.string,
  typographyProps: T.object,
  text: T.string
}

export default withStyles(styles)(Link)
