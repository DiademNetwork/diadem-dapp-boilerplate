import React from 'react'
import CreateAchievement from './CreateAchievement'
// import DepositReward from './DepositReward'
// import PublishChallenge from './PublishChallenge'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

const Actions = () => (
  <Card>
    <CardContent>
      <CreateAchievement />

      {/*
      UNCOMMENT WHEN FUNCTIONNALITIES WILL BE AVAILABLE
      <DepositReward />
      <PublishChallenge />
      */}
    </CardContent>
  </Card>
)

export default Actions
