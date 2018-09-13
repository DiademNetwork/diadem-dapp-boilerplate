import mapSort from '../../helpers/map-sort'

const unSortedLinkedList = [
  { link: 'D', previousLink: 'C', foo: 'bar' },
  { link: 'E', previousLink: 'D', foo: 'bar' },
  { link: 'A', bar: 'baz' },
  { link: 'C', previousLink: 'B' },
  { link: 'B', previousLink: 'A' }
]

const sortedLinkedList = [
  { link: 'A', bar: 'baz' },
  { link: 'B', previousLink: 'A' },
  { link: 'C', previousLink: 'B' },
  { link: 'D', previousLink: 'C', foo: 'bar' },
  { link: 'E', previousLink: 'D', foo: 'bar' }
]

describe('mapSort', () => {
  it('mapSort is defined', () => {
    expect(mapSort).toBeDefined()
  })
  it('can sort a list', () => {
    const sortedResult = mapSort(
      { key: 'link', previousKey: 'previousLink' },
      unSortedLinkedList
    )
    expect(sortedResult).toEqual(sortedLinkedList)
  })
})
