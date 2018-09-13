const mapSort = ({ key, previousKey }, linkedList) => {
  const sortedList = []
  const map = new Map()
  let currentKey = null

  for (var i = 0; i < linkedList.length; i++) {
    const item = linkedList[i]
    if (item[previousKey] === undefined) { // is first item
      currentKey = item[key]
      sortedList.push(item)
    } else {
      map.set(item[previousKey], i)
    }
  }

  while (sortedList.length < linkedList.length) {
    const nextItem = linkedList[map.get(currentKey)]
    sortedList.push(nextItem)
    currentKey = nextItem[key]
  }

  return sortedList
}

export default mapSort
