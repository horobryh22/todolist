import {AppThunk, RootState} from '../../store';
import {TASK_STATUS, TaskType, todolistAPI} from '../../../../dal/api/todolist-api';
import {REQUEST_STATUS, setAppStatus} from '../app-reducer/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../../utils/error-utils';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {
    addTodolist,
    clearAppData,
    removeTodolist,
    setTodolists
} from 'bll/redux/reducers/todolists-reducer/todolists-reducer';

export type TaskDomainType = TaskType & {
    entityStatus: REQUEST_STATUS
}

export type TasksStateType = {
    [key: string]: Array<TaskDomainType>
}

const initialState: TasksStateType = {}

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

export const tasksReducer = tasksSlice.reducer;

export const {
    removeTask,
    addTask,
    changeTaskStatus,
    changeTaskTitle,
    setTaskEntityStatus,
    setTasks,
} = tasksSlice.actions;

export const getTasksTC = (todolistId: string): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatus(REQUEST_STATUS.LOADING));
        const response = await todolistAPI.getTasks(todolistId);
        const tasks = response.data.items;
        dispatch(setTasks({todolistId, tasks}));
        dispatch(setAppStatus(REQUEST_STATUS.SUCCESS));
    } catch (e) {
        handleServerNetworkError(e as Error, dispatch);
    }
}

export const addTaskTC = (todolistId: string, title: string): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatus(REQUEST_STATUS.LOADING));
        const response = await todolistAPI.createTask(todolistId, title);
        if (!response.data.resultCode) {
            const task = response.data.data.item;
            dispatch(addTask({task}));
            dispatch(setAppStatus(REQUEST_STATUS.SUCCESS));
        } else {
            handleServerAppError<{ item: TaskType }>(response.data, dispatch)
        }
    } catch (e) {
        handleServerNetworkError(e as Error, dispatch);
    }
}

export const removeTaskTC = (todolistId: string, taskId: string): AppThunk => async (dispatch) => {
    try {
        dispatch(setTaskEntityStatus({
            todolistId,
            taskId,
            entityStatus: REQUEST_STATUS.LOADING
        }));
        dispatch(setAppStatus(REQUEST_STATUS.LOADING));
        const response = await todolistAPI.deleteTask(todolistId, taskId);
        if (!response.data.resultCode) {
            dispatch(removeTask({todolistID: todolistId, taskId}));
            dispatch(setAppStatus(REQUEST_STATUS.SUCCESS));
        } else {
            handleServerAppError(response.data, dispatch);
        }
    } catch (e) {
        dispatch(setTaskEntityStatus({
            todolistId,
            taskId,
            entityStatus: REQUEST_STATUS.IDLE
        }));
        handleServerNetworkError(e as Error, dispatch);
    }
}

export const updateTaskStatusTC = (taskId: string, todolistId: string, status: TASK_STATUS): AppThunk => async (dispatch, getState: () => RootState) => {
    try {
        dispatch(setTaskEntityStatus({
            todolistId,
            taskId,
            entityStatus: REQUEST_STATUS.LOADING
        }));
        dispatch(setAppStatus(REQUEST_STATUS.LOADING));
        const tasks = getState().tasks[todolistId];
        const task = tasks.find(t => {
            return t.id === taskId;
        })

        if (task) {
            const response = await todolistAPI.updateTask(todolistId, taskId, {
                title: task.title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: status
            });
            if (!response.data.resultCode) {
                dispatch(changeTaskStatus({todolistID: todolistId, taskId, status}));
                dispatch(setAppStatus(REQUEST_STATUS.SUCCESS));
                dispatch(setTaskEntityStatus({
                    todolistId,
                    taskId,
                    entityStatus: REQUEST_STATUS.SUCCESS
                }));
            } else {
                handleServerAppError(response.data, dispatch);
            }
        }
    } catch (e) {
        handleServerNetworkError(e as Error, dispatch);
        dispatch(setTaskEntityStatus({
            todolistId,
            taskId,
            entityStatus: REQUEST_STATUS.IDLE
        }));
    }
}

export const updateTaskTitleTC = (taskId: string, todolistId: string, title: string): AppThunk => async (dispatch, getState: () => RootState) => {
    try {
        dispatch(setTaskEntityStatus({
            todolistId,
            taskId,
            entityStatus: REQUEST_STATUS.LOADING
        }));
        dispatch(setAppStatus(REQUEST_STATUS.LOADING));
        const tasks = getState().tasks[todolistId];
        const task = tasks.find(t => {
            return t.id === taskId;
        })

        if (task) {
            const response = await todolistAPI.updateTask(todolistId, taskId, {
                title: title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: task.status
            });
            if (!response.data.resultCode) {
                dispatch(changeTaskTitle({todolistId, taskId, newTitle: title}));
                dispatch(setAppStatus(REQUEST_STATUS.SUCCESS));
                dispatch(setTaskEntityStatus({
                    todolistId,
                    taskId,
                    entityStatus: REQUEST_STATUS.SUCCESS
                }));
            } else {
                handleServerAppError(response.data, dispatch);
            }
        }
    } catch (e) {
        handleServerNetworkError(e as Error, dispatch);
        dispatch(setTaskEntityStatus({
            todolistId,
            taskId,
            entityStatus: REQUEST_STATUS.IDLE
        }));
    }
}


