import {TasksStateType, TodoListType} from '../App';
import {v1} from 'uuid';
import {tasksReducer} from './tasks-reducer';
import {addTodolistAC, removeToDoListAC, todolistsReducer} from './todolists-reducer';


let initialStateForTasks: TasksStateType;
let initialStateForTodolists: Array<TodoListType>;
let todolistId1: string;
let todolistId2: string;
let todolistId3: string;


beforeEach(() => {

    todolistId1 = v1();
    todolistId2 = v1();
    todolistId3 = v1();

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

    expect(endStateTodolists.length).toBe(1);
    expect(endStateTasks[todolistId1]).toBeUndefined();
    expect(endStateTasks[todolistId2]).toBeDefined();
    expect(endStateTasks).toEqual({[todolistId2]: endStateTasks[todolistId2]});
})

test('todolist and tasks should be created and added', () => {

    const endStateTodolists = todolistsReducer(initialStateForTodolists, addTodolistAC('What to study', todolistId3));
    const endStateTasks = tasksReducer(initialStateForTasks,  addTodolistAC('', todolistId3));

    expect(endStateTodolists[2]).toEqual({id: todolistId3, title: 'What to study', filter: 'all'});
    expect(endStateTodolists.length).toBe(3)
    expect(endStateTasks[todolistId3].length).toBe(0);
    expect(endStateTasks[todolistId3].length).toBeDefined();
    expect(endStateTasks).toEqual({
        [todolistId1]: endStateTasks[todolistId1],
        [todolistId2]: endStateTasks[todolistId2],
        [todolistId3]: []
    })
})