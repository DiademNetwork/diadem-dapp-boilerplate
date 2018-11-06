import React from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { PropTypes as T } from 'prop-types'

const SandboxConfigEditorCheckbox = ({
  label,
  name,
  onChange,
  mocksConfig
}) => (
  <FormControlLabel
    control={
      <Checkbox
        data-qa-id={`sandbox-config-editor-checkbox-${name}`}
        checked={mocksConfig[name]}
        onChange={({ target: { checked } }) => onChange(name)(checked)}
        value={name}
        color="primary"
      />
    }
    label={label}
  />
)

SandboxConfigEditorCheckbox.propTypes = {
  label: T.string,
  mocksConfig: T.object,
  name: T.string,
  onChange: T.func
}

export default SandboxConfigEditorCheckbox
