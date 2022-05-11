import {TodoListType} from '../App';
import {FilterValuesType} from '../components/ToDoList/TodoList';

export type ActionTypesTodolists =
    ReturnType<typeof removeToDoListAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeFilterAC>
    | ReturnType<typeof changeTodolistNameAC>;

export type TodolistsReducerType = (state: Array<TodoListType>, action: ActionTypesTodolists) => Array<TodoListType>;

export const TodolistsReducer: TodolistsReducerType = (state, action) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(td => td.id !== action.payload.todolistID);
        }
        case 'ADD-TODOLIST': {
            state = [{id: action.payload.id, title: action.payload.todolistTitle, filter: 'all'}, ...state];
            return state;
        }
        case 'CHANGE-FILTER': {
            return state.map(td => td.id === action.payload.todolistID
                ? {...td, filter: action.payload.filter}
                : td);
        }
        case 'CHANGE-TODOLIST-NAME': {
            return state.map(td => td.id === action.payload.todolistId
                ? {...td, title: action.payload.newTitle}
                : td);
        }
        default:
            return state;
    }
}

export const removeToDoListAC = (todolistID: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistID
        }
    } as const
};
export const addTodolistAC = (todolistTitle: string, id: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            todolistTitle,
            id
        }
    } as const
};
export const changeFilterAC = (todolistID: string, filter: FilterValuesType) => {
    return {
        type: 'CHANGE-FILTER',
        payload: {
            todolistID,
            filter
        }
    } as const
};
export const changeTodolistNameAC = (todolistId: string, newTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-NAME',
        payload: {
            todolistId,
            newTitle
        }
    } as const
};