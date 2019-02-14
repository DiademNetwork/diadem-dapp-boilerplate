import React from 'react'
import { PropTypes as T } from 'prop-types'
import User from './User'
import All from './All'

const List = ({ selected }) => {
  switch (selected) {
    case 'all':
      return <All />
    case 'user':
      return <User />
  }
}

List.propTypes = {
  selected: T.string
}

export default List
