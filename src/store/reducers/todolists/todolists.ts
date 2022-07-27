import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { REQUEST_STATUS } from 'enums';
import { TodolistDomainType } from 'store/reducers';
import { FilterValuesType, TodolistType } from 'types';

const initialState: Array<TodolistDomainType> = [];

const todolistsSlice = createSlice({
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
                entityStatus: REQUEST_STATUS.IDLE,
            });
        },
        changeFilter: (
            state,
            action: PayloadAction<{ todolistId: string; filter: FilterValuesType }>,
        ) => {
            const todolist = state.find(td => td.id === action.payload.todolistId);

            if (todolist) todolist.filter = action.payload.filter;
        },
        changeTodolistTitle: (
            state,
            action: PayloadAction<{ todolistId: string; title: string }>,
        ) => {
            const todolist = state.find(td => td.id === action.payload.todolistId);

            if (todolist) todolist.title = action.payload.title;
        },
        setTodolists: (state, action: PayloadAction<{ todolists: TodolistType[] }>) => {
            action.payload.todolists.forEach(tl => {
                state.push({
                    ...tl,
                    filter: 'all',
                    entityStatus: REQUEST_STATUS.IDLE,
                });
            });
        },
        setTodolistEntityStatus: (
            state,
            action: PayloadAction<{ todolistId: string; entityStatus: REQUEST_STATUS }>,
        ) => {
            const todolist = state.find(td => td.id === action.payload.todolistId);

            if (todolist) todolist.entityStatus = action.payload.entityStatus;
        },
        clearAppData: () => {
            return [];
        },
    },
});

export default todolistsSlice.reducer;

export const {
    removeTodolist,
    addTodolist,
    setTodolistEntityStatus,
    changeTodolistTitle,
    setTodolists,
    changeFilter,
    clearAppData,
} = todolistsSlice.actions;
