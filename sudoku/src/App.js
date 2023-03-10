import Grid from './components/Grid'
import { useState } from 'react'
import { useEffect } from 'react'
import React from 'react'
import './App.css'

function App() {
  const originalBoard = [
    [null, null, null, 2, 6, null, 7, null, 1],
    [6, 8, null, null, 7, null, null, 9, null],
    [1, 9, null, null, null, 4, 5, null, null],
    [8, 2, null, 1, null, null, null, 4, null],
    [null, null, 4, 6, null, 2, 9, null, null],
    [null, 5, null, null, null, 3, null, 2, 8],
    [null, null, 9, 3, null, null, null, 7, 4],
    [null, 4, null, null, 5, null, null, 3, 6],
    [7, null, 3, null, 1, 8, null, null, null]
  ]
  const [alertVisible, setAlertVisible] = useState(false)
  const [columns, setColumns] = useState({})
  const [rows, setRows] = useState({}) // The row, columns and boxes array is used to check if a number is present in either of those structures
  const [boxes, setBoxes] = useState({})
  const [board, setBoard] = useState([])
  const [checkAnswerValue, setCheckAnswerValue] = useState('Answer is not correct')
  const [checkAnswerVisible, setCheckAnswerVisible] = useState(false)
  const [error, setError] = useState('')

  function checkAnswer() {
    const isValid = transverseArray(rows) && transverseArray(columns) && transverseArray(boxes)

    if (isValid) {
      setCheckAnswerValue('Completed!')
    } else {
      setCheckAnswerValue('Answer is not correct')
    }
    hideAlert()
    setCheckAnswerVisible(true)
  }

  function hideAnswer() {
    setCheckAnswerVisible(false)
  }

  function transverseArray(dict) {
    var isValid = true
    for (var key in dict) {
      dict[key].map((cellValue) => {
        if (cellValue === false) {
          console.log('here')
          isValid = false
          return
        }
      })
      return isValid
    }
  }

  function showAlert(errorMessage) {
    setError(errorMessage)
    setAlertVisible(true)
  }

  function hideAlert() {
    setError('')
    setAlertVisible(false)
  }

  function getBoxIndex(row, col) {
    var boxSize = 3
    var boxRow = Math.floor(row / boxSize)

    var boxCol = Math.floor(col / boxSize)
    var boxIndex = boxRow * boxSize + boxCol
    return boxIndex
  }

  function createBoardChecker() {
    const b = originalBoard

    const c = {}
    const r = {}
    const box = {}
    for (var i = 0; i < 9; i++) {
      c[i] = [false, false, false, false, false, false, false, false, false]
      r[i] = [false, false, false, false, false, false, false, false, false]
      box[i] = [false, false, false, false, false, false, false, false, false]
    }

    b.map((r2, i2) =>
      r2.map((cellValue, ci2) => {
        if (cellValue !== null) {
          const boxIndex = getBoxIndex(i2, ci2)
          c[ci2][cellValue - 1] = true
          r[i2][cellValue - 1] = true
          box[boxIndex][cellValue - 1] = true
        }
      })
    )

    setColumns(c)
    setRows(r)
    setBoxes(box)
    setBoard(b)
  }

  useEffect(() => {
    createBoardChecker()
  }, [])

  //This flips the value in the columns, rows and boxes array
  function changeNumberInArrays(rowIndex, columnIndex, valueToChange, value) {
    const boxIndex = getBoxIndex(rowIndex, columnIndex)
    const newColumn = columns[columnIndex]
    newColumn[valueToChange - 1] = value
    setColumns({ ...columns, [columnIndex]: newColumn })

    const newRow = rows[rowIndex]
    newRow[valueToChange - 1] = value
    setRows({ ...rows, [rowIndex]: newRow })
    console.log(boxIndex)
    const newBox = boxes[boxIndex]
    newBox[valueToChange - 1] = value
    setBoxes({ ...boxes, [boxIndex]: newBox })
  }

  function changeNumber(rowToChange, columnToChange, change) {
    const nextCounters = board.map((row, rowIndex) =>
      row.map((cell, columnIndex) => {
        if (rowIndex === rowToChange && columnIndex === columnToChange) {
          if (columns[columnToChange][change - 1] === true) {
            showAlert('Value exists in column')
            return cell
          } else if (rows[rowToChange][change - 1] === true) {
            showAlert('Value exists in row')
            return cell
          } else if (boxes[getBoxIndex(rowIndex, columnIndex)][change - 1] === true) {
            showAlert('Value exists in box')
            return cell
          } else if (change < 10 && change > 0) {
            changeNumberInArrays(rowIndex, columnIndex, change, true)
            return change
          } else if (change === '') {
            const deletedChar = board[rowIndex][columnIndex]
            changeNumberInArrays(rowIndex, columnIndex, deletedChar, false)
            return null
          }
        } else {
          return cell
        }
      })
    )
    setBoard(nextCounters)
  }

  return (
    <div className='board'>
      {alertVisible && (
        <div className='alert'>
          <p>{error}</p>
          <button onClick={hideAlert}>close</button>
        </div>
      )}
      <Grid changeNumber={changeNumber} board={board} originalBoard={originalBoard} />
      {checkAnswerVisible && (
        <div>
          <p>{checkAnswerValue}</p>
          <button onClick={hideAnswer}>close</button>
        </div>
      )}
      <div>
        <p>{error}</p>
        <button onClick={checkAnswer}>Check Answer</button>
      </div>
    </div>
  )
}

export default App
