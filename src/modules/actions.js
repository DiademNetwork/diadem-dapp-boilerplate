import achievements from 'modules/achievements/actions'
import network from 'modules/network/actions'
import uiGeneral from 'modules/ui/general/actions'
import uiNotifications from 'modules/ui/notifications/actions'
import wallets from 'modules/wallets/actions'
import timeline from 'modules/timeline/actions'

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
