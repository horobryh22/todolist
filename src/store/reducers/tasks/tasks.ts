import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {REQUEST_STATUS, TASK_STATUS} from 'enums'

import {TaskType} from 'types';
import {TaskStateType} from 'store/reducers';
import {
    addTodolist,
    clearAppData,
    removeTodolist,
    setTodolists
} from 'store/reducers/todolists';

const initialState: TaskStateType = {}

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setTaskEntityStatus: (state, action: PayloadAction<{ todolistId: string, taskId: string, entityStatus: REQUEST_STATUS }>) => {
            const task = state[action.payload.todolistId].find(task => task.id === action.payload.taskId);
            if (task) task.entityStatus = action.payload.entityStatus;
        },
        setTasks: (state, action: PayloadAction<{ todolistId: string, tasks: TaskType[] }>) => {
            action.payload.tasks.forEach(task => (
                state[action.payload.todolistId].push({
                    ...task,
                    entityStatus: REQUEST_STATUS.IDLE
                })
            ))
        },
        removeTask: (state, action: PayloadAction<{ todolistID: string, taskId: string }>) => {
            const index = state[action.payload.todolistID].findIndex(el => el.id === action.payload.taskId);
            state[action.payload.todolistID].splice(index, 1);
        },
        addTask: (state, action: PayloadAction<{ task: TaskType }>) => {
            state[action.payload.task.todoListId].unshift({
                ...action.payload.task,
                entityStatus: REQUEST_STATUS.IDLE
            })
        },
        changeTaskStatus: (state, action: PayloadAction<{ todolistID: string, taskId: string, status: TASK_STATUS }>) => {
            const task = state[action.payload.todolistID].find(el => el.id === action.payload.taskId);
            if (task) task.status = action.payload.status;
        },
        changeTaskTitle: (state, action: PayloadAction<{ todolistId: string, taskId: string, newTitle: string }>) => {
            const task = state[action.payload.todolistId].find(el => el.id === action.payload.taskId);
            if (task) task.title = action.payload.newTitle;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(clearAppData, () => {
                return {};
            })
            .addCase(removeTodolist, (state, action) => {
                delete state[action.payload.todolistId];
            })
            .addCase(addTodolist, (state, action) => {
                state[action.payload.todolist.id] = [];
            })
            .addCase(setTodolists, (state, action) => {
                action.payload.todolists.forEach((tl) => {
                    state[tl.id] = [];
                })
            })
    }
})

export default tasksSlice.reducer;

export const {
    addTask,
    removeTask,
    changeTaskStatus,
    changeTaskTitle,
    setTaskEntityStatus,
    setTasks,
} = tasksSlice.actions;












