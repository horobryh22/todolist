import { Dispatch } from 'redux'
import {ResponseType} from '../api/todolist-api';
import {setAppErrorAC, setAppStatusAC} from '../reducers/app-reducer';
import {AppDispatch} from '../redux/store';

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: AppDispatch) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: AppDispatch) => {
    dispatch(setAppErrorAC(error.message))
    dispatch(setAppStatusAC('failed'))
}
