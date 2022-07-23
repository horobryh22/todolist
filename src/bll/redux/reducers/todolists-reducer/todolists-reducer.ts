import {todolistAPI, TodolistType} from '../../../../dal/api/todolist-api';
import {AppThunk} from '../../store';
import {REQUEST_STATUS, setAppStatus} from '../app-reducer/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../../utils/error-utils';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type FilterValuesType = 'all' | 'completed' | 'active';

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: REQUEST_STATUS
}

const initialState: Array<TodolistDomainType> = [];

export const todolistsSlice = createSlice({
    name: 'todolists',
    initialState,
    reducers: {
        removeTodolist: (state, action: PayloadAction<{ todolistId: string }>) => {
            const index = state.findIndex(td => td.id === action.payload.todolistId);
            state.splice(index, 1);
        },
        addTodolist: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
            state.unshift({
                ...action.payload.todolist,
                filter: 'all',
                entityStatus: REQUEST_STATUS.IDLE
            })
        },
        changeFilter: (state, action: PayloadAction<{ todolistId: string, filter: FilterValuesType }>) => {
            const todolist = state.find(td => td.id === action.payload.todolistId);
            if (todolist) todolist.filter = action.payload.filter;
        },
        changeTodolistTitle: (state, action: PayloadAction<{ todolistId: string, title: string }>) => {
            const todolist = state.find(td => td.id === action.payload.todolistId);
            if (todolist) todolist.title = action.payload.title;
        },
        setTodolists: (state, action: PayloadAction<{ todolists: TodolistType[] }>) => {
            action.payload.todolists.forEach(tl => {
                state.push({
                    ...tl,
                    filter: 'all',
                    entityStatus: REQUEST_STATUS.IDLE
                })
            });
        },
        setTodolistEntityStatus: (state, action: PayloadAction<{ todolistId: string, entityStatus: REQUEST_STATUS }>) => {
            const todolist = state.find(td => td.id === action.payload.todolistId);
            if (todolist) todolist.entityStatus = action.payload.entityStatus;
        },
        clearAppData: () => {
            return [];
        }
    }
})

export const todolistsReducer = todolistsSlice.reducer;
export const {
    removeTodolist,
    addTodolist,
    setTodolistEntityStatus,
    changeTodolistTitle,
    setTodolists,
    changeFilter,
    clearAppData
} = todolistsSlice.actions;

export const getTodolistsTC = (): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatus(REQUEST_STATUS.LOADING));
        const response = await todolistAPI.getTodolists();
        const todolists = response.data;
        dispatch(setTodolists({todolists}));
        dispatch(setAppStatus(REQUEST_STATUS.SUCCESS));
    } catch (e) {
        handleServerNetworkError(e as Error, dispatch);
    }
}

export const removeTodolistTC = (todolistId: string): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatus(REQUEST_STATUS.LOADING));
        dispatch(setTodolistEntityStatus({
            todolistId,
            entityStatus: REQUEST_STATUS.LOADING
        }));
        const response = await todolistAPI.deleteTodolist(todolistId);
        if (!response.data.resultCode) {
            dispatch(setAppStatus(REQUEST_STATUS.SUCCESS));
            dispatch(removeTodolist({todolistId}));
        } else {
            handleServerAppError(response.data, dispatch);
        }
    } catch (e) {
        dispatch(setTodolistEntityStatus({
            todolistId,
            entityStatus: REQUEST_STATUS.IDLE
        }));
        handleServerNetworkError(e as Error, dispatch);
    }
}

export const addTodolistTC = (title: string): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatus(REQUEST_STATUS.LOADING));
        const response = await todolistAPI.createTodolist(title);
        if (!response.data.resultCode) {
            const todolist = response.data.data.item;
            dispatch(setAppStatus(REQUEST_STATUS.SUCCESS));
            dispatch(addTodolist({todolist}));
        } else {
            handleServerAppError(response.data, dispatch);
        }
    } catch (e) {
        handleServerNetworkError(e as Error, dispatch);
    }
}

export const updateTodolistTitleTC = (todolistId: string, title: string): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatus(REQUEST_STATUS.LOADING));
        const response = await todolistAPI.updateTodolist(todolistId, title);
        if (!response.data.resultCode) {
            dispatch(changeTodolistTitle({todolistId, title}));
            dispatch(setAppStatus(REQUEST_STATUS.SUCCESS));
        } else {
            handleServerAppError(response.data, dispatch);
        }
    } catch (e) {
        handleServerNetworkError(e as Error, dispatch);
    }
}
