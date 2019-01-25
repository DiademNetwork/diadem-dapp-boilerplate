
import React from 'react'
import Button from 'components/shared/Button'
import PeopleIcon from '@material-ui/icons/People'

const PublishChallenge = () => (
  <Button
    aria-label="Challenge"
    data-qa-id="publish-challenge-button"
    disabled
    icon={<PeopleIcon />}
  >
    Publish challenge
  </Button>
)

export default PublishChallenge
