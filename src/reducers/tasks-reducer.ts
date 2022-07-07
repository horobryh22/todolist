import * as actionCreators from './action-creators/action-creators';
import {
    addTaskAC,
    addTodolistAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    removeToDoListAC,
    setTasksAC
} from './action-creators/action-creators';
import {AppDispatch, AppRootState, AppThunkType} from '../redux/store';
import {TaskStatus, TaskType, todolistAPI} from '../api/todolist-api';
import {setAppErrorAC, setAppStatusAC} from './app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../utils/error-utils';

export type ActionTypesReducer =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof removeToDoListAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof actionCreators.setTodolistsAC>
    | ReturnType<typeof actionCreators.setTasksAC>;


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionTypesReducer): TasksStateType => {
    switch (action.type) {
        case 'SET-TASKS':
            return {
                ...state,
                [action.payload.todolistId]: action.payload.tasks
            }
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].filter(el => el.id !== action.payload.taskId)
            }
        case 'ADD-TASK':
            return {
                ...state,
                [action.payload.task.todoListId]: [action.payload.task, ...state[action.payload.task.todoListId]]
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].map(el => el.id === action.payload.taskId ? {
                    ...el,
                    status: action.payload.status
                } : el)
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.taskId ? {
                    ...el,
                    title: action.payload.newTitle
                } : el)
            }
        case 'ADD-TODOLIST':
            debugger;
            return {...state, [action.payload.todolist.id]: []};
        case 'REMOVE-TODOLIST':
            const copyState = {...state}
            delete copyState[action.payload.todolistID];
            return copyState;
        case 'SET-TODOLISTS':
            const newState = {...state};
            action.payload.todolists.forEach((tl) => {
                newState[tl.id] = [];
            })
            return newState;
        default:
            return state;
    }
}

export const getTasksTC = (todolistId: string): AppThunkType => async (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC('loading'));
    const response = await todolistAPI.getTasks(todolistId);
    const tasks = response.data.items;
    dispatch(setTasksAC(todolistId, tasks));
    dispatch(setAppStatusAC('idle'));
}

export const addTaskTC = (todolistId: string, title: string): AppThunkType => async (dispatch: AppDispatch) => {
    try {
        const response = await todolistAPI.createTask(todolistId, title);
        if (!response.data.resultCode) {
            const task = response.data.data.item;
            dispatch(addTaskAC(task));
        } else {
            handleServerAppError<{ item: TaskType }>(response.data, dispatch)
        }
    } catch (e) {
        const err = e as Error;
        handleServerNetworkError(err, dispatch);
    }
}

export const removeTaskTC = (todolistId: string, taskId: string): AppThunkType => async (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC('loading'));
    const response = await todolistAPI.deleteTask(todolistId, taskId);
    if (!response.data.resultCode) {
        dispatch(removeTaskAC(todolistId, taskId));
    }
    dispatch(setAppStatusAC('idle'));
}

export const updateTaskStatusTC = (taskId: string, todolistId: string, status: TaskStatus): AppThunkType => async (dispatch: AppDispatch, getState: () => AppRootState) => {
    try {
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
                dispatch(changeTaskStatusAC(todolistId, taskId, status));
            } else {
                dispatch(setAppErrorAC(response.data.messages[0]));
            }
        }
    } catch (e) {
        const err = e as Error;
        handleServerNetworkError(err, dispatch);
    }
}

export const updateTaskTitleTC = (taskId: string, todolistId: string, title: string): AppThunkType => async (dispatch: AppDispatch, getState: () => AppRootState) => {
    const tasks = getState().tasks[todolistId];
    const task = tasks.find(t => {
        return t.id === taskId;
    })

    if (task) {
        await todolistAPI.updateTask(todolistId, taskId, {
            title: title,
            startDate: task.startDate,
            priority: task.priority,
            description: task.description,
            deadline: task.deadline,
            status: task.status
        });
        dispatch(changeTaskTitleAC(todolistId, taskId, title));
    }
}


