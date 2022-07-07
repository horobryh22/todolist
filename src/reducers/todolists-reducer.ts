import * as actionCreators from './action-creators/action-creators';
import {
    addTodolistAC,
    changeTodolistNameAC,
    removeToDoListAC,
    setTodolistEntityStatusAC,
    setTodolistsAC
} from './action-creators/action-creators';
import {todolistAPI, TodolistType} from '../api/todolist-api';
import {AppDispatch, AppThunkType} from '../redux/store';
import {RequestStatusType, setAppErrorAC, setAppStatusAC} from './app-reducer';

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
    entityStatus: RequestStatusType
}

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionTypesTodolists): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(td => td.id !== action.payload.todolistID);
        }
        case 'ADD-TODOLIST': {
            return [{...action.payload.todolist, filter: 'all', entityStatus: 'idle'}, ...state];
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
            return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}));
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
    dispatch(setAppStatusAC('loading'));
    const response = await todolistAPI.getTodolists();
    const todolists = response.data;
    dispatch(setTodolistsAC(todolists));
    dispatch(setAppStatusAC('idle'));
}

export const removeTodolistTC = (todolistId: string): AppThunkType => async (dispatch: AppDispatch) => {
    try {
        dispatch(setAppStatusAC('loading'));
        dispatch(setTodolistEntityStatusAC(todolistId, 'loading'));
        const response = await todolistAPI.deleteTodolist(todolistId);
        if (!response.data.resultCode) {
            dispatch(setAppStatusAC('succeeded'));
            dispatch(removeToDoListAC(todolistId));
        } else {
            dispatch(setAppStatusAC('failed'));
            dispatch(setAppErrorAC(response.data.messages[0]));
        }
    } catch (e) {
        const err = e as Error;
        dispatch(setTodolistEntityStatusAC(todolistId, 'idle'));
        dispatch(setAppStatusAC('failed'));
        dispatch(setAppErrorAC(err.message));
    }
}

export const addTodolistTC = (title: string): AppThunkType => async (dispatch: AppDispatch) => {
    try {
        dispatch(setAppStatusAC('loading'));
        const response = await todolistAPI.createTodolist(title);
        if (!response.data.resultCode) {
            const todolist = response.data.data.item;
            dispatch(setAppStatusAC('succeeded'));
            dispatch(addTodolistAC(todolist));
        } else {
            dispatch(setAppStatusAC('failed'));
            dispatch(setAppErrorAC(response.data.messages[0]));
        }
    } catch (e) {
        const err = e as Error;
        dispatch(setAppStatusAC('failed'));
        dispatch(setAppErrorAC(err.message));
    }
}

export const updateTodolistTitleTC = (todolistId: string, title: string): AppThunkType => async (dispatch: AppDispatch) => {
    const response = await todolistAPI.updateTodolist(todolistId, title);
    if (!response.data.resultCode) {
        dispatch(changeTodolistNameAC(todolistId, title));
    }
}
