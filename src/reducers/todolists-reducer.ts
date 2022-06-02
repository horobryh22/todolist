import {FilterValuesType} from '../components/ToDoList/TodoList';
import {v1} from 'uuid';
import * as actionCreators from './action-creators/action-creators';

export type ActionTypesTodolists =
    ReturnType<typeof actionCreators.removeToDoListAC>
    | ReturnType<typeof actionCreators.addTodolistAC>
    | ReturnType<typeof actionCreators.changeFilterAC>
    | ReturnType<typeof actionCreators.changeTodolistNameAC>;

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

