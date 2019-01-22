import * as R from 'ramda'
import isUrl from 'is-url'
import LoginButton from './LoginButton'
import logo from './logo.png'

const MAX_LINK_CARACTERS = 91

export default Object.freeze({
  components: {
    LoginButton
  },
  urls: {
    hashtag: 'https://www.facebook.com/search/top/?q=%23diademnetwork',
    website: 'https://www.facebook.com/'
  },
  inputs: {
    link: {
      maxCaracters: MAX_LINK_CARACTERS,
      placeholder: 'https://www.facebook.com/username/posts/postid',
      isValid: ({ previousLink }) => R.allPass([
        R.complement(R.equals)(previousLink),
        R.compose(R.lte(R.__, MAX_LINK_CARACTERS), R.length),
        R.is(String),
        isUrl,
        R.test(/.*facebook.*/)
      ])
    }
  },
  name: 'Facebook',
  // Mapping between info needed in app and data object received from network
  // Array given will be used in app selectors with Ramda to retrieve info in object
  dataPaths: {
    userName: ['name'],
    userAccessToken: ['accessToken'],
    userPictureUrl: ['picture', 'data', 'url'],
    userID: ['userID']
  },
  logo,
  texts: {
    linkHelp: 'To get your Facebook post link, click on time just below your name on your Facebook post to access to your post URL. Copy all link before "?'
  }
})
