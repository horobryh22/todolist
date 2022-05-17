import {TasksStateType} from '../App';
import {v1} from 'uuid';
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC, createTasksAC,
    deleteTasksAC,
    removeTaskAC,
    tasksReducer
} from './tasks-reducer';


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
});

test('correct task should be added', () => {
    const endState = tasksReducer(startState, addTaskAC(todolistId1, taskName))

    expect(endState[todolistId1].length).toBe(6);
    expect(endState[todolistId1][0].title).toBe(taskName);
});

test('correct task should change its name', () => {

    const endState = tasksReducer(startState,  changeTaskTitleAC(todolistId1, startState[todolistId1][1].id, taskName))

    expect(endState[todolistId1].length).toBe(5);
    expect(endState[todolistId1][0].title).toBe('HTML&CSS');
    expect(endState[todolistId1][1].title).toBe(taskName);
});

test('correct task should change its status', () => {

    const endState = tasksReducer(startState,  changeTaskStatusAC(todolistId1, startState[todolistId1][1].id, false));

    expect(endState[todolistId1].length).toBe(5);
    expect(endState[todolistId1][0].isDone).toBe(true);
    expect(endState[todolistId1][1].isDone).toBe(false);
});

test('tasks should be removed from app', () => {
    const endState = tasksReducer(startState,  deleteTasksAC(todolistId1));

    expect(endState[todolistId1]).toEqual(undefined);
    expect(endState[todolistId2]).not.toEqual(undefined);
    expect(endState).toEqual({[todolistId2]: endState[todolistId2]})
})

test('tasks should be created from app', () => {

    const endState = tasksReducer(startState,  createTasksAC(todolistId3));

    expect(endState[todolistId3].length).toBe(0);
    expect(endState[todolistId3].length).not.toBe(undefined);
    expect(endState).toEqual({
        [todolistId1]: endState[todolistId1],
        [todolistId2]: endState[todolistId2],
        [todolistId3]: []
    })
})