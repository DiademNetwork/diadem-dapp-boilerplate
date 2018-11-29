import * as U from './index'

describe('Utils', () => {
  const obj = { a: 1, b: 2, c: 3 }
  const add1 = jest.fn((x) => x + 1)
  const toUpper = x => x.toUpperCase()

  it('mapObj', () => {
    const result = U.mapObj(add1)(obj)
    expect(result).toEqual([2, 3, 4])
  })

  it('mapKeys', () => {
    const result = U.mapKeys(toUpper)(obj)
    expect(result).toEqual(['A', 'B', 'C'])
  })

  it('oneOf', () => {
    expect(U.oneOf(['A', 'B', 'C'])('C')).toEqual(true)
    expect(U.oneOf(['A', 'B', 'C'])('D')).toEqual(false)
  })
})
