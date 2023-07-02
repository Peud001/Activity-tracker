import {configureStore} from '@reduxjs/toolkit';
import TodoReducer from '../features/slice/TodoSlice'

export const store = configureStore({
    reducer : {
        todos : TodoReducer,
    }
})