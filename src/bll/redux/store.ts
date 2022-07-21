import {combineReducers} from 'redux';
import {
    ActionTypesTodolists,
    todolistsReducer
} from './reducers/todolists-reducer/todolists-reducer';
import {ActionTypesReducer, tasksReducer} from './reducers/tasks-reducer/tasks-reducer';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {ActionTypesApp, appReducer} from 'bll/redux/reducers/app-reducer/app-reducer';
import {
    ActionsTypesAuth,
    authReducer
} from 'bll/redux/reducers/auth-reducer/auth-reducer';
import {configureStore} from '@reduxjs/toolkit';
import {logger} from 'redux-logger';

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
            .prepend(thunk)
            .concat(logger)
})

export type AppRootState = ReturnType<typeof store.getState>;
export type AppActionsType =
    ActionTypesReducer
    | ActionTypesTodolists
    | ActionTypesApp
    | ActionsTypesAuth;
export type AppDispatch = ThunkDispatch<AppRootState, unknown, AppActionsType>;
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootState, unknown, AppActionsType>;







