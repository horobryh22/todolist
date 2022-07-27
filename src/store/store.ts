import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { logger } from 'redux-logger';
import thunk from 'redux-thunk';

import { appReducer, authReducer, tasksReducer, todolistsReducer } from 'store';

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().prepend(thunk).concat(logger),
});
