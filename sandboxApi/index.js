const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const stream = require('getstream')
const dotenv = require('dotenv')
const cors = require('cors')
const path = require('path')

dotenv.config({ path: path.join(__dirname, '../envs/.sandbox.env') })

const GETSTREAM_APP_KEY = process.env.GETSTREAM_APP_KEY
const GETSTREAM_APP_ID = process.env.GETSTREAM_APP_ID
const GETSTREAM_APP_SECRET = process.env.GETSTREAM_APP_SECRET
const PORT = process.env.PORT || 3001

const client = stream.connect(GETSTREAM_APP_KEY, GETSTREAM_APP_SECRET, GETSTREAM_APP_ID)

let app = express()
app.server = http.createServer(app)

app.use(cors({
  exposedHeaders: ['Link']
}))

app.use(bodyParser.json({
  limit: '100kb'
}))

app.post('/get-user-token', (req, res) => {
  const userAddress = req.body.userAddress
  const token = client.createUserToken(userAddress)
  console.log(`/get-user-token requested - result ${token}`)
  res.json({ token })
})

app.post('/achievements/create', async (req, res) => {
  const { userAddress, link, title } = req.body
  console.log({ userAddress, link, title })
  const achievement = client.feed('achievement', userAddress)
  const actor = await client.user(userAddress).get()
  await achievement.addActivity({
    actor,
    verb: 'create',
    object: link,
    title,
    time: new Date(),
    to: [
      `timeline:${userAddress}`,
      `achievement_aggregated:${userAddress}`,
      `achievement_aggregated:common`
    ]
  })
  console.log('Achievement created')
  res.json({ ok: true })
})

app.post('/achievements/confirm', async (req, res) => {
  const { userAddress, link, creatorAddress } = req.body
  const achievement = client.feed('achievement', creatorAddress)
  const actor = await client.user(userAddress).get()
  await achievement.addActivity({
    actor,
    verb: 'confirm',
    object: link,
    time: new Date(),
    to: [
      `timeline:${userAddress}`,
      `timeline:${creatorAddress}`,
      `achievement_aggregated:${creatorAddress}`,
      `achievement_aggregated:common`
    ]
  })
  console.log('Achievement confirmed')
  res.json({ ok: true })
})

app.post('/achievements/support', async (req, res) => {
  const { userAddress, link, amount, blockchain, creatorAddress } = req.body
  const achievement = client.feed('achievement', creatorAddress)
  const actor = await client.user(userAddress).get()
  await achievement.addActivity({
    actor,
    blockchain,
    verb: 'support',
    object: link,
    amount,
    time: new Date(),
    to: [
      `timeline:${userAddress}`,
      `timeline:${creatorAddress}`,
      `achievement_aggregated:${creatorAddress}`,
      `achievement_aggregated:common`
    ]
  })
  console.log('Achievement supported')
  res.json({ ok: true })
})

app.server.listen(PORT, () => {
  console.log(`Fake sandbox API started on port ${app.server.address().port}`)
  console.log(`
    achievements_aggregated_common token:
      ${client.feed('achievement_aggregated', 'common').getReadOnlyToken()}
  `)
})

module.exports = app
