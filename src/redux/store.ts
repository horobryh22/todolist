import {combineReducers, createStore} from 'redux'
import {todolistsReducer} from '../reducers/todolists-reducer';
import {tasksReducer} from '../reducers/tasks-reducer';

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

export type AppRootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch;

export const store = createStore(rootReducer);
