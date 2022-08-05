import { v1 } from 'uuid';

import { REQUEST_STATUS, TASK_PRIORITY, TASK_STATUS } from 'enums';
import { tasksReducer, todolistsReducer } from 'store';
import {
    addTodolistTC,
    fetchTodolistsTC,
    logoutTC,
    removeTodolistTC,
} from 'store/middlewares';
import { TaskStateType, TodolistDomainType } from 'store/reducers/types';

let initialStateForTasks: TaskStateType;
let initialStateForTodolists: Array<TodolistDomainType>;
let todolistId1: string;
let todolistId2: string;
let todolistId3: string;

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    todolistId3 = v1();

    initialStateForTodolists = [
        {
            id: todolistId1,
            title: 'What to learn',
            filter: 'all',
            order: 1,
            addedDate: '',
            entityStatus: REQUEST_STATUS.IDLE,
        },
        {
            id: todolistId2,
            title: 'What to buy',
            filter: 'all',
            order: 1,
            addedDate: '',
            entityStatus: REQUEST_STATUS.IDLE,
        },
    ];

    initialStateForTasks = {
        [todolistId1]: [
            {
                id: v1(),
                title: 'HTML&CSS',
                status: TASK_STATUS.Completed,
                order: 1,
                addedDate: '',
                startDate: '',
                deadline: '',
                description: '',
                priority: TASK_PRIORITY.Low,
                todoListId: todolistId1,
                entityStatus: REQUEST_STATUS.IDLE,
            },
            {
                id: v1(),
                title: 'JS',
                status: TASK_STATUS.Completed,
                order: 1,
                addedDate: '',
                startDate: '',
                deadline: '',
                description: '',
                priority: TASK_PRIORITY.Low,
                todoListId: todolistId1,
                entityStatus: REQUEST_STATUS.IDLE,
            },
            {
                id: v1(),
                title: 'ReactJS',
                status: TASK_STATUS.Completed,
                order: 1,
                addedDate: '',
                startDate: '',
                deadline: '',
                description: '',
                priority: TASK_PRIORITY.Low,
                todoListId: todolistId1,
                entityStatus: REQUEST_STATUS.IDLE,
            },
            {
                id: v1(),
                title: 'Rest API',
                status: TASK_STATUS.Completed,
                order: 1,
                addedDate: '',
                startDate: '',
                deadline: '',
                description: '',
                priority: TASK_PRIORITY.Low,
                todoListId: todolistId1,
                entityStatus: REQUEST_STATUS.IDLE,
            },
            {
                id: v1(),
                title: 'GraphQL',
                status: TASK_STATUS.Completed,
                order: 1,
                addedDate: '',
                startDate: '',
                deadline: '',
                description: '',
                priority: TASK_PRIORITY.Low,
                todoListId: todolistId1,
                entityStatus: REQUEST_STATUS.IDLE,
            },
        ],
        [todolistId2]: [
            {
                id: v1(),
                title: 'HTML&CSS2',
                status: TASK_STATUS.Completed,
                order: 1,
                addedDate: '',
                startDate: '',
                deadline: '',
                description: '',
                priority: TASK_PRIORITY.Low,
                todoListId: todolistId2,
                entityStatus: REQUEST_STATUS.IDLE,
            },
            {
                id: v1(),
                title: 'JS2',
                status: TASK_STATUS.Completed,
                order: 1,
                addedDate: '',
                startDate: '',
                deadline: '',
                description: '',
                priority: TASK_PRIORITY.Low,
                todoListId: todolistId2,
                entityStatus: REQUEST_STATUS.IDLE,
            },
            {
                id: v1(),
                title: 'ReactJS2',
                status: TASK_STATUS.Completed,
                order: 1,
                addedDate: '',
                startDate: '',
                deadline: '',
                description: '',
                priority: TASK_PRIORITY.Low,
                todoListId: todolistId2,
                entityStatus: REQUEST_STATUS.IDLE,
            },
            {
                id: v1(),
                title: 'Rest API2',
                status: TASK_STATUS.Completed,
                order: 1,
                addedDate: '',
                startDate: '',
                deadline: '',
                description: '',
                priority: TASK_PRIORITY.Low,
                todoListId: todolistId2,
                entityStatus: REQUEST_STATUS.IDLE,
            },
            {
                id: v1(),
                title: 'GraphQL2',
                status: TASK_STATUS.Completed,
                order: 1,
                addedDate: '',
                startDate: '',
                deadline: '',
                description: '',
                priority: TASK_PRIORITY.Low,
                todoListId: todolistId2,
                entityStatus: REQUEST_STATUS.IDLE,
            },
        ],
    };
});

test('todolists and its tasks should be removed', () => {
    const action = removeTodolistTC.fulfilled(todolistId1, '', todolistId1);

    const endStateTodolists = todolistsReducer(initialStateForTodolists, action);
    const endStateTasks = tasksReducer(initialStateForTasks, action);

    expect(endStateTasks).not.toBe(initialStateForTasks);
    expect(endStateTasks).not.toBe(initialStateForTasks);
    expect(endStateTodolists.length).toBe(1);
    expect(endStateTasks[todolistId1]).toBeUndefined();
    expect(endStateTasks[todolistId2]).toBeDefined();
    expect(endStateTasks).toEqual({ [todolistId2]: endStateTasks[todolistId2] });
});

test('todolists and tasks should be created and added', () => {
    const todolist = {
        addedDate: '',
        id: todolistId3,
        order: 1,
        title: 'What to study',
    };

    const endStateTodolists = todolistsReducer(
        initialStateForTodolists,
        addTodolistTC.fulfilled(todolist, '', 'What to study'),
    );
    const endStateTasks = tasksReducer(
        initialStateForTasks,
        addTodolistTC.fulfilled(todolist, '', 'What to study'),
    );

    const keys = Object.keys(endStateTasks);
    const newKey = keys.find(k => k !== todolistId1 && k !== todolistId2);

    if (!newKey) {
        throw Error('new key should be added');
    }

    expect(keys.length).toBe(3);
    expect(endStateTodolists.length).toBe(3);
    expect(endStateTasks[newKey]).toEqual([]);
    expect(endStateTodolists[0].id).toBe(newKey);
    expect(endStateTodolists[0].title).toBe('What to study');
});

test('todolists and tasks should be set', () => {
    const initialStateForTodolists: TodolistDomainType[] = [];
    const initialStateForTasks: TaskStateType = {};

    const todolists = [
        {
            addedDate: '',
            id: todolistId1,
            order: 1,
            title: 'What to study',
        },
        {
            addedDate: '',
            id: todolistId2,
            order: 1,
            title: 'What to eat',
        },
    ];
    const action = fetchTodolistsTC.fulfilled(todolists, '');

    const endStateTodolists = todolistsReducer(initialStateForTodolists, action);
    const endStateTasks = tasksReducer(initialStateForTasks, action);

    expect(endStateTodolists.length).toBe(2);
    expect(endStateTodolists[0].title).toBe('What to study');
    expect(endStateTodolists[1].title).toBe('What to eat');
    expect(endStateTasks[todolistId1]).toEqual([]);
    expect(endStateTasks[todolistId2]).toEqual([]);
});

test('todolists and tasks should be empty', () => {
    const action = logoutTC.fulfilled;

    const endStateTodolists = todolistsReducer(initialStateForTodolists, action);
    const endStateTasks = tasksReducer(initialStateForTasks, action);

    expect(endStateTodolists).toEqual([]);
    expect(endStateTasks).toEqual({});
});
