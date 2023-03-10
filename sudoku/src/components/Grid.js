import React from 'react'
import '../Grid.css'
import PropTypes from 'prop-types'

Grid.propTypes = {
  board: PropTypes.array.isRequired,
  originalBoard: PropTypes.array.isRequired,
  changeNumber: PropTypes.any.isRequired
}

export default function Grid(props) {
  const cells = props.board.map((row, index) =>
    row.map((obj, columnIndex) => (
      <div key={index.toString() + columnIndex.toString()} className='cell'>
        {!props.originalBoard[index][columnIndex] ? (
          <input className='enterValue' value={obj} onChange={(e) => props.changeNumber(index, columnIndex, e.target.value)} />
        ) : (
          <input className='originalValue' value={obj} />
        )}
      </div>
    ))
  )
  return <div className='container'>{cells}</div>
}
