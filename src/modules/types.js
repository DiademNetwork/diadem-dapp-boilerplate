import achievementsChain from 'modules/achievements/chain/types'
import achievementsList from 'modules/achievements/list/types'
import login from 'modules/login/types'
import registration from 'modules/registration/types'
import transactions from 'modules/transactions/types'
import uiGeneral from 'modules/ui/general/types'
import users from 'modules/users/types'
import wallets from 'modules/wallets/types'

export default {
  achievements: {
    chain: achievementsChain,
    list: achievementsList
  },
  login,
  registration,
  transactions,
  ui: {
    general: uiGeneral
  },
  users,
  wallets
}
