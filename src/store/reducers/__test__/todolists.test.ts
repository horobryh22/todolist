import {v1} from 'uuid';
import {FilterValuesType} from 'types';
import {todolistsReducer} from 'store';
import {
    addTodolist,
    changeFilter,
    changeTodolistTitle, removeTodolist, TodolistDomainType
} from 'store/reducers';
import {REQUEST_STATUS} from 'enums';


let startState: Array<TodolistDomainType>;
let todolistId1: string;
let todolistId2: string;
let newTodolistTitle: string;
let newFilter: FilterValuesType;

beforeEach(() => {

    todolistId1 = v1();
    todolistId2 = v1();
    newTodolistTitle = 'New Title';
    newFilter = 'completed'

    startState = [
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
        }
    ]
})

test('correct todolists should be removed', () => {
    const endState = todolistsReducer(startState, removeTodolist({todolistId: todolistId1}));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolists should be added', () => {
    const todolist = {
        addedDate: '',
        id: v1(),
        order: 1,
        title: newTodolistTitle
    }
    const endState = todolistsReducer(startState, addTodolist({todolist}))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
});

test('correct todolists should change its name', () => {

    const endState = todolistsReducer(startState, changeTodolistTitle({
        todolistId: todolistId2,
        title: newTodolistTitle
    }));

    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTodolistTitle);
    expect(startState).not.toEqual(endState);
});

test('correct filter of todolists should be changed', () => {

    const endState = todolistsReducer(startState, changeFilter({
        todolistId: todolistId2,
        filter: newFilter
    }));

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe(newFilter);
});