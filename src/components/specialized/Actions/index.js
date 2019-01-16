import React from 'react'
import CreateAchievement from './CreateAchievement'
import DepositReward from './DepositReward'
import PublishChallenge from './PublishChallenge'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'

const Actions = () => (
  <Card>
    <CardHeader title="Send smart contract transaction" />
    <CardContent>
      <CreateAchievement />
      <DepositReward />
      <PublishChallenge />
    </CardContent>
  </Card>
)

export default Actions
