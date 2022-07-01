import {v1} from 'uuid';
import {tasksReducer, TasksStateType} from './tasks-reducer';
import {TodolistDomainType, todolistsReducer} from './todolists-reducer';
import {addTodolistAC, removeToDoListAC, setTodolistsAC} from './action-creators/action-creators';
import {TaskPriority, TaskStatus} from '../api/todolist-api';


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
        {id: todolistId1, title: 'What to learn', filter: 'all', order: 1, addedDate: ''},
        {id: todolistId2, title: 'What to buy', filter: 'all', order: 1, addedDate: ''},
    ]

    initialStateForTasks = {
        [todolistId1]: [
            {
                id: v1(),
                title: 'HTML&CSS',
                status: TaskStatus.Completed,
                order: 1,
                addedDate: '',
                startDate: '',
                deadline: '',
                description: '',
                priority: TaskPriority.Low,
                todoListId: todolistId1
            },
            {
                id: v1(),
                title: 'JS',
                status: TaskStatus.Completed,
                order: 1,
                addedDate: '',
                startDate: '',
                deadline: '',
                description: '',
                priority: TaskPriority.Low,
                todoListId: todolistId1
            },
            {
                id: v1(),
                title: 'ReactJS',
                status: TaskStatus.Completed,
                order: 1,
                addedDate: '',
                startDate: '',
                deadline: '',
                description: '',
                priority: TaskPriority.Low,
                todoListId: todolistId1
            },
            {
                id: v1(),
                title: 'Rest API',
                status: TaskStatus.Completed,
                order: 1,
                addedDate: '',
                startDate: '',
                deadline: '',
                description: '',
                priority: TaskPriority.Low,
                todoListId: todolistId1
            },
            {
                id: v1(),
                title: 'GraphQL',
                status: TaskStatus.Completed,
                order: 1,
                addedDate: '',
                startDate: '',
                deadline: '',
                description: '',
                priority: TaskPriority.Low,
                todoListId: todolistId1
            },
        ],
        [todolistId2]: [
            {
                id: v1(),
                title: 'HTML&CSS2',
                status: TaskStatus.Completed,
                order: 1,
                addedDate: '',
                startDate: '',
                deadline: '',
                description: '',
                priority: TaskPriority.Low,
                todoListId: todolistId2
            },
            {
                id: v1(),
                title: 'JS2',
                status: TaskStatus.Completed,
                order: 1,
                addedDate: '',
                startDate: '',
                deadline: '',
                description: '',
                priority: TaskPriority.Low,
                todoListId: todolistId2
            },
            {
                id: v1(),
                title: 'ReactJS2',
                status: TaskStatus.Completed,
                order: 1,
                addedDate: '',
                startDate: '',
                deadline: '',
                description: '',
                priority: TaskPriority.Low,
                todoListId: todolistId2
            },
            {
                id: v1(),
                title: 'Rest API2',
                status: TaskStatus.Completed,
                order: 1,
                addedDate: '',
                startDate: '',
                deadline: '',
                description: '',
                priority: TaskPriority.Low,
                todoListId: todolistId2
            },
            {
                id: v1(),
                title: 'GraphQL2',
                status: TaskStatus.Completed,
                order: 1,
                addedDate: '',
                startDate: '',
                deadline: '',
                description: '',
                priority: TaskPriority.Low,
                todoListId: todolistId2
            },
        ]
    }
})

test('todolist and its tasks should be removed', () => {

    const endStateTodolists = todolistsReducer(initialStateForTodolists, removeToDoListAC(todolistId1));
    const endStateTasks = tasksReducer(initialStateForTasks, removeToDoListAC(todolistId1));

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

    const endStateTodolists = todolistsReducer(initialStateForTodolists, addTodolistAC(todolist));
    const endStateTasks = tasksReducer(initialStateForTasks, addTodolistAC(todolist));

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
    const action = setTodolistsAC(todolists);

    const endStateTodolists = todolistsReducer(initialStateForTodolists, action);
    const endStateTasks = tasksReducer(initialStateForTasks, action);

    expect(endStateTodolists.length).toBe(2);
    expect(endStateTodolists[0].title).toBe('What to study');
    expect(endStateTodolists[1].title).toBe('What to eat');
    expect(endStateTasks[todolistId1]).toEqual([]);
    expect(endStateTasks[todolistId2]).toEqual([]);
})