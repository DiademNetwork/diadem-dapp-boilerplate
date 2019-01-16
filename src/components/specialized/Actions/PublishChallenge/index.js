
import React from 'react'
import Button from 'components/shared/Button'
import PeopleIcon from '@material-ui/icons/People'

const PublishChallenge = () => (
  <Button
    aria-label="Challenge"
    data-qa-id="deposit-reward-button"
    disabled
    icon={<PeopleIcon />}
  >
    Deposit reward
  </Button>
)

export default PublishChallenge
