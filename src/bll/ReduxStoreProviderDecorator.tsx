import React from 'react'
import {Provider} from 'react-redux'
import {combineReducers, createStore} from 'redux'
import {v1} from 'uuid'
import {tasksReducer} from './redux/reducers/tasks-reducer/tasks-reducer';
import {todolistsReducer} from './redux/reducers/todolists-reducer/todolists-reducer';
import {AppRootState} from './redux/store';
import {TaskPriority, TASK_STATUS} from '../dal/api/todolist-api';
import {appReducer, REQUEST_STATUS} from './redux/reducers/app-reducer/app-reducer';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer
})

const initialGlobalState: AppRootState = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus: REQUEST_STATUS.IDLE},
        {id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate: '', order: 0, entityStatus: REQUEST_STATUS.IDLE}
    ],
    tasks: {
        ['todolistId1']: [
            {
                id: v1(),
                title: 'HTML&CSS',
                order: 0,
                addedDate: '',
                status: TASK_STATUS.Completed,
                description: '',
                deadline: '',
                priority: TaskPriority.Low,
                startDate: '',
                todoListId: 'todolistId1'
            },
            {
                id: v1(),
                title: 'JS',
                order: 0,
                addedDate: '',
                status: TASK_STATUS.Completed,
                description: '',
                deadline: '',
                priority: TaskPriority.Low,
                startDate: '',
                todoListId: 'todolistId1'
            }
        ],
        ['todolistId2']: [
            {
                id: v1(),
                title: 'Milk',
                order: 0,
                addedDate: '',
                status: TASK_STATUS.Completed,
                description: '',
                deadline: '',
                priority: TaskPriority.Low,
                startDate: '',
                todoListId: 'todolistId2'
            },
            {
                id: v1(),
                title: 'React Book',
                order: 0,
                addedDate: '',
                status: TASK_STATUS.Completed,
                description: '',
                deadline: '',
                priority: TaskPriority.Low,
                startDate: '',
                todoListId: 'todolistId2'
            }
        ]
    },
    app: {
        status: REQUEST_STATUS.IDLE,
        error: null
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState);

export const ReduxStoreProviderDecorator = (storyFn: any) => <Provider store={storyBookStore}>{storyFn()}</Provider>;