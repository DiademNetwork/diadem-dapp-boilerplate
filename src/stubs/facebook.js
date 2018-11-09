import facebookUserGenerator from './facebookUserGenerator'
import mockConfig from 'mocks/config'

const facebookUser = facebookUserGenerator()
mockConfig.set('facebookUserID')(facebookUser.userID)

export default facebookUser
