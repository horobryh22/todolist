import {v1} from 'uuid';
import {tasksReducer, TasksStateType} from './tasks-reducer';
import {todolistsReducer, TodoListType} from './todolists-reducer';
import {addTodolistAC, removeToDoListAC} from './action-creators/action-creators';


let initialStateForTasks: TasksStateType;
let initialStateForTodolists: Array<TodoListType>;
let todolistId1: string;
let todolistId2: string;


beforeEach(() => {

    todolistId1 = v1();
    todolistId2 = v1();

    initialStateForTodolists = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]

    initialStateForTasks = {
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'HTML&CSS2', isDone: true},
            {id: v1(), title: 'JS2', isDone: true},
            {id: v1(), title: 'ReactJS2', isDone: false},
            {id: v1(), title: 'Rest API2', isDone: false},
            {id: v1(), title: 'GraphQL2', isDone: false},
        ]
    }
})

test('todolist and its tasks should be removed', () => {

    const endStateTodolists = todolistsReducer(initialStateForTodolists, removeToDoListAC(todolistId1));
    const endStateTasks = tasksReducer(initialStateForTasks,  removeToDoListAC(todolistId1));

    expect(endStateTasks).not.toBe(initialStateForTasks);
    expect(endStateTasks).not.toBe(initialStateForTasks);
    expect(endStateTodolists.length).toBe(1);
    expect(endStateTasks[todolistId1]).toBeUndefined();
    expect(endStateTasks[todolistId2]).toBeDefined();
    expect(endStateTasks).toEqual({[todolistId2]: endStateTasks[todolistId2]});
})

test('todolist and tasks should be created and added', () => {

    const action = addTodolistAC('What to study');

    const endStateTodolists = todolistsReducer(initialStateForTodolists, action);
    const endStateTasks = tasksReducer(initialStateForTasks,  action);


    const keys = Object.keys(endStateTasks);
    const newKey = keys.find(k => k !== todolistId1 && k !== todolistId2);
    if (!newKey) {
        throw Error('new key should be added');
    }

    expect(keys.length).toBe(3);
    expect(endStateTodolists.length).toBe(3);
    expect(endStateTasks[newKey]).toEqual([]);
    expect(endStateTodolists[2].id).toBe(newKey);
})