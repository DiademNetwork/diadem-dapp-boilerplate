import achievementGenerator from './achievementGenerator'

export default {
  results: [
    ...achievementGenerator(),
    ...achievementGenerator(),
    ...achievementGenerator(),
    ...achievementGenerator(),
    ...achievementGenerator()
  ],
  next: '',
  duration: '5ms'
}
