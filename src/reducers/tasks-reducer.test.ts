import {TasksStateType} from '../App';
import {v1} from 'uuid';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './tasks-reducer';
import {addTodolistAC, removeToDoListAC} from './todolists-reducer';


let startState: TasksStateType;
let todolistId1: string;
let todolistId2: string;
let todolistId3: string;
let taskName: string;

beforeEach(() => {

    taskName = 'Learn English'
    todolistId1 = v1();
    todolistId2 = v1();
    todolistId3 = v1();

    startState = {
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

test('correct task should be removed', () => {
    const endState = tasksReducer(startState, removeTaskAC(todolistId1, startState[todolistId1][0].id))

    expect(endState[todolistId1].length).toBe(4);
    expect(endState[todolistId1][0].title).toBe('JS');
    expect(endState[todolistId2].length).toBe(5);
    expect(endState[todolistId2][0].title).toBe('HTML&CSS2');
});

test('correct task should be added', () => {
    const endState = tasksReducer(startState, addTaskAC(todolistId1, taskName))

    expect(endState[todolistId1].length).toBe(6);
    expect(endState[todolistId1][0].title).toBe(taskName);
    expect(endState[todolistId2].length).toBe(5);
    expect(endState[todolistId2][0].title).toBe('HTML&CSS2');
});

test('correct task should change its name', () => {

    const endState = tasksReducer(startState,  changeTaskTitleAC(todolistId1, startState[todolistId1][1].id, taskName))

    expect(endState[todolistId1].length).toBe(5);
    expect(endState[todolistId1][0].title).toBe('HTML&CSS');
    expect(endState[todolistId1][1].title).toBe(taskName);
});

test('correct task should change its status', () => {

    const endState = tasksReducer(startState,  changeTaskStatusAC(todolistId1, startState[todolistId1][1].id, false));

    expect(endState[todolistId1][1].isDone).toBe(false);
    expect(endState[todolistId2][1].isDone).toBe(true);
});

test('tasks should be removed from app', () => {
    const endState = tasksReducer(startState,  removeToDoListAC(todolistId1));

    expect(endState[todolistId1]).toBeUndefined()
    expect(endState[todolistId2]).toBeDefined()
    expect(endState).toEqual({[todolistId2]: endState[todolistId2]})
})

test('tasks should be created from app', () => {

    const endState = tasksReducer(startState,  addTodolistAC('', todolistId3));

    expect(endState[todolistId3].length).toBe(0);
    expect(endState[todolistId3].length).toBeDefined();
    expect(endState).toEqual({
        [todolistId1]: endState[todolistId1],
        [todolistId2]: endState[todolistId2],
        [todolistId3]: []
    })
})