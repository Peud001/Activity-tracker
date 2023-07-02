import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Warning from './Warning';
import {
    toggleDisplayState,
    addTodo,
    toggleScreen,
    invalidInput,
    invalidInputStatus
} from '../features/slice/TodoSlice';
import '../styles/form.css';
import '../components/todoImg/addtodo1.webp'


const Form = () => {
    const dispatch = useDispatch()
    const toggleDisplay = useSelector(toggleDisplayState)
    const invalidTitle = useSelector(invalidInputStatus)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [startTime, setStartTime] = useState('')
    const [stopTime, setStopTime] = useState('')
    const [date, setDate] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (title.length > 0){
            dispatch(addTodo({
            title : title,
            timeAgo: new Date().toISOString(),
            description : description,
            startTime : startTime, 
            stopTime : stopTime, 
            date : date
          }))
          resetForm()
        }else{
            dispatch(invalidInput())
        }
        
    }
    const resetForm = () => {
      setTitle('')
          setDescription('')
          setStartTime('')
          setStopTime('')
          setDate('')
          dispatch(toggleScreen())
    }

  return (
    <div>
      <div>
        {
            invalidTitle && (
                <Warning/>
            )
        }
      </div>
      {
        toggleDisplay?
        (
            <div className='container'>
                    <form className='add-todo-form' onSubmit={(e) => handleSubmit(e)} >
                    <
                        input
                        className='title'
                        type='text'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        disabled ={invalidTitle}
                        placeholder='Title'
                        />                   
                        <
                            textarea
                            className='description'
                            type='text'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            disabled ={invalidTitle}
                            placeholder='Description'
                            />
                            <
                                input
                                className='time1'
                                value={startTime}
                                type='time'
                                onChange={(e) => setStartTime(e.target.value)}
                                disabled ={invalidTitle}
                                />
                                <
                                input
                                className='time2'
                                value={stopTime}
                                type='time'
                                onChange={(e) => setStopTime(e.target.value)}
                                disabled ={invalidTitle}
                                />
                                <
                            input
                            className='date'
                            value={date}
                            type='Date'
                            onChange={(e) => setDate(e.target.value)}
                            disabled ={invalidTitle}
                             />
                        <button  className='cancel-btn btn'  disabled ={invalidTitle} onClick={
                                (e) => {
                                    resetForm()
                                    e.preventDefault()
                                }
                            } >Cancel</button>
                        <button className='add-btn btn' disabled ={invalidTitle} >Add Todo</button>
                    </form>
                </div>
        )
        :
        ('')
      }
    </div>
  )
}
export default Form
