import {FilterValuesType} from '../components/ToDoList/TodoList';
import * as actionCreators from './action-creators/action-creators';
import {setTodolistsAC} from './action-creators/action-creators';
import {todolistAPI} from '../api/todolist-api';
import {AppDispatch} from '../redux/store';

export type ActionTypesTodolists =
    ReturnType<typeof actionCreators.removeToDoListAC>
    | ReturnType<typeof actionCreators.addTodolistAC>
    | ReturnType<typeof actionCreators.changeFilterAC>
    | ReturnType<typeof actionCreators.changeTodolistNameAC>
    | ReturnType<typeof actionCreators.setTodolistsAC>;

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

const initialState: Array<TodoListType> = []

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
        case 'SET-TODOLISTS': {
            return action.payload.todolists.map(tl => ({...tl, filter: 'all'}));
        }
        default:
            return state;
    }
}

export const getTodolistsTC = () => async (dispatch: AppDispatch) => {
    const response = await todolistAPI.getTodolists();
    const todolists = response.data;
    dispatch(setTodolistsAC(todolists));
}
