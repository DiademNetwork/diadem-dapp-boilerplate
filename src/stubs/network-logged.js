import faker from 'faker'
import mockController from '../mocks/controller'

const networkLogged = Object.freeze({
  accessToken: `${faker.random.number()}`,
  name: faker.name.findName(),
  email: faker.internet.email(),
  picture: {
    data: {
      height: 50,
      is_silhouette: false,
      url: faker.image.imageUrl(50, 50),
      width: 50
    }
  },
  userID: '11111'
})

mockController.set('userID')(networkLogged.userID)

export default networkLogged
