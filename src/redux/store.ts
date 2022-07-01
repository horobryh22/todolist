import {combineReducers, createStore, applyMiddleware, compose} from 'redux'
import {ActionTypesTodolists, todolistsReducer} from '../reducers/todolists-reducer';
import {ActionTypesReducer, tasksReducer} from '../reducers/tasks-reducer';
import {devToolsEnhancer} from '@redux-devtools/extension';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';

const composedEnhancers = compose(applyMiddleware(thunk), devToolsEnhancer());

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

export const store = createStore(rootReducer, undefined, composedEnhancers);

export type AppRootState = ReturnType<typeof store.getState>;
export type AppActionsType = ActionTypesReducer | ActionTypesTodolists;
export type AppDispatch = ThunkDispatch<AppRootState, unknown, AppActionsType>;
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootState, unknown, AppActionsType>;







