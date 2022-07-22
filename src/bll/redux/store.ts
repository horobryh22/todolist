import {Action, AnyAction, combineReducers} from 'redux';
import {todolistsReducer} from './reducers/todolists-reducer/todolists-reducer';
import {tasksReducer} from './reducers/tasks-reducer/tasks-reducer';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {appReducer} from 'bll/redux/reducers/app-reducer/app-reducer';
import {authReducer} from 'bll/redux/reducers/auth-reducer/auth-reducer';
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


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


type ThunkAction<R, // Return type of the thunk function
    S, // state type used by getState
    E, // any "extra argument" injected into the thunk
    A extends Action // known types of actions that can be dispatched
    > = (dispatch: ThunkDispatch<S, E, A>, getState: () => S, extraArgument: E) => R

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;







