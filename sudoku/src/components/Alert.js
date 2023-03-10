import React from 'react'
import { useState } from 'react'
import '../Alert.css'

export default function Alert(props) {
  const [error, setError] = useState('')

  function showAlert(errorMessage) {
    setError(errorMessage)
    setAlertVisible(true)
  }

  function hideAlert() {
    setError('')
    setAlertVisible(false)
  }
  return (
    <div className='alert'>
      <p>{props.error}</p>
      <button onClick={hideAlert}>close</button>
    </div>
  )
}
