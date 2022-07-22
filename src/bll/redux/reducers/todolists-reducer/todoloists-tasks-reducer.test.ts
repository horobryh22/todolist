import {v1} from 'uuid';
import {tasksReducer, TasksStateType} from '../tasks-reducer/tasks-reducer';
import {
    addTodolist,
    clearAppData,
    removeTodolist, setTodolists,
    TodolistDomainType,
    todolistsReducer
} from './todolists-reducer';
import {TaskPriority, TASK_STATUS} from '../../../../dal/api/todolist-api';
import {REQUEST_STATUS} from '../app-reducer/app-reducer';


let initialStateForTasks: TasksStateType;
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
            entityStatus: REQUEST_STATUS.IDLE
        },
        {
            id: todolistId2,
            title: 'What to buy',
            filter: 'all',
            order: 1,
            addedDate: '',
            entityStatus: REQUEST_STATUS.IDLE
        },
    ]

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
                priority: TaskPriority.Low,
                todoListId: todolistId1,
                entityStatus: REQUEST_STATUS.IDLE
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
                priority: TaskPriority.Low,
                todoListId: todolistId1,
                entityStatus: REQUEST_STATUS.IDLE
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
                priority: TaskPriority.Low,
                todoListId: todolistId1,
                entityStatus: REQUEST_STATUS.IDLE
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
                priority: TaskPriority.Low,
                todoListId: todolistId1,
                entityStatus: REQUEST_STATUS.IDLE
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
                priority: TaskPriority.Low,
                todoListId: todolistId1,
                entityStatus: REQUEST_STATUS.IDLE
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
                priority: TaskPriority.Low,
                todoListId: todolistId2,
                entityStatus: REQUEST_STATUS.IDLE
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
                priority: TaskPriority.Low,
                todoListId: todolistId2,
                entityStatus: REQUEST_STATUS.IDLE
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
                priority: TaskPriority.Low,
                todoListId: todolistId2,
                entityStatus: REQUEST_STATUS.IDLE
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
                priority: TaskPriority.Low,
                todoListId: todolistId2,
                entityStatus: REQUEST_STATUS.IDLE
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
                priority: TaskPriority.Low,
                todoListId: todolistId2,
                entityStatus: REQUEST_STATUS.IDLE
            },
        ]
    }
})

test('todolist and its tasks should be removed', () => {

    const endStateTodolists = todolistsReducer(initialStateForTodolists, removeTodolist({todolistId: todolistId1}));
    const endStateTasks = tasksReducer(initialStateForTasks, removeTodolist({todolistId: todolistId1}));

    expect(endStateTasks).not.toBe(initialStateForTasks);
    expect(endStateTasks).not.toBe(initialStateForTasks);
    expect(endStateTodolists.length).toBe(1);
    expect(endStateTasks[todolistId1]).toBeUndefined();
    expect(endStateTasks[todolistId2]).toBeDefined();
    expect(endStateTasks).toEqual({[todolistId2]: endStateTasks[todolistId2]});
})

test('todolist and tasks should be created and added', () => {

    const todolist = {
        addedDate: '',
        id: todolistId3,
        order: 1,
        title: 'What to study'
    }

    const endStateTodolists = todolistsReducer(initialStateForTodolists, addTodolist({todolist}));
    const endStateTasks = tasksReducer(initialStateForTasks, addTodolist({todolist}));

    const keys = Object.keys(endStateTasks);
    const newKey = keys.find(k => k !== todolistId1 && k !== todolistId2);
    if (!newKey) {
        throw Error('new key should be added');
    }

    expect(keys.length).toBe(3);
    expect(endStateTodolists.length).toBe(3);
    expect(endStateTasks[newKey]).toEqual([]);
    expect(endStateTodolists[0].id).toBe(newKey);
})

test('todolists and tasks should be set', () => {

    const initialStateForTodolists: TodolistDomainType[] = [];
    const initialStateForTasks: TasksStateType = {};

    const todolists = [
        {
            addedDate: '',
            id: todolistId1,
            order: 1,
            title: 'What to study'
        },
        {
            addedDate: '',
            id: todolistId2,
            order: 1,
            title: 'What to eat'
        }
    ]
    const action = setTodolists({todolists});

    const endStateTodolists = todolistsReducer(initialStateForTodolists, action);
    const endStateTasks = tasksReducer(initialStateForTasks, action);

    expect(endStateTodolists.length).toBe(2);
    expect(endStateTodolists[0].title).toBe('What to study');
    expect(endStateTodolists[1].title).toBe('What to eat');
    expect(endStateTasks[todolistId1]).toEqual([]);
    expect(endStateTasks[todolistId2]).toEqual([]);
})

test('todolists and tasks should be empty', () => {


    const action = clearAppData();

    const endStateTodolists = todolistsReducer(initialStateForTodolists, action);
    const endStateTasks = tasksReducer(initialStateForTasks, action);

    expect(endStateTodolists).toEqual([]);
    expect(endStateTasks).toEqual({});
})