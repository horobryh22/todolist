import {v1} from 'uuid';
import {addTodolistAC, removeToDoListAC, todolistID1, todolistID2} from './todolists-reducer';
import {TasksType} from '../components/ToDoList/TodoList';

export type ActionTypesReducer =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof removeToDoListAC>
    | ReturnType<typeof addTodolistAC>;


export type TasksStateType = {
    [key: string]: Array<TasksType>
}

const initialState: TasksStateType = {
    [todolistID1]: [
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Rest API', isDone: false},
        {id: v1(), title: 'GraphQL', isDone: false},
    ],
    [todolistID2]: [
        {id: v1(), title: 'HTML&CSS2', isDone: true},
        {id: v1(), title: 'JS2', isDone: true},
        {id: v1(), title: 'ReactJS2', isDone: false},
        {id: v1(), title: 'Rest API2', isDone: false},
        {id: v1(), title: 'GraphQL2', isDone: false},
    ]
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionTypesReducer): TasksStateType => {
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
            return {...state,
                [action.payload.todolistID]: state[action.payload.todolistID].map(el => el.id === action.payload.taskId ? {
                    ...el,
                    isDone: action.payload.isDone
                } : el)
            }
        case 'CHANGE-TASK-TITLE':
            return {...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.taskId ? {
                    ...el,
                    title: action.payload.newTitle
                } : el)
            }
        case 'ADD-TODOLIST':
            return {...state, [action.payload.id]: []};
        case 'REMOVE-TODOLIST':
            const copyState = {...state}
            delete copyState[action.payload.todolistID];
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
