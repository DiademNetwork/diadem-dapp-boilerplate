import React from 'react'
import Button from 'components/shared/Button'
import PaymentIcon from '@material-ui/icons/Payment'

const DepositReward = () => (
  <Button
    aria-label="Deposit"
    data-qa-id="deposit-reward-button"
    disabled
    icon={<PaymentIcon />}
  >
    Deposit reward
  </Button>
)

export default DepositReward
