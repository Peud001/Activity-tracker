import React from 'react';
import { useDispatch } from 'react-redux'
import { invalidInput } from '../features/slice/TodoSlice';
import '../styles/warning.css'

const Warning = () => {
    const dispatch = useDispatch()
  return (
    <div id='warning'>
        <h3>Invalid Todo!</h3>
        <p>Please enter a valid Title</p>
        <button onClick={() => dispatch(invalidInput())} >Close</button>
      </div>
  )
}
export default Warning