import {FilterValuesType} from '../components/ToDoList/TodoList';
import {v1} from 'uuid';

export type ActionTypesTodolists =
    ReturnType<typeof removeToDoListAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeFilterAC>
    | ReturnType<typeof changeTodolistNameAC>;

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export const todolistID1 = v1();
export const todolistID2 = v1();

const initialState: Array<TodoListType> = [
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'},
]

export const todolistsReducer = (state: Array<TodoListType> = initialState, action: ActionTypesTodolists): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(td => td.id !== action.payload.todolistID);
        }
        case 'ADD-TODOLIST': {
            return [...state, {id: action.payload.id, title: action.payload.todolistTitle, filter: 'all'}];
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
export const addTodolistAC = (todolistTitle: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            todolistTitle,
            id: v1()
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