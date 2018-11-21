import * as R from 'ramda'
import isUrl from 'is-url'
import LoginButton from './LoginButton'

const MAX_LINK_CARACTERS = 91

export default Object.freeze({
  // Routes used by services/api
  apiEndpoints: {
    checkRegistration: '/check', // better would be facebook specific endpoint
    register: '/register' // better would be facebook specific endpoint
  },
  components: {
    LoginButton
  },
  hashtagUrl: 'https://www.facebook.com/search/top/?q=%23diademnetwork',
  website: 'https://www.facebook.com/',
  inputs: {
    link: {
      maxCaracters: MAX_LINK_CARACTERS,
      placeholder: 'https://www.facebook.com/username/posts/postid',
      isValid: R.allPass([
        R.complement(R.equals)(this.props.previousLink),
        R.compose(R.lte(R.__, MAX_LINK_CARACTERS), R.length),
        R.is(String),
        isUrl,
        R.test(/.*facebook.*/)
      ])
    }
  },
  name: 'facebook',
  // Mapping between info needed in app and data object received from network
  // Array given will be used in app selectors with Ramda to retrieve info in object
  dataPaths: {
    userName: ['name'],
    userAccessToken: ['accessToken'],
    userPictureUrl: ['picture', 'data', 'url'],
    userID: ['userID']
  }
})
