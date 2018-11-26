import faker from 'faker'
import mockController from '../mocks/controller'

const networkLogged = Object.freeze({
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
  userID: `${faker.random.number()}`
})

mockController.set('userID')(networkLogged.userID)

export default networkLogged
