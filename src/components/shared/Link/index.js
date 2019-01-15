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

const Link = ({ className, classes, href, text, typographyProps, variant }) => (
  <Typography
    className={`${classes.link} ${className}`}
    color="primary"
    component="a"
    href={href}
    target="_blank"
    variant={variant}
    {...typographyProps}
  >
    {text}
  </Typography>
)

Link.defaultProps = {
  classes: {},
  variant: 'body1'
}

Link.propTypes = {
  classes: T.object,
  className: T.string,
  href: T.string,
  text: T.string,
  typographyProps: T.object
}

export const NackedComponent = Link

export default withStyles(styles)(Link)
