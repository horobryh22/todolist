import React from 'react'
import {Provider} from 'react-redux'
import {combineReducers, createStore} from 'redux'
import {v1} from 'uuid'
import {tasksReducer} from './reducers/tasks-reducer';
import {todolistsReducer} from './reducers/todolists-reducer';
import {AppRootState} from './redux/store';
import {TaskPriority, TaskStatus} from './api/todolist-api';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState: AppRootState = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate: '', order: 0}
    ],
    tasks: {
        ['todolistId1']: [
            {
                id: v1(),
                title: 'HTML&CSS',
                order: 0,
                addedDate: '',
                status: TaskStatus.Completed,
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
                status: TaskStatus.Completed,
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
                status: TaskStatus.Completed,
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
                status: TaskStatus.Completed,
                description: '',
                deadline: '',
                priority: TaskPriority.Low,
                startDate: '',
                todoListId: 'todolistId2'
            }
        ]
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState);

export const ReduxStoreProviderDecorator = (storyFn: any) => <Provider store={storyBookStore}>{storyFn()}</Provider>;