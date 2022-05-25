import {TasksStateType} from '../App';
import {v1} from 'uuid';
import {addTodolistAC, removeToDoListAC} from './todolists-reducer';

export type ActionTypesReducer =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof removeToDoListAC>
    | ReturnType<typeof addTodolistAC>;

export const tasksReducer = (state: TasksStateType, action: ActionTypesReducer): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].filter(el => el.id !== action.payload.taskId)
            }
        case 'ADD-TASK':
            const newTask = {id: v1(), title: action.payload.taskName, isDone: false}
            return {...state, [action.payload.todolistID]: [newTask, ...state[action.payload.todolistID]]}
        case 'CHANGE-TASK-STATUS':
            return {...state, [action.payload.todolistID]: state[action.payload.todolistID].map(el => el.id === action.payload.taskId ? {...el, isDone: action.payload.isDone} : el)}
        case 'CHANGE-TASK-TITLE':
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.taskId ? {...el, title: action.payload.newTitle} : el)}
        case 'ADD-TODOLIST':
            return {...state, [action.payload.id]: []}
        case 'REMOVE-TODOLIST':
            const copyState = {...state}
            delete copyState[action.payload.todolistID]
            return copyState;
        default:
            return state;
    }
}

export const removeTaskAC = (todolistID: string, taskId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            todolistID,
            taskId
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
