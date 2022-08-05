import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { REQUEST_STATUS } from 'enums';
import {
    addTaskTC,
    addTodolistTC,
    fetchTodolistsTC,
    getTasksTC,
    logoutTC,
    removeTaskTC,
    removeTodolistTC,
    updateTaskStatusTC,
    updateTaskTitleTC,
} from 'store/middlewares';
import { TaskStateType } from 'store/reducers';

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {} as TaskStateType,
    reducers: {
        setTaskEntityStatus: (
            state,
            action: PayloadAction<{
                todolistId: string;
                taskId: string;
                entityStatus: REQUEST_STATUS;
            }>,
        ) => {
            const task = state[action.payload.todolistId].find(
                task => task.id === action.payload.taskId,
            );

            if (task) task.entityStatus = action.payload.entityStatus;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(logoutTC.fulfilled, () => {
                return {};
            })
            .addCase(removeTodolistTC.fulfilled, (state, action) => {
                delete state[action.payload];
            })
            .addCase(addTodolistTC.fulfilled, (state, action) => {
                state[action.payload.id] = [];
            })
            .addCase(fetchTodolistsTC.fulfilled, (state, action) => {
                action.payload.forEach(tl => {
                    state[tl.id] = [];
                });
            })
            .addCase(addTaskTC.fulfilled, (state, action) => {
                state[action.payload.todoListId].unshift({
                    ...action.payload,
                    entityStatus: REQUEST_STATUS.IDLE,
                });
            })
            .addCase(getTasksTC.fulfilled, (state, action) => {
                action.payload.data.tasks.forEach(task =>
                    state[action.payload.todolistId].push({
                        ...task,
                        entityStatus: REQUEST_STATUS.IDLE,
                    }),
                );
            })
            .addCase(removeTaskTC.fulfilled, (state, action) => {
                const index = state[action.payload.todolistId].findIndex(
                    el => el.id === action.payload.data.taskId,
                );

                state[action.payload.todolistId].splice(index, 1);
            })
            .addCase(updateTaskStatusTC.fulfilled, (state, action) => {
                const task = state[action.payload.todolistId].find(
                    el => el.id === action.payload.data.taskId,
                );

                if (task) task.status = action.payload.data.status;
            })
            .addCase(updateTaskTitleTC.fulfilled, (state, action) => {
                const task = state[action.payload.todolistId].find(
                    el => el.id === action.payload.data.taskId,
                );

                if (task) task.title = action.payload.data.title;
            });
    },
});

export default tasksSlice.reducer;

export const { setTaskEntityStatus } = tasksSlice.actions;
