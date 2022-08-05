import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { REQUEST_STATUS } from 'enums';
import {
    addTodolistTC,
    fetchTodolistsTC,
    logoutTC,
    removeTodolistTC,
    updateTodolistTitleTC,
} from 'store/middlewares';
import { TodolistDomainType } from 'store/reducers';
import { FilterValuesType } from 'types';

const todolistsSlice = createSlice({
    name: 'todolists',
    initialState: [] as Array<TodolistDomainType>,
    reducers: {
        changeFilter: (
            state,
            action: PayloadAction<{ todolistId: string; filter: FilterValuesType }>,
        ) => {
            const todolist = state.find(td => td.id === action.payload.todolistId);

            if (todolist) todolist.filter = action.payload.filter;
        },
        setTodolistEntityStatus: (
            state,
            action: PayloadAction<{ todolistId: string; entityStatus: REQUEST_STATUS }>,
        ) => {
            const todolist = state.find(td => td.id === action.payload.todolistId);

            if (todolist) todolist.entityStatus = action.payload.entityStatus;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(addTodolistTC.fulfilled, (state, action) => {
                state.unshift({
                    ...action.payload,
                    filter: 'all',
                    entityStatus: REQUEST_STATUS.IDLE,
                });
            })
            .addCase(fetchTodolistsTC.fulfilled, (state, action) => {
                action.payload.forEach(tl => {
                    state.push({
                        ...tl,
                        filter: 'all',
                        entityStatus: REQUEST_STATUS.IDLE,
                    });
                });
            })
            .addCase(removeTodolistTC.fulfilled, (state, action) => {
                const index = state.findIndex(td => td.id === action.payload);

                state.splice(index, 1);
            })
            .addCase(updateTodolistTitleTC.fulfilled, (state, action) => {
                const todolist = state.find(td => td.id === action.payload.todolistId);

                if (todolist) todolist.title = action.payload.data.title;
            })
            .addCase(logoutTC.fulfilled, () => {
                return [];
            });
    },
});

export default todolistsSlice.reducer;

export const { setTodolistEntityStatus, changeFilter } = todolistsSlice.actions;
