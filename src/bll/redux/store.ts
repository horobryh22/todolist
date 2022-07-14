import {combineReducers, createStore, applyMiddleware, compose} from 'redux';
import {ActionTypesTodolists, todolistsReducer} from './reducers/todolists-reducer/todolists-reducer';
import {ActionTypesReducer, tasksReducer} from './reducers/tasks-reducer/tasks-reducer';
import {devToolsEnhancer} from '@redux-devtools/extension';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {ActionTypesApp, appReducer} from 'bll/redux/reducers/app-reducer/app-reducer';
import {
    ActionsTypesAuth,
    authReducer
} from 'bll/redux/reducers/auth-reducer/auth-reducer';

const composedEnhancers = compose(applyMiddleware(thunk), devToolsEnhancer());

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})

export const store = createStore(rootReducer, undefined, composedEnhancers);

export type AppRootState = ReturnType<typeof store.getState>;
export type AppActionsType = ActionTypesReducer | ActionTypesTodolists | ActionTypesApp | ActionsTypesAuth;
export type AppDispatch = ThunkDispatch<AppRootState, unknown, AppActionsType>;
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootState, unknown, AppActionsType>;







