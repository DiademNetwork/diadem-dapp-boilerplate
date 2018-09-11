import sortByTime from '../../helpers/sort-by-time'

const timeA = '2018-09-11T01:19:46.943399'
const timeB = '2018-09-11T01:19:47.949565'
const timeC = '2018-09-11T01:19:48.966919'

const timeD = '2018-09-11T08:23:36.695328'
const timeE = '2018-09-11T09:45:59.920078'
const timeF = '2018-09-11T10:28:01.128205'

const unsortedTimes = [
  { time: timeC, foo: 'bar' },
  { time: timeA },
  { time: timeB }
]

const unsortedTimes2 = [
  { time: timeE },
  { time: timeD },
  { time: timeF }
]

describe('sortByTime', () => {
  it('asc is defined', () => {
    expect(sortByTime.asc).toBeDefined()
  })
  it('desc is defined', () => {
    expect(sortByTime.asc).toBeDefined()
  })
  it('sort asc', () => {
    expect(sortByTime.asc(unsortedTimes)).toEqual([
      { time: timeA },
      { time: timeB },
      { time: timeC, foo: 'bar' }
    ])
    expect(sortByTime.asc(unsortedTimes2)).toEqual([
      { time: timeD },
      { time: timeE },
      { time: timeF }
    ])
  })
  it('sort desc', () => {
    expect(sortByTime.desc(unsortedTimes)).toEqual([
      { time: timeC, foo: 'bar' },
      { time: timeB },
      { time: timeA }
    ])
  })
})
