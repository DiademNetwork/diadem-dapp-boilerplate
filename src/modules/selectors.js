import * as achievements from 'modules/achievements/selectors'
import * as network from 'modules/network/selectors'
import * as timeline from 'modules/timeline/selectors'
import * as uiGeneral from 'modules/ui/general/selectors'
import * as uiNotifications from 'modules/ui/notifications/selectors'
import * as wallets from 'modules/wallets/selectors'

export default {
  achievements,
  network,
  timeline,
  ui: {
    general: uiGeneral,
    notifications: uiNotifications
  },
  wallets
}
