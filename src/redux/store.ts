import {combineReducers, createStore} from 'redux'
import {todolistsReducer} from '../reducers/todolists-reducer';
import {tasksReducer} from '../reducers/tasks-reducer';
import {devToolsEnhancer} from '@redux-devtools/extension';

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

export const store = createStore(rootReducer, devToolsEnhancer())

export type AppRootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch;






