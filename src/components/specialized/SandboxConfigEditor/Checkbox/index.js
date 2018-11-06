import React from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { PropTypes as T } from 'prop-types'

const SandboxConfigEditorCheckbox = ({
  label,
  name,
  onChangeSandboxConfig,
  sandboxConfig
}) => (
  <FormControlLabel
    control={
      <Checkbox
        checked={sandboxConfig[name]}
        onChange={({ target: { checked } }) => onChangeSandboxConfig(name, checked)}
        value={name}
        color="primary"
      />
    }
    label={label}
  />
)

SandboxConfigEditorCheckbox.propTypes = {
  label: T.string,
  name: T.string,
  onChangeSandboxConfig: T.func,
  sandboxConfig: T.object
}

export default SandboxConfigEditorCheckbox
