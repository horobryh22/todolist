import {TasksStateType} from '../App';
import {v1} from 'uuid';

export type ActionTypesReducer =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof deleteTasksAC>
    | ReturnType<typeof createTasksAC>;

export type TasksReducerType = (state: TasksStateType, action: ActionTypesReducer) => TasksStateType;

export const TasksReducer: TasksReducerType = (state, action) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const id = action.payload.todolistID;
            return {...state, [id]: state[id].filter(el => el.id !== action.payload.taskId)};
        }
        case 'ADD-TASK': {
            const id = action.payload.todolistID;
            return {...state, [id]: [{id: v1(), title: action.payload.taskName, isDone: false}, ...state[id]]};
        }

        case 'CHANGE-TASK-STATUS': {
            const id = action.payload.todolistID;
            const changedState = state[id].map(el => el.id === action.payload.taskId
                ? {
                    ...el,
                    isDone: action.payload.isDone
                } : el);
            return {...state, [id]: changedState};
        }

        case 'CHANGE-TASK-TITLE': {
            const id = action.payload.todolistId;
            const changedState = state[id].map(el => el.id === action.payload.taskId
                ? {
                    ...el,
                    title: action.payload.newTitle
                }
                : el);
            return {...state, [id]: changedState};
        }
        case 'DELETE-TASKS': {
            const stateCopy = {...state};
            delete stateCopy[action.payload.todolistID];
            return stateCopy;
        }
        case 'CREATE-TASKS': {
            return {...state, [action.payload.id]: []};
        }
        default:
            return state;
    }
}

export const removeTaskAC = (todolistID: string, taskId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            todolistID,
            taskId,
            boolean: true
        }
    } as const;
};
export const addTaskAC = (todolistID: string, taskName: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            todolistID,
            taskName
        }
    } as const;
};
export const changeTaskStatusAC = (todolistID: string, taskId: string, isDone: boolean) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            todolistID,
            taskId,
            isDone
        }
    } as const;
};
export const changeTaskTitleAC = (todolistId: string, taskId: string, newTitle: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            todolistId,
            taskId,
            newTitle
        }
    } as const;
};
export const deleteTasksAC = (todolistID: string) => {
    return {
        type: 'DELETE-TASKS',
        payload: {
            todolistID
        }
    } as const
};
export const createTasksAC = (id: string) => {
    return {
        type: 'CREATE-TASKS',
        payload: {
            id
        }
    } as const
};
