import * as actionCreators from '../action-creators/action-creators';
import {
    addTodolistAC,
    changeTodolistNameAC,
    removeToDoListAC,
    setTodolistEntityStatusAC,
    setTodolistsAC
} from '../action-creators/action-creators';
import {todolistAPI, TodolistType} from '../../../../dal/api/todolist-api';
import {AppDispatch, AppThunkType} from '../../store';
import {REQUEST_STATUS, setAppStatusAC} from '../app-reducer/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../../utils/error-utils';

export type ActionTypesTodolists =
    ReturnType<typeof actionCreators.removeToDoListAC>
    | ReturnType<typeof actionCreators.addTodolistAC>
    | ReturnType<typeof actionCreators.changeFilterAC>
    | ReturnType<typeof actionCreators.changeTodolistNameAC>
    | ReturnType<typeof actionCreators.setTodolistsAC>
    | ReturnType<typeof actionCreators.setTodolistEntityStatusAC>;

export type FilterValuesType = 'all' | 'completed' | 'active';

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: REQUEST_STATUS
}

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionTypesTodolists): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(td => td.id !== action.payload.todolistID);
        }
        case 'ADD-TODOLIST': {
            return [{...action.payload.todolist, filter: 'all', entityStatus: REQUEST_STATUS.IDLE}, ...state];
        }
        case 'CHANGE-FILTER': {
            return state.map(td => td.id === action.payload.todolistID
                ? {...td, filter: action.payload.filter}
                : td);
        }
        case 'CHANGE-TODOLIST-NAME': {
            return state.map(td => td.id === action.payload.todolistId
                ? {...td, title: action.payload.newTitle}
                : td);
        }
        case 'SET-TODOLISTS': {
            return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: REQUEST_STATUS.IDLE}));
        }
        case 'SET-TODOLIST-ENTITY-STATUS': {
            return state.map(tl => tl.id === action.payload.todolistId
                ? {...tl, entityStatus: action.payload.entityStatus}
                : tl)
        }
        default:
            return state;
    }
}

export const getTodolistsTC = (): AppThunkType => async (dispatch: AppDispatch) => {
    try {
        dispatch(setAppStatusAC(REQUEST_STATUS.LOADING));
        const response = await todolistAPI.getTodolists();
        const todolists = response.data;
        dispatch(setTodolistsAC(todolists));
        dispatch(setAppStatusAC(REQUEST_STATUS.SUCCESS));
    } catch (e) {
        handleServerNetworkError(e as Error, dispatch);
    }
}

export const removeTodolistTC = (todolistId: string): AppThunkType => async (dispatch: AppDispatch) => {
    try {
        dispatch(setAppStatusAC(REQUEST_STATUS.LOADING));
        dispatch(setTodolistEntityStatusAC(todolistId, REQUEST_STATUS.LOADING));
        const response = await todolistAPI.deleteTodolist(todolistId);
        if (!response.data.resultCode) {
            dispatch(setAppStatusAC(REQUEST_STATUS.SUCCESS));
            dispatch(removeToDoListAC(todolistId));
        } else {
            handleServerAppError(response.data, dispatch);
        }
    } catch (e) {
        dispatch(setTodolistEntityStatusAC(todolistId, REQUEST_STATUS.IDLE));
        handleServerNetworkError(e as Error, dispatch);
    }
}

export const addTodolistTC = (title: string): AppThunkType => async (dispatch: AppDispatch) => {
    try {
        dispatch(setAppStatusAC(REQUEST_STATUS.LOADING));
        const response = await todolistAPI.createTodolist(title);
        if (!response.data.resultCode) {
            const todolist = response.data.data.item;
            dispatch(setAppStatusAC(REQUEST_STATUS.SUCCESS));
            dispatch(addTodolistAC(todolist));
        } else {
            handleServerAppError(response.data, dispatch);
        }
    } catch (e) {
        handleServerNetworkError(e as Error, dispatch);
    }
}

export const updateTodolistTitleTC = (todolistId: string, title: string): AppThunkType => async (dispatch: AppDispatch) => {
    try {
        dispatch(setAppStatusAC(REQUEST_STATUS.LOADING));
        const response = await todolistAPI.updateTodolist(todolistId, title);
        if (!response.data.resultCode) {
            dispatch(changeTodolistNameAC(todolistId, title));
            dispatch(setAppStatusAC(REQUEST_STATUS.SUCCESS));
        } else {
            handleServerAppError(response.data, dispatch);
        }
    } catch (e) {
        handleServerNetworkError(e as Error, dispatch);
    }
}
