import React from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { PropTypes as T } from 'prop-types'

const SandboxConfigEditorCheckbox = ({
  blockchainKey,
  label,
  mocksController,
  name,
  onChange
}) => (
  <FormControlLabel
    control={
      <Checkbox
        checked={mocksController[blockchainKey][name]}
        color="primary"
        data-qa-id={`sandbox-config-editor-checkbox-${name}`}
        onChange={({ target: { checked } }) => onChange(blockchainKey)(name)(checked)}
        value={name}
      />
    }
    label={label}
  />
)

SandboxConfigEditorCheckbox.propTypes = {
  blockchainKey: T.string,
  label: T.string,
  mocksController: T.object,
  name: T.string,
  onChange: T.func
}

export default SandboxConfigEditorCheckbox
