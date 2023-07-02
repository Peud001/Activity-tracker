import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import ShowTimeAgo from './ShowTimeAgo';
import {
    TodosState,
    toggleDisplayState,
    toggleScreen,
    toggleComplete,
    deleteTodo,
    updateTodo,
    invalidInput,
    invalidInputStatus
} from '../features/slice/TodoSlice';
import '../components/todoImg/background3.webp'

const Main = () => {
    const dispatch = useDispatch()
    const todos = useSelector(TodosState)
    const toggleDisplay = useSelector(toggleDisplayState)
    const invalidTitle = useSelector(invalidInputStatus)

    const [editPopupStatus, setEditPopupStatus] = useState(false)
    const [seeMore, setSeeMore] = useState()

    const [editId, setEditId] = useState('') 
    const [editTitle, setEditTitle] = useState('')
    const [editDescription, setEditDescription] = useState('')
    const [editStartTime, setEditStartTime] = useState('')
    const [editStopTime, setEditStopTime] = useState('')
    const [editDate, setEditDate] = useState('')
    const [editStatus, setEditStatus] = useState(null)

    const handleClick = () => {
        dispatch(toggleScreen())
    }

    const handleEdit = (e) => {
        e.preventDefault()

       if (editTitle.length > 0){
        dispatch(updateTodo(
            {
                id : editId,
                title: editTitle,
                timeAgo: new Date().toISOString(),
                description : editDescription,
                startTime : editStartTime,
                stopTime : editStopTime,
                date : editDate,
                completed : editStatus ? true : false
            }
        ))
        setEditPopupStatus(preStatus => !preStatus)
       }else{
        dispatch(invalidInput())
       }
    }
    const handleSeeMore = (id) => {
        setSeeMore(prev => {
            if (prev === id){
                return null
            }
            return id
        })
    }
    return(
        <div>
        {
            toggleDisplay? ('')
            :
            (
                <div>
                   <div className='main-btn2'>
                   <button
                    className='main-btn1' 
                   onClick={handleClick}
                   disabled={editPopupStatus}
                   >
                   Enter Todo
                   </button>
                   </div>
                   {
                    todos.length < 1? (<p className='no-task' >No Task...</p>)
                    :
                    (
                        <div>
                            {
                                todos.map((todo, index) => {
                                    return(
                                    <div key = {todo.id} className='display-container'>
                                        <div className={
                                            todo.completed? 'done display-todo' : 'display-todo'
                                        }>
                                            <div className='todo-content' >
                                                <div className='todo-display1'>
                                                    <span className='todo-num' >{index + 1}</span>
                                                    <span>{todo.title}</span>
                                                    <div className='timeago' >
                                                       <ShowTimeAgo timestamp={todo.timeAgo}/>
                                                    </div>
                                                </div>
                                                {
                                                    seeMore === todo.id?
                                                    (
                                                        <div className='todo-display2' >
                                                  <p className='description'>{todo.description}</p>
                                                    <div>
                                                      <span className='time start'>Set start : {todo.startTime}</span>
                                                      <span className='time stop'>Set stop : {todo.stopTime}</span>
                                                    <div className='date-display'>{todo.date}</div>
                                                    <button
                                                    className='btn-ml'
                                                    onClick={() => handleSeeMore(todo.id)}
                                                    >See less</button>
                                                 </div>
                                             </div>
                                                    )
                                                    :
                                                    <button className='btn-ml'
                                                    onClick={() => handleSeeMore(todo.id)}
                                                    >See more</button>
                                                }
                                            </div>
                                            <div className='todo-actions'>
                                               <span className='check icons'><FontAwesomeIcon onClick={
                                                () => {
                                                    dispatch(toggleComplete({id : todo.id}))
                                                }
                                               } icon={faCircleCheck}/></span>
                                               {
                                                todo.completed? null
                                                :
                                                <span className='edit icons' onClick={
                                                () => {
                                                    setEditPopupStatus(prevEditStatus => !prevEditStatus)
                                                    setEditId(todo.id)
                                                    setEditTitle(todo.title)
                                                    setEditDescription(todo.description)
                                                    setEditStartTime(todo.startTime)
                                                    setEditStopTime(todo.stopTime)
                                                    setEditDate(todo.date)
                                                    setEditStatus(todo.completed? true : false)
                                                }
                                               }><FontAwesomeIcon icon={faPen}/></span>
                                               }
                                               <span className='delete icons'><FontAwesomeIcon onClick={() => dispatch(deleteTodo({id : todo.id}))} icon={faTrashCan}/></span>
                                            </div>
                                        </div>
                                    </div>
                                    )
                                })
                            }
                        </div>
                    )
                   }
                </div>
            )
        }
        {
            editPopupStatus?
            (
                <div className='edit-popup'>
                    <form className='add-todo-form edit-form' >
                        <
                        input
                        className='title'
                        type='text'
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        disabled={invalidTitle}
                        />                   
                        <
                            textarea
                            className='description'
                            type='text'
                            value={editDescription}
                            onChange={(e) => setEditDescription(e.target.value)}
                            disabled={invalidTitle}
                            ></textarea>
                      <
                                input
                                className='time1'
                                    value={editStartTime}
                                    type='time'
                                    onChange={(e) => setEditStartTime(e.target.value)}
                                    disabled={invalidTitle}
                                    />
                                <
                                input
                                className='time2'
                                    value={editStopTime}
                                    type='time'
                                    onChange={(e) => setEditStopTime(e.target.value)}
                                    disabled={invalidTitle}
                                    />
                                <
                            input
                            className='date'
                            Date
                            value={editDate}
                            type='Date'
                            onChange={(e) => setEditDate(e.target.value)}
                            disabled={invalidTitle}
                             />
                       <button className='cancel-btn btn' onClick={
                                (e) => {
                                    e.preventDefault()
                                    setEditPopupStatus(prevStatus => !prevStatus)
                                }
                            } disabled={invalidTitle} >Cancel</button>
                            <button className='add-btn btn' onClick={(e) => handleEdit(e)} disabled={invalidTitle} >Submit</button>
                    </form>
                </div>
            )
            :
            null
        }
        </div>
    )
}
export default Main