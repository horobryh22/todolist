import {combineReducers, createStore, applyMiddleware, compose} from 'redux'
import {todolistsReducer} from '../reducers/todolists-reducer';
import {tasksReducer} from '../reducers/tasks-reducer';
import {devToolsEnhancer} from '@redux-devtools/extension';
import thunk from 'redux-thunk';

const composedEnhancers = compose(applyMiddleware(thunk), devToolsEnhancer());

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

export const store = createStore(rootReducer, undefined, composedEnhancers);

export type AppRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;







