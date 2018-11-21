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
  urls: {
    hashtag: 'https://www.fakenetwork.com/search/top/?q=%23diademnetwork',
    website: 'https://www.fakenetwork.com/'
  },
  inputs: {
    link: {
      maxCaracters: MAX_LINK_CARACTERS,
      placeholder: 'https://www.fakenetwork.com/username/posts/postid',
      isValid: ({ previousLink }) => R.allPass([
        R.complement(R.equals)(previousLink),
        R.compose(R.lte(R.__, MAX_LINK_CARACTERS), R.length),
        R.is(String),
        isUrl,
        R.test(/.*fakenetwork.*/)
      ])
    }
  },
  name: 'fake network',
  // Mapping between info needed in app and data object received from network
  // Array given will be used in app selectors with Ramda to retrieve info in object
  dataPaths: {
    userName: ['name'],
    userAccessToken: ['accessToken'],
    userPictureUrl: ['picture', 'data', 'url'],
    userID: ['userID']
  },
  texts: {
    linkHelp: 'To get your Fake network post link....well it is not possible!'
  }
})
